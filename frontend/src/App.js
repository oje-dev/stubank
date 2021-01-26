import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ApplicationPage from "./components/application/applicationpage.jsx";
import LandingPage from "./components/landingPage/landingpage.jsx";
import LoginForm from "./components/landingPage/LoginForm";

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
        <Route
          component={() => (
            <div>
              <p>404</p>
            </div>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
