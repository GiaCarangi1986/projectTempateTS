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

const AppWithRouter = () => {
  const currentUser = Cookies.get(COOKIES_DATA.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate(PAGE_NAME.auth);
    }
  }, []);

  return (
    <Routes>
      <Route
        path={PATHS.main}
        element={<GetStandartPage pageName={PAGE_NAME.main} />}
      />
      <Route
        path={PATHS.auth}
        element={<GetStandartPage pageName={PAGE_NAME.auth} />}
      />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppWithRouter />
  </Router>
);

export default App;
