import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";



// pages for this product
import Components from "views/Components/Components.js";
import newsPage from "views/newsPage/newsPage.js";
import mapPage from "views/mapPage/mapPage.js";
import tablePage from "views/tablePage/tablePage.js";
var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/news" component={newsPage} />
      <Route path="/tables" component={tablePage} />
      <Route path="/" component={mapPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
