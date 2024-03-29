import {
  afterSendChangesPicture,
  agreeResultsPicture,
  autoTestRelultsPicture,
  changeResultsPicture,
  defectClassesPicture,
  exportLismSnackMessagePicture,
  formDataPicture,
  formDataLoadingPicture,
  historyPicture,
  historyCheckboxesPicture,
  historyDatesPicture,
  historyDatesSortPicture,
  historyDetailsPicture,
  historyEmptyPicture,
  historySearchCloseIconPicture,
  howDeleteTempletePicture,
  imgCanvasDefectChoosePicture,
  imgCanvasMainPicture,
  loginPicture,
  newTestPicture,
  newTestNotAutoPicture,
  notAutoTestResultsPicture,
  pdfAutoPicture,
  pdfNotAutoPicture,
  statisticsPicture,
  statisticsHoverPicture,
  warnDeleteTempletePicture,
  warnDeleteTestPicture,
  withoutDefectsPicture
} from '../../images';

import { ReferenceData } from './types';

const referenceDocData: ReferenceData[] = [
  {
    text: [
      {
        paragraph:
          'Чтобы начать работу с системой, пользователю необходимо залогиниться в окне, представленном на рисунке 1.'
      }
    ],
    image: loginPicture
  },
  {
    text: [
      {
        paragraph:
          'После ввода верных данных откроется главная страница приложения (рис. 2).'
      }
    ],
    image: newTestPicture
  },
  {
    text: [
      {
        paragraph:
          'Сверху находится навигационная панель, с помощью которой можно переходить по страницам приложения (НОВЫЙ ТЕСТ, ИСТОРИЯ ТЕСТОВ, СТАТИСТИКА, СПРАВКА, ВЫЙТИ).'
      },
      {
        paragraph:
          'Задача страницы НОВЫЙ ТЕСТ – провести анализ образца. Для этого пользователю необходимо нажать на кнопку НАЧАТЬ АНАЛИЗ.'
      },
      {
        paragraph:
          'В системе предусмотрена автоматическая проверка работоспособности системы, подразумевающая то, что время от времени лаборанту необходимо вручную подтверждать результаты испытаний (или сообщать об ошибке(-ах)). Если тест нуждается в подтверждении, пользователь увидит соответствующее модальное окно, как на рисунке 3.'
      }
    ],
    image: newTestNotAutoPicture
  },
  {
    text: [
      {
        paragraph:
          'Итак, после нажатия на кнопку НАЧАТЬ АНАЛИЗ может появиться модальное окно, информирующее о необходимости подтвердить тест. Далее в независимости от того, является тест валидационным или нет, появляется форма для заполнения данных, показанная на рисунке 4.'
      }
    ],
    image: formDataPicture
  },
  {
    text: [
      {
        paragraph:
          'После корректного заполнения всех необходимых полей начинается выполнение анализа – запуск установки. Процесс ожидания показан на рис. 5.'
      }
    ],
    image: formDataLoadingPicture
  },
  {
    text: [
      {
        paragraph:
          'Далее возможны разные вариации. Образец может оказаться без дефектов. Такой случай изображен на рис. 6.'
      }
    ],
    image: withoutDefectsPicture
  },
  {
    text: [
      {
        paragraph:
          'Если тест не требовал действий от лаборанта, отобразится что-то наподобие рисунка 7.'
      }
    ],
    image: autoTestRelultsPicture
  },
  {
    text: [
      {
        paragraph:
          'Когда тест требует подтверждения/сообщения об ошибках система выводит информацию, как на рисунке 8.'
      }
    ],
    image: notAutoTestResultsPicture
  },
  {
    text: [
      {
        paragraph:
          'Для начала рассмотрим базовые возможности. Слева всегда расположены 2 кнопки – СБРОСИТЬ ТЕСТ и + (кнопка + доступна не всегда, о чем будет написано дальше). По нажатию на кнопку СБРОСИТЬ ТЕСТ текущий тест удаляется из базы данных, а пользователь возвращается на начало страницы НОВЫЙ ТЕСТ (рис. 2). Также появляется модальное окно, предупреждающее о том, что тест навсегда удалится (рис. 9).'
      }
    ],
    image: warnDeleteTestPicture
  },
  {
    text: [
      {
        paragraph:
          'По нажатию на кнопку + текущий тест НЕ удаляется, но пользователь также попадает на начальную страницу НОВЫЙ ТЕСТ. В этом случае модальное окно не появляется.'
      },
      {
        paragraph:
          'Теперь рассмотрим другие возможности приложения. Если тестируемый образец имеет дефекты, слева отобразятся картинки темлетов, а справа информация о них. Темлеты пронумерованы по индексу (по порядку, в котором они следуют друг за другом, начиная с цифры 1). Так кусок (темплет) можно удалить, нажав на крестик соответствующего изображения, показанный на рис. 10 красной стрелкой. На этом же рисунке видно, как изображение соотносится с темлетом (обведено зеленой рамкой).'
      }
    ],
    image: howDeleteTempletePicture
  },
  {
    text: [
      {
        paragraph:
          'Если нажать на крестик любой картинки, появится окно с предупреждением, показанное на рисунке 11.'
      }
    ],
    image: warnDeleteTempletePicture
  },
  {
    text: [
      {
        paragraph:
          'Если удалить любой темплет, то индексы остальных выровняются в соответствие с заданной логикой. Например, было проанализировано 4 темплета с индексами 1, 2, 3 и 4, и пользователь удалил по каким-то причинам темлпет №2. В таком случае останется 3 темплета с индексами 1, 2 и 3.'
      },
      {
        paragraph:
          'Изображения темлетов можно не только удалять, но и работать с ними. Для этого требуется нажать на определённое изображение. Откроется модальное окно, как на рисунке 12.'
      }
    ],
    image: imgCanvasMainPicture
  },
  {
    text: [
      {
        paragraph:
          'Слева представлена легенда, представляющая из себя соотношение цветов и дефектов. По середине располагается фотография темплета с изображенными дефектами. Чуть ниже находятся кнопки, позволяющие работать с изображением. Справа представлена подробная информация о дефектах.'
      },
      {
        paragraph:
          'Подробнее о кнопках. Приблизить изображение можно по кнопке +, отдалить – по кнопке -. Следующая кнопка возвращает изображение в первоначальное положение. Остальные 4 кнопки перемещают изображение вниз/вверх и влево/вправо соответственно. '
      },
      {
        paragraph:
          'Изображение можно перемещать, удерживая и перетаскивая мышку. Если крутить колесико мышки, то изображение будет увеличиваться и уменьшаться. По клику в область, заключенную в прямоугольник цвета какого-либо дефекта, появится область, в которой будет представлена информация о наименовании дефекта и его размерах в квадратных мм (рис. 13). Также справа информация будет приведена только для дефекта, по которому нажал пользователь. При последующем клике в любое место область с информацией закроется, а справа снова отобразятся данные по всем дефектам.'
      }
    ],
    image: imgCanvasDefectChoosePicture
  },
  {
    text: [
      {
        paragraph:
          'Теперь выйдем из модального окна с изображением и обратимся к правой области, где представлена информация о дефектах, баллах и возможностях экспорта системы. Если навести мышь на любой дефект (его наименование) и кликнуть, то появится модальное окно с кластеризацией по дефекту (рис. 14), аналогичное с правой областью на рис. 13, которое отображалось по клику на соответствующий дефект на изображении.'
      }
    ],
    image: defectClassesPicture
  },
  {
    text: [
      {
        paragraph:
          'Прокрутим область и внизу обнаружим кнопку ВЫГРУЗИТЬ ОТЧЕТ, по которой на компьютер скачается соответствующий PDF файл (рис. 15).'
      }
    ],
    image: pdfAutoPicture
  },
  {
    text: [
      {
        paragraph:
          'Чуть ниже располагается кнопка ЭКСПОРТ В ЛИМС, которая становится активной, когда лаборант вводит номер в поле, называющееся НОМЕР QMET. Если экспорт завершился успешно, пользователь увидит соответствующую всплывашку, иначе – сообщение об ошибке, что показано на рисунке 16.'
      }
    ],
    image: exportLismSnackMessagePicture
  },
  {
    text: [
      {
        paragraph:
          'Теперь наконец рассмотрим случай, когда тест необходимо подтвердить. Такой тест был представлен ранее на рисунке 8.'
      },
      {
        paragraph:
          'Слева почти ничего не изменилось, кроме того, что кнопка + (начать новый тест) недоступна. Она становится активной, если подтвердить тест или отправить сообщение об ошибках. Чтобы подтвердить тест, нужно сдвинуть ползунок вправо (рис. 17). В таком случае кнопка + становится активной, а область справа фактически идентична той, что была для тестов, не требующих подтверждения.'
      }
    ],
    image: agreeResultsPicture
  },
  {
    text: [
      {
        paragraph:
          'Если же лаборант не согласен с результатами теста, ползунок следует перевести влево и в поле(-ях), в котором(-ых) система присвоила неверный балл, вписать нужный, как на рисунке 18. В таком случае появится кнопка ОТПРАВИТЬ ИСПРАВЛЕНИЯ, по нажатию на которую тест будет считаться завершенным и уже не получится изменить его данные (поля становятся неактивными). См. рис. 19.'
      }
    ],
    image: changeResultsPicture
  },
  {
    image: afterSendChangesPicture
  },
  {
    text: [
      {
        paragraph:
          'Однако теперь стала доступна возможность выгрузить отчет, в котором будет приведена информация о визуальном контроле, автоматическом и изображениях темплета с выделенными дефектами и без них. Исправленные лаборантом данные выделены красным цветом (рис. 20).'
      }
    ],
    image: pdfNotAutoPicture
  },
  {
    text: [
      {
        paragraph:
          'Дополнительная информация по изменению полей с баллами и отправке ошибок. Если изменить поля, а затем ползунок ПОДТВЕРДИТЬ, ЧТО АВТОМАТИЗИРОВАННЫЙ КОНТРОЛЬ ПРОШЕЛ УСПЕШНО сдвинуть вправо, то баллы вернутся в исходное положение. Также чтобы кнопка ОТПРАВИТЬ ИЗМЕНЕНИЯ стала активна, необходимо внести изменение хотя бы в 1 дефект.'
      },
      {
        paragraph:
          'Теперь перейдем к странице ИСТОРИЯ ТЕСТОВ, показанной на рисунке 21.'
      }
    ],
    image: historyPicture
  },
  {
    text: [
      {
        paragraph:
          'По нажатию справа на кнопку + НАЧАТЬ ТЕСТ, пользователь окажется на вкладке НОВЫЙ ТЕСТ, которую мы подробно рассмотрели ранее.'
      },
      {
        paragraph:
          'На данной странице сверху располагаются различные фильтры, а ниже сама таблица, содержащая информацию о проведенных испытаниях. Сначала обратимся к фильтрам. Чтобы воспользоваться фильтрацией по датам, необходимо выбрать корректные даты начала и окончания и нажать на кнопку с иконкой лупы. Тогда в таблице будут отображены тесты, проведенные в этот период (рис. 22).'
      }
    ],
    image: historyDatesPicture
  },
  {
    text: [
      {
        paragraph:
          'В случае, если для примененных фильтров не будет найдено испытаний, система выведет сообщение об этом, как на рисунке 23.'
      }
    ],
    image: historyEmptyPicture
  },
  {
    text: [
      {
        paragraph:
          'Фильтры по дате и поиску можно сбросить, нажав на крестик рядом с ними. При этом возможно 2 поведения системы. Если применить фильтр, например, по поиску, а затем нажать крестик, то система выполнит запрос и очистит поля для ввода. Если же фильтр не применять, а просто ввести значение и далее нажать на крестик, то система выполнять запрос НЕ будет, а лишь очистит поле ввода.'
      },
      {
        paragraph:
          'Продолжим разбираться с фильтрами. С поиском все довольно очевидно: пользователь вводит значение, жмет на лупу, система находит записи, содержащие данное значение. При вводе символов рядом автоматически появляется крестик, позволяющий очистить поле (рис. 24).'
      }
    ],
    image: historySearchCloseIconPicture
  },
  {
    text: [
      {
        paragraph:
          'Перейдем к чекбоксам справа от поиска. По умолчанию они все активны, и система выводит все записи. Если отжать какие-либо значения, то система покажет испытания без этих значений. Так если отжать БЕЗ ПОДТВЕРЖДЕНИЯ и УСПЕШНОЕ ПОДТВЕРЖДЕНИЕ, то в таблице окажутся только тесты с неуспешным подтверждением (рис. 25).'
      }
    ],
    image: historyCheckboxesPicture
  },
  {
    text: [
      {
        paragraph:
          'Заметим, что тесты без подтверждения выделяются белым цветом, тесты с успешным подтверждением зеленым цветом, а тесты с неуспешным подтверждением красным цветом.'
      },
      {
        paragraph:
          'Также реализована сортировка для столбцов, в названии которых присутствует иконка стрелочки, например, АВТОР, ДАТА И ВРЕМЯ и др. Чтобы отсортировать таблицу по наименованию столбца, необходимо нажать на его название. При первом нажатии столбца данные отсортируются по убыванию, при втором по возрастанию (см. рис. 26), а при третьем – вернутся в исходное значение по умолчанию.'
      }
    ],
    image: historyDatesSortPicture
  },
  {
    text: [
      {
        paragraph:
          'Стоит отметить, что невзаимозаменяющие фильтры (например, сортировка по ДАТА И ВРЕМЯ и по ТИП ПРОДУКЦИИ) можно использовать вместе. То есть можно набрать что-то в поиске, а потом отсортировать таблицу по какому-либо столбцу, затем убрать галочку с тестов БЕЗ ПОДТВЕРЖДЕНИЯ и т. п.'
      },
      {
        paragraph:
          'Теперь рассмотрим саму таблицу. Слева у каждой строки расположена иконка, по нажатию на которую можно детально посмотреть выбранный тест (рис. 27).'
      }
    ],
    image: historyDetailsPicture
  },
  {
    text: [
      {
        paragraph:
          'В модальном окне можно посмотреть информацию о дефектах для данного теста, их баллах, можно выгрузить отчет по соответствующей кнопке, а также можно нажать на изображение и работать с ним так же, как описывалось ранее для рисунков 12 и 13.'
      },
      {
        paragraph: 'Переходим на вкладку статистика (рис. 28).'
      }
    ],
    image: statisticsPicture
  },
  {
    text: [
      {
        paragraph:
          'Здесь можно посмотреть информацию в динамике для каждого дефекта за определенный период – по умолчанию за последнюю неделю. Чтобы изменить период необходимо сверху выбрать корректные даты начала и окончания и применить аналогично тому, как для фильтрации по датам в ИСТОРИЯ ТЕСТОВ.'
      },
      {
        paragraph:
          'На графике можно заметить точки, при наведении на которые всплывает более детальная информация – дата статистики, балл визуального и автоматического контроля (рис. 29).'
      }
    ],
    image: statisticsHoverPicture
  },
  {
    text: [
      {
        paragraph:
          'Далее в навигационной панели находится вкладка СПРАВКА. В ней располагается изложенный здесь материал.'
      },
      {
        paragraph:
          'По последней вкладке ВЫЙТИ осуществляется выход пользователя из системы.',
        className: 'margin-bottom'
      }
    ]
  },
  {
    text: [
      {
        paragraph:
          'Все основные возможности были изложены в данном руководстве. Если остались вопросы, пожалуйста, свяжитесь с нами. Приятного использования!'
      }
    ]
  }
];

export default referenceDocData;
