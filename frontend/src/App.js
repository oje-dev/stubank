import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ApplicationPage from "./components/application/applicationpage.jsx";
import LandingPage from "./components/landingPage/landingpage.jsx";
import NotFoundPage from "./components/404page.jsx";
//** Sets landing page and other basic pages */
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <LandingPage />} />
        <Route
          exact
          path="/application"
          component={() => <ApplicationPage />}
        />
        <Route component={() => <NotFoundPage />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
