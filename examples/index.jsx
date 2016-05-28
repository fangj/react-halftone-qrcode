 import React from "react";
 import ReactDOM from "react-dom";
 import HalftoneQRCode from "../src/index";
import Dropzone from "./react-dropzone";
var omggif = require('omggif');

 
class Example extends React.Component {

   constructor(props) {
     super(props);
     this.state={
      src:"./catpaw-bw.jpg",
      text:"https://github.com/fangj/react-halftone-qrcode"
     }
   }
 
   render() {
    const{src,text}=this.state;
     return (
       <div id="page">
        <h1>Drop Image File to Page</h1>
        <div className="text-bar">
          <input id="text" type="text" ref='text' placeholder="type something..."defaultValue={text} onChange={this.onChange.bind(this)}/>
        </div>
        <Dropzone accept="image/*" multiple={false} onDrop={this.onDrop.bind(this)} className="dropzone">
             <HalftoneQRCode src={src} text={text}/>
        </Dropzone>
        <canvas ref='gif' />
       </div>
     );
   }

   onDrop(files){
    const gif=this.refs.gif;

    const file=files[0];
    // this.setState({src:files[0].preview});
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    // reader.readAsBinaryString(file);

    reader.onload = function(e) { 
       var abuf=e.target.result;
       console.log(abuf);
       const buf=new Uint8Array(abuf);
       console.log(buf[0],buf[1],buf[2]);
       var gr = new omggif.GifReader(buf);
       var frame_info = gr.frameInfo(0);
      console.log('gr.width, gr.height',gr.width, gr.height,gr.numFrames(),frame_info);
      var pixels=[];
      var start = Date.now();
      gr.decodeAndBlitFrameBGRA(0, pixels);
      console.log('Decoded and blit frame in: '  + (Date.now() - start) + 'ms');
      gif.height=gr.height;
      gif.width=gr.width;
      var ctx=gif.getContext("2d");
      var imageData = ctx.getImageData(0, 0, gif.width, gif.height);
      console.log(imageData);
      gr.decodeAndBlitFrameRGBA(0, imageData.data);
      gr.decodeAndBlitFrameRGBA(1, imageData.data);

      ctx.putImageData(imageData,0,0);
     };
   }

   onChange(evt){
    this.setState({text:evt.target.value});
   }
 }
 

  ReactDOM.render(
  <Example />,
  document.getElementById("root")
);