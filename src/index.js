import React from "react";
import ReactPixi from "./react-pixi";
import * as PIXI from "pixi.js";
import "./index.css";
import App from "./App";

const app = new PIXI.Application({ width: 640, height: 480 });
const $root = document.getElementById("root");
$root.appendChild(app.view);

ReactPixi.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  app.stage
);
