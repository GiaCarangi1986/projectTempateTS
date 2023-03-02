import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import { COOKIES_DATA, PAGE_NAME, PATHS } from './const';
import GetStandartPage from './pages';
import Container from './components/Container';

const AppWithRouter = () => {
  const token = Cookies.get(COOKIES_DATA.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate(PAGE_NAME.auth);
    }
  }, []);

  return (
    <Container>
      <Routes>
        <Route
          path={PATHS.main}
          element={<GetStandartPage pageName={PAGE_NAME.main} />}
        />
        <Route
          path={PATHS.auth}
          element={<GetStandartPage pageName={PAGE_NAME.auth} />}
        />
        <Route
          path={PATHS.history}
          element={<GetStandartPage pageName={PAGE_NAME.history} />}
        />
        <Route
          path={PATHS.statistics}
          element={<GetStandartPage pageName={PAGE_NAME.statistics} />}
        />
        <Route
          path={PATHS.reference}
          element={<GetStandartPage pageName={PAGE_NAME.reference} />}
        />
      </Routes>
    </Container>
  );
};

const App = () => (
  <Router>
    <AppWithRouter />
  </Router>
);

export default App;
