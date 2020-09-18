import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomePage from './pages/HomePage';
import TalkPage from './pages/TalkPage';
import CalendarPage from './pages/CalendarPage';
import NotePage from './pages/NotePage';
import DrivePage from './pages/DrivePage';

function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <div className="teespace">
        <h1>TeeSpace Apps</h1>
        <div className="menu">
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/talk">토크</Link>
            </li>
            <li>
              <Link to="/calendar">캘린더</Link>
            </li>
            <li>
              <Link to="/note">노트</Link>
            </li>
            <li>
              <Link to="/drive">드라이브</Link>
            </li>
          </ul>
          <button
            type="button"
            onClick={() => {
              if (i18n.language === 'kr') {
                i18n.changeLanguage('en');
              } else {
                i18n.changeLanguage('kr');
              }
            }}
          >
            {i18n.language}
          </button>
        </div>
        <div className="apps">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/talk" component={TalkPage} />
            <Route path="/calendar" component={CalendarPage} />
            <Route path="/note" component={NotePage} />
            <Route path="/drive" component={DrivePage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
