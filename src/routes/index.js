import React from "react";
import { Switch } from "react-router-dom";

import MyRoute from "./MyRoute";
import Login from "../pages/Login";
import Register from "../pages/Register/index";
import Students from "../pages/Students/index";
import Student from "../pages/Student/index";
import Photos from "../pages/Photos/index";
import Page404 from "../pages/Page404";

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Students} isClosed={false} />
      <MyRoute exact path="/student/:id/edit" component={Student} isClosed />
      <MyRoute exact path="/student/" component={Student} isClosed />
      <MyRoute exact path="/photos/:id" component={Photos} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
