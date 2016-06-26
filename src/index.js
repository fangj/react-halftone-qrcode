import React from "react";
var qrcode=require("./lib/qrcode");
var colorQR=require("./lib/colorQR");

class HalftoneQRCode extends React.Component {

  static propTypes= {
    text: React.PropTypes.string.isRequired,
    src: React.PropTypes.string.isRequired
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
    const {src,text}=this.props;
    const img=new Image();
    img.src=src;
    console.log('img.src',img.src);
    img.onload=()=>{
      const versions = {
            L: [152, 272, 440, 640, 864, 1088, 1248, 1552, 1856, 1240],
            M: [128, 224, 352, 512, 688, 864,  992,  700,  700,  524],
            Q: [104, 176, 272, 384, 286, 608,  508,  376,  608,  434],
            H: [72,  128, 208, 288, 214, 480,  164,  296,  464,  346]
        };
      const QRsizes=[21,25,29,33,37,41,45,49,53,57];
      var QRversion=6;
      var level="H";
      var len=text.length*8;
      if(len>1856){
        console.error("too long length",len);
        throw new Error("too long length:"+len);
      }else if(len<=480){
        QRversion=6;level="H";
      }else if(len<=608){
        QRversion=6;level="Q";
      }else if(len<=992){
        QRversion=7;level="M";
      }else if(len<=1248){
        QRversion=7;level="L";
      }else if(len<=1552){
        QRversion=8;level="L";
      }else{ //len<=1856
        QRversion=9;level="L";
      }

      console.log("QRversion,level",QRversion,level);

      var qr = qrcode(QRversion, level);
      qr.addData(text);
      qr.make();
        
      var controls = qrcode(QRversion, level);
      controls.addData(text);
      controls.make(true);

      const {UlimitTemplate,DlimitTemplate}=colorQR.limitTemplate(qr.returnByteArray(), controls.returnByteArray(),6,1,0.1,0.9);

      var QRSize=QRsizes[QRversion-1];


      //draw image
      const c=this.refs.canvas;
      c.width=QRSize*6;
      c.height=QRSize*6;

      var ctx=c.getContext("2d");
      ctx.fillStyle = "#808080";
      ctx.fillRect(0,0, c.width,c.height);
      ctx.drawImage(img,0,0,c.width,c.height);
      var imageData = ctx.getImageData(0, 0, c.width, c.height);
      imageData=colorQR.limit(imageData,UlimitTemplate,DlimitTemplate);
      ctx.putImageData(imageData,0,0);
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

module.exports=HalftoneQRCode;