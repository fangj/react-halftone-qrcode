import React from "react";
import dither from "./lib/dither";
var qrcode=require("./lib/qrcode");
var halftoneQR=require("./lib/halftoneQR");

class HalftoneQRCode extends React.Component {

  static propTypes= {
    text: React.PropTypes.string.isRequired,
    src: React.PropTypes.string.isRequired,
    size: React.PropTypes.number,
    pixelSize: React.PropTypes.number,
    level: React.PropTypes.oneOf(['L', 'M', 'Q', 'H']),
    colorLight: React.PropTypes.string,
    colorDark: React.PropTypes.string
  };

  static defaultProps = {
    pixelSize:2,
    size: 246,
    level: "H",
    colorLight: "#FFFFFF",
    colorDark: "#000000",
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const {src,text,colorLight,colorDark}=this.props;
    const img=new Image();
    img.src=src;
    img.onload=()=>{
      const c=this.refs.canvas;
      var ctx=c.getContext("2d");
      ctx.fillStyle = "#808080";
      ctx.fillRect(0,0, c.width,c.height);
      ctx.drawImage(img,0,0,c.width,c.height);
      var imageData = ctx.getImageData(0, 0, c.width, c.height);
      imageData=dither(imageData);
      ctx.putImageData(imageData,0,0);



      var qr = qrcode(6, "H");
      qr.addData(text);
      qr.make();
        
      var controls = qrcode(6, "H");
      controls.addData(text);
      controls.make(true);

      var halftoneQRArray=halftoneQR(qr.returnByteArray(), controls.returnByteArray());

      var qrc=drawArrayToCanvas(halftoneQRArray,colorLight,colorDark);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(qrc,0,0,c.width,c.height);
    };

  }

  render() {
    return (
      <canvas ref="canvas"
        height={this.props.size}
        width={this.props.size}/>
    );
  }
}

function drawArrayToCanvas(arr,colorLight,colorDark){
  const c=document.createElement('canvas');
  var size=arr.length;
  c.setAttribute('width',size);
  c.setAttribute('height',size);
  var ctx=c.getContext("2d");
  for(var i=0;i<arr.length;i++){
    for(var j=0;j<arr.length;j++){
       if (arr[i][j] === undefined){continue;} 
       if (arr[i][j] === true) {
          ctx.fillStyle = colorDark;
        } else {
          ctx.fillStyle = colorLight;
       }
      ctx.fillRect(i,j, 1, 1);
    }
  }
  return c;
}
module.exports=HalftoneQRCode;