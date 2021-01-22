import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import create from "./pages/create";
import display from "./pages/display";
import update from "./pages/update";

function App() {
  return (
    <div className={"container"}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" exact component={create} />
          <Route path="/contacts/:id" exact component={display} />
          <Route path="/contacts/:id/update" exact component={update} />
        </Switch>
      </Router>
      <footer className="footer">
        <a
          href="https://mayank-chaudhari.web.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Mayank Chaudhari
        </a>
      </footer>
    </div>
  );
}

export default App;
