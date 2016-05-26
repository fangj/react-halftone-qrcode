# react-halftone-qrcode

A React component to generate [Halftone QRCode](http://vecg.cs.ucl.ac.uk/Projects/SmartGeometry/halftone_QR/halftoneQR_sigga13.html) with image.
Inspired by [Lachlan Arthur](http://jsfiddle.net/lachlan/r8qWV/)

## Demo

http://fangj.github.io/react-halftone-qrcode/

## Installation

```sh
npm install react-halftone-qrcode
```

## Usage

```js
import React from "react";
import ReactDOM from "react-dom";
import HalftoneQRCode from "../src/index";

ReactDOM.render(
<HalftoneQRCode src="./catpaw-bw.jpg" text="https://github.com/fangj/react-halftone-qrcode"/>,
document.getElementById("root")
);
```

## Available Props

prop        | type                 | default value
------------|----------------------|-----------------------------------
`text`      | `string`             | `https://github.com/fangj/react-halftone-qrcode`
`src`       | `string`             | 
`colorLight`| `string` (CSS color) | `"#FFFFFF"`
`colorDark` | `string` (CSS color) | `"#000000"`
`size`      | `number`             | `246`

<img src="screenshots/halftone-qrcode-catpaw.png" height="246" width="246">
<img src="screenshots/halftone-qrcode-cat.png" height="246" width="246">
