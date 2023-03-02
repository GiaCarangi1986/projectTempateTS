import React, { FC, useRef, useEffect, useState } from 'react';

import ModalContainer from '../../Modals';
import ImageModalInfo from '../ImageModalInfo';
import { roundDigit } from '../../../utils';
import { LegendData } from './ImageDetail';

import { CanvasImageType } from './types';
import style from './index.module.scss';
import CanvasBtns from './CanvasBtns';

type Size = {
  width: number;
  height: number;
};

export type CoordType = {
  x: number;
  y: number;
};

type Area = {
  index: number;
  square: number;
};

type DefGroupType = {
  convasElems: Path2D;
  poligon: CoordType[];
  name: string;
  serverName: string;
  strokeColor: string;
};

export type InfoType = {
  name: string;
  value: string | number;
};

type ScaleAtType = {
  scale: number;
  x: number;
  y: number;
};

type EventType = 'MouseEvent' | 'TouchEvent' | 'MouseMoveTouchEvent' | '';

const VARIANTS = {
  coords: 'coords',
  segmatation: 'segmatation'
};

const MARGIN_VERTICAL = 10;
const MARGIN_HORIZONTAL = 10;
const GAP = 5;

const ROW_HEIGHT = 20;
const ROW_WIDTH = 300;

const ZOOM_PIX_MM = 1 / 20;
const SCALE = 1;
const SCALE_RATIO = 1.3;

const COLORS = ['red', 'blue', 'green', 'orange', 'yellow', 'cyan'];

export const INIT_COORD = {
  x: 0,
  y: 0
};

