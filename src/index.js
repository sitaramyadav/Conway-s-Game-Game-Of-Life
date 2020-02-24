import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
function AppDefaultStyles(props) {
  return (
    <div className={props.className}>
      <App />
    </div>
  );
}
ReactDOM.render(
  <AppDefaultStyles app="main"></AppDefaultStyles>,
  document.getElementById("app") // eslint-disable-line no-undef
);
