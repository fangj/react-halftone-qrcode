import React from "react";
import dither from "./lib/dither";
export default class HalftoneQRCode extends React.Component {
  static defaultProps = {
    size: 128,
    level: "L",
    bgColor: "#FFFFFF",
    fgColor: "#000000",
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {src}=this.props;
    const img=new Image();
    img.crossOrigin="anonymous";
    img.src=src;
    img.onload=()=>{
      const c=this.refs.canvas;
      var cxt=c.getContext("2d");
      cxt.fillStyle="#FF0000";
      cxt.drawImage(img,0,0,c.width,c.height);
      var imageData = cxt.getImageData(0, 0, c.width, c.height);
      imageData=dither(imageData);
      cxt.putImageData(imageData,0,0);
    };
  }

  render() {
    return (
      <div>
      <canvas ref="canvas" 
        height={this.props.size}
        width={this.props.size}/>
      </div>
    );
  }
}
