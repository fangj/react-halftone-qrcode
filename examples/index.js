 import React from "react";
 import ReactDOM from "react-dom";
 import HalftoneQRCode from "../src/index";

 ReactDOM.render(
  <HalftoneQRCode src="./mycat.jpg" text="https://github.com/fangj/Halftone-QRCode-Generator"/>,
  document.getElementById("root")
);