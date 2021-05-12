import React from "react";
import FileUploader from "./views/FileUploader/FileUploader";
import AudioList from "./views/Audio/AudioList";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/list" component={AudioList} />
        <Route path="/" component={FileUploader} exact={true} />
      </Switch>
    </BrowserRouter>
  );
}
