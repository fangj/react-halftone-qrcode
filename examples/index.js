 import React from "react";
 import ReactDOM from "react-dom";
 import HalftoneQRCode from "../src/index";

 ReactDOM.render(
  <HalftoneQRCode src="./catpaw-bw.jpg" text="https://github.com/fangj/react-halftone-qrcode"/>,
  document.getElementById("root")
);