const CanvasImage: FC<CanvasImageType> = ({
  image,
  data,
  getPicture,
  setLegendData,
  containerRef,
  setChoosenName
}) => {
  const ref = useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>();
  const [defGroup, setDefGroup] = useState<DefGroupType[]>([]);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0
  });
  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<InfoType[]>([]);
  const [clickCoords, setClickCoords] = useState<CoordType>(INIT_COORD);
  const [imageSave, setImageSave] = useState<ImageData>();
  const [scale, setScale] = useState(SCALE);
  const [firstImgLoad, setFirstImageLoad] = useState(true);
  const [dragStart, setDragStart] = useState<CoordType | null>(null);
  const [dragged, setDragged] = useState(false);
  const [loadedImageData, setLoadedImageData] = useState<{
    image: HTMLImageElement;
    sizeRatio: number;
  }>();
  const [evCache, setEvCache] = useState<any[]>([]);
  const [prevDiff, setPrevDiff] = useState(-1);
  const [eventType, setEventType] = useState<EventType>('');
  const [lastCoords, setLastCoords] = useState<CoordType>(INIT_COORD);
  const [ratioSize, setRatioSize] = useState(1);

  const handleCloseModal = () => {
    if (ctx && imageSave) {
      ctx.putImageData(imageSave, 0, 0);
    }
    setOpenModal(false);
    setChoosenName('');
    setModalInfo([]);
  };
  const handleOpenModal = () => setOpenModal(true);

  const calcPolygonArea = (vertices: CoordType[]) => {
    let total = 0;

    for (let i = 0, l = vertices.length; i < l; i++) {
      const addX = vertices[i].x;
      const addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
      const subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
      const subY = vertices[i].y;

      total += addX * addY * 0.5;
      total -= subX * subY * 0.5;
    }

    return roundDigit(Math.abs(total) * ZOOM_PIX_MM);
  };

  const getInsideElements = (
    convasContext: CanvasRenderingContext2D,
    zoomClick: CoordType
  ) => {
    const arr: Area[] = [];
    for (let i = defGroup.length - 1; i >= 0; i--) {
      const elem = defGroup[i].convasElems;
      const polEl = defGroup[i].poligon;
      if (elem && convasContext.isPointInPath(elem, zoomClick.x, zoomClick.y)) {
        arr.push({
          index: i,
          square: calcPolygonArea(polEl)
        });
      } else {
        console.log('мимо');
      }
    }
    return arr;
  };

  const checkArea = (
    areaArr: Area[],
    convasContext: CanvasRenderingContext2D
  ) => {
    if (imageSave) {
      convasContext.putImageData(imageSave, 0, 0);

      const arrInfo: InfoType[] = [];
      if (areaArr.length) {
        let min = Infinity;
        let index = 0;
        for (let i = 0; i < areaArr.length; i++) {
          const elem = areaArr[i];
          if (elem.square <= min) {
            min = elem.square;
            index = i;
          }
        }
        const defGroupElem = defGroup[areaArr[index].index];
        setChoosenName(defGroupElem.serverName);
        arrInfo.push({
          name: 'Наименование дефекта',
          value: defGroupElem.name
        });
        arrInfo.push({
          name: 'Размер, мм',
          value: areaArr[index].square
        });
        setModalInfo((prev) => [...prev, ...arrInfo]);
        console.log(
          '`полигон - ${defGroupElem.poligon}`',
          `полигон - ${defGroupElem.poligon}`
        );
        convasContext.strokeStyle = 'white';
        convasContext.stroke(defGroupElem.convasElems);
      }
      return arrInfo.length;
    }
  };

  const calcModalStartCoords = (
    containerRefCur: HTMLDivElement,
    clickConvasCoords: CoordType,
    convasSize: Size,
    length: number
  ) => {
    const maxHeight =
      ROW_HEIGHT * length + MARGIN_VERTICAL + GAP * (length - 1);
    const maxWidth = ROW_WIDTH + MARGIN_HORIZONTAL;
    const startModal = {
      x:
        clickConvasCoords.x +
        (window.innerWidth - containerRefCur.offsetWidth) / 2 -
        maxWidth * (clickConvasCoords.x / convasSize.width),
      y:
        clickConvasCoords.y +
        (window.innerHeight - containerRefCur.offsetHeight) / 2 -
        maxHeight * (clickConvasCoords.y / convasSize.height)
    };
    setClickCoords({
      x: 10 + startModal.x,
      y: 10 + startModal.y
    });
    handleOpenModal();
  };

  const getCoordsClickCanvas = (
    refCur: HTMLCanvasElement,
    e: any,
    eType: EventType = ''
  ) => {
    const convasSize = {
      width: refCur.offsetWidth,
      height: refCur.offsetHeight
    };

    const rect = e.target.getBoundingClientRect();
    let x = 0;
    let y = 0;
    if (eType === 'MouseMoveTouchEvent') {
      x = e.targetTouches[0]?.pageX - rect.left;
      y = e.targetTouches[0]?.pageY - rect.top;
    }

    const clickConvasCoords = {
      x: eType === 'MouseMoveTouchEvent' ? x : e.nativeEvent.offsetX,
      y: eType === 'MouseMoveTouchEvent' ? y : e.nativeEvent.offsetY
    };

    const zoomClick = {
      x: clickConvasCoords.x * (size.width / convasSize.width),
      y: clickConvasCoords.y * (size.height / convasSize.height)
    };
    return {
      convasSize,
      clickConvasCoords,
      zoomClick
    };
  };

  const handleClick = (e: any) => {
    const refCur = ref.current;
    const containerRefCur = containerRef.current;
    if (ctx && refCur && containerRefCur && !dragged) {
      const mouseCoords = getCoordsClickCanvas(refCur, e);
      const areaArr: Area[] = getInsideElements(ctx, mouseCoords.zoomClick);
      const length = checkArea(areaArr, ctx);
      if (length) {
        calcModalStartCoords(
          containerRefCur,
          mouseCoords.clickConvasCoords,
          mouseCoords.convasSize,
          length
        );
      }
    }
  };

  const drawLines = (sizeRatio: number) => {
    const refCur = ref.current;
    if (ctx && refCur) {
      const variant = VARIANTS.coords;
      const colors: LegendData[] = [];
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const strokeColor = COLORS[i];
        const rectPoligon: CoordType[][] = [];
        switch (variant) {
          case VARIANTS.coords:
            item.coords.forEach((coord) => {
              rectPoligon.push([
                {
                  x: coord.xmin * sizeRatio, // xLeftTop
                  y: coord.ymax * sizeRatio // yLeftTop
                },
                {
                  x: coord.xmax * sizeRatio, // xRightTop
                  y: coord.ymax * sizeRatio // yRightTop
                },
                {
                  x: coord.xmax * sizeRatio, // xRightBottom
                  y: coord.ymin * sizeRatio // yRightBottom
                },
                {
                  x: coord.xmin * sizeRatio, // xLeftBottom
                  y: coord.ymin * sizeRatio // yLeftBottom
                }
              ]);
            });
            break;

          case VARIANTS.segmatation:
            item.segmatation &&
              item.segmatation.forEach((coord) => {
                const arr: CoordType[] = [];
                coord.forEach((el) => {
                  arr.push({ x: el.x * sizeRatio, y: el.y * sizeRatio });
                });
                rectPoligon.push(arr);
              });
            break;
        }
        rectPoligon.forEach((pol) => {
          ctx.beginPath(); // Начинает новый путь
          const figure = new Path2D();

          figure.moveTo(pol[0].x, pol[0].y);
          for (let iPol = 1; iPol < pol.length; iPol++) {
            const element = pol[iPol];
            figure.lineTo(element.x, element.y);
          }
          figure.closePath();

          ctx.strokeStyle = strokeColor;

          setDefGroup((prev) => [
            ...prev,
            {
              convasElems: new Path2D(figure),
              poligon: pol,
              name: item.name,
              strokeColor,
              serverName: item.serverName
            }
          ]);
          ctx.stroke(figure); // Отображает путь
        });

        colors.push({
          name: item.name,
          color: strokeColor
        });
      }
      setLegendData(colors);
      setImageSave(ctx.getImageData(0, 0, refCur.width, refCur.height));
      if (getPicture) {
        getPicture(refCur.toDataURL());
      }
    }
  };

  const clearCanvas = () => {
    const refCur = ref.current;
    if (ctx && refCur) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, refCur.width, refCur.height);
    }
    setDefGroup([]);
  };

  const draw = (
    scaleVal = scale,
    px = 0,
    py = 0,
    translateX = 0,
    translateY = 0
  ) => {
    if (ctx) {
      let sizeRatio = 1;
      const MAX_SIZE = window.innerHeight * 0.75;
      const action = (img: HTMLImageElement, _sizeRatio: number) => {
        const width = img.width;
        const height = img.height;

        const refCur = ref.current;
        if (refCur) {
          if (refCur.width && refCur.height) {
            refCur.width = width;
            refCur.height = height;
          }
          clearCanvas();
          ctx.setTransform(
            scaleVal,
            0,
            0,
            scaleVal,
            px || translateX,
            py || translateY
          );
          ctx.drawImage(img, 0, 0, width, height);
          setSize({
            width,
            height
          });
          drawLines(_sizeRatio);
        }
      };

      if (!loadedImageData) {
        const img = new Image();
        img.src = image;
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
          const bigSize =
            img.naturalWidth > img.naturalHeight
              ? img.naturalWidth
              : img.naturalHeight;
          sizeRatio = MAX_SIZE / bigSize;
          if (firstImgLoad) {
            setFirstImageLoad(false);
            setRatioSize(sizeRatio || 1);
          }
          img.width = img.naturalWidth * sizeRatio;
          img.height = img.naturalHeight * sizeRatio;
          setLoadedImageData({
            image: img,
            sizeRatio
          });
          action(img, sizeRatio);
        };
      } else {
        action(loadedImageData.image, loadedImageData.sizeRatio);
      }
    }
  };

  const scaleAt = (at: CoordType, amount: number) => {
    const SCALE_MAX = 25;
    const SCALE_MIN = 0.2;
    const newScale = scale * amount;
    const notCorect = newScale >= SCALE_MAX || newScale <= SCALE_MIN;
    return {
      scale: notCorect ? scale : newScale,
      x: notCorect ? lastCoords.x : at.x - (at.x - lastCoords.x) * amount,
      y: notCorect ? lastCoords.y : at.y - (at.y - lastCoords.y) * amount
    };
  };

  const scaleAction = (scaleData: ScaleAtType) => {
    setScale(scaleData.scale);
    setLastCoords({
      x: scaleData.x,
      y: scaleData.y
    });
    draw(scaleData.scale, scaleData.x, scaleData.y);
  };

  const handleWeel = (e: any) => {
    const event = e || window.event;
    const delta = event.deltaY || event.detail || event.wheelDelta;
    const refCur = ref.current;
    if (refCur) {
      const mouseCoords = getCoordsClickCanvas(refCur, e);
      const x = mouseCoords.zoomClick.x;
      const y = mouseCoords.zoomClick.y;
      let scaleData: ScaleAtType;
      if (delta > 0) {
        scaleData = scaleAt({ x, y }, 1 / SCALE_RATIO);
      } else {
        scaleData = scaleAt({ x, y }, SCALE_RATIO);
      }
      scaleAction(scaleData);
    }
  };

  const handleZoom = (zoomIn = true) => {
    const scaleData = scaleAt(
      { x: lastCoords.x, y: lastCoords.y },
      zoomIn ? SCALE_RATIO : 1 / SCALE_RATIO
    );
    scaleAction(scaleData);
  };

  const handleMouseDown = (e: any, touchMove = false) => {
    const refCur = ref.current;
    if (!touchMove) {
      setEventType('MouseEvent');
    } else {
      setEventType('MouseMoveTouchEvent');
    }
    if (refCur) {
      const mouseCoords = getCoordsClickCanvas(
        refCur,
        e,
        !touchMove ? 'MouseEvent' : 'MouseMoveTouchEvent'
      );
      setDragStart({
        x: mouseCoords.zoomClick.x - lastCoords.x,
        y: mouseCoords.zoomClick.y - lastCoords.y
      });
      setDragged(false);
    }
  };

  const handleMouseMove = (e: any, touchMove = false) => {
    const refCur = ref.current;
    if (!touchMove) {
      setEventType('MouseEvent');
    } else {
      setEventType('MouseMoveTouchEvent');
    }
    if (dragStart && refCur) {
      const mouseCoords = getCoordsClickCanvas(
        refCur,
        e,
        !touchMove ? 'MouseEvent' : 'MouseMoveTouchEvent'
      );
      if (!dragged) {
        setDragged(true);
      }
      const x = mouseCoords.zoomClick.x - dragStart.x;
      const y = mouseCoords.zoomClick.y - dragStart.y;
      setLastCoords({
        x,
        y
      });
      draw(scale, 0, 0, x, y);
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  const moveDelta = ({ x: xDelta, y: yDelta }: CoordType) => {
    const x = lastCoords.x + xDelta / ratioSize;
    const y = lastCoords.y + yDelta / ratioSize;
    setLastCoords({
      x,
      y
    });
    draw(scale, 0, 0, x, y);
  };

  const handlePointerDown = (e: any) => {
    setEvCache((prev) => [...prev, e]);
  };

  const handlePointerMove = (e: any) => {
    const index = evCache.findIndex(
      (cachedEv) => cachedEv.pointerId === e.pointerId
    );
    evCache[index] = e;
    const refCur = ref.current;
    if (refCur) {
      if (evCache.length === 2) {
        const mouseCoords1 = getCoordsClickCanvas(refCur, evCache[0]);
        const mouseCoords2 = getCoordsClickCanvas(refCur, evCache[1]);
        setEventType('TouchEvent');

        const deltaX = mouseCoords1.zoomClick.x - mouseCoords2.zoomClick.x;
        const deltaY = mouseCoords1.zoomClick.y - mouseCoords2.zoomClick.y;

        const curDiff = Math.hypot(deltaX, deltaY);

        if (prevDiff > 0) {
          let scaleData: ScaleAtType;
          if (curDiff > prevDiff) {
            scaleData = scaleAt(
              {
                x: mouseCoords1.zoomClick.x + deltaX / 2,
                y: mouseCoords1.zoomClick.y + deltaY / 2
              },
              SCALE_RATIO
            );
          } else {
            scaleData = scaleAt(
              {
                x: mouseCoords1.zoomClick.x + deltaX / 2,
                y: mouseCoords1.zoomClick.y + deltaY / 2
              },
              1 / SCALE_RATIO
            );
          }
          scaleAction(scaleData);
        }
        setPrevDiff(curDiff);
      }
    }
  };

  const handlePointerUp = () => {
    if (evCache.length < 2) {
      setPrevDiff(-1);
      if (eventType === 'MouseEvent' || eventType === 'MouseMoveTouchEvent') {
        setEvCache([]);
      }
    }
  };

  const getInitDraw = () => {
    scaleAction({
      x: INIT_COORD.x,
      y: INIT_COORD.y,
      scale: SCALE
    });
  };

  useEffect(() => {
    if (ctx) {
      draw();
    }
  }, [ctx]);

  useEffect(() => {
    if (ref) {
      setCtx(ref?.current?.getContext('2d', { willReadFrequently: true }));
    }
  }, [ref]);

  return (
    <div className={style['canvas-constructor']}>
      <div className={style.canvasimg}>
        {firstImgLoad && (
          <p className={style.canvasimg__text}>Загрузка изображения...</p>
        )}
        <canvas
          className={style.canvasimg__canvas}
          ref={ref}
          onClick={handleClick}
          onWheel={handleWeel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={(e) => handleMouseDown(e, true)}
          onTouchMove={(e) => handleMouseMove(e, true)}
          onTouchEnd={handleMouseUp}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerOut={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
        <ModalContainer
          top={clickCoords.y}
          left={clickCoords.x}
          tooltip
          open={openModal}
          onClose={handleCloseModal}
        >
          <ImageModalInfo
            modalInfo={modalInfo}
            rowHeight={ROW_HEIGHT}
            rowWidth={ROW_WIDTH}
            gap={GAP}
          />
        </ModalContainer>
      </div>
      <CanvasBtns
        handleZoom={handleZoom}
        getInitDraw={getInitDraw}
        moveDelta={moveDelta}
        disabled={firstImgLoad}
      />
    </div>
  );
};

export default CanvasImage;
