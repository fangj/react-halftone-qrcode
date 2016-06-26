 import React from "react";
 import ReactDOM from "react-dom";
 import HalftoneQRCode from "../src/index";
import Dropzone from "./react-dropzone";
var _ = require('lodash');

 
class Example extends React.Component {

   constructor(props) {
     super(props);
     this.state={
      src:"./lz.jpg",
      text:"https://github.com/fangj/react-halftone-qrcode",
      d2:1,
      minLightness:0
     };
     this._setDelta2=_.debounce(v=>{
      this.setState({d2:v});
      console.log('debounced d2',v);
      },200, true);
     this._setMinLightness=_.debounce(v=>{
      this.setState({minLightness:v});
      console.log('debounced minLightness',v);
      },200, true);
   }
 
   render() {
    const{src,text,d2,minLightness}=this.state;
     return (
       <div id="page">
        <h1>Drop Image File to Page</h1>
        <div className="text-bar">
          <input id="text" type="text" ref='text' placeholder="type something..."defaultValue={text} onChange={this.onChange.bind(this)}/>
        </div>
        <Dropzone accept="image/*" multiple={false} onDrop={this.onDrop.bind(this)} className="dropzone">
             <HalftoneQRCode src={src} text={text} d2={d2} minLightness={minLightness}/>
        </Dropzone>
        <div>
        <label>彩度:
        <input type="range"  min="0" max="0.4"  step="0.01" onChange={this.setMinLightness.bind(this)} defaultValue="0" /></label>
        </div>
        <div>
        <label>平滑度:
        <input type="range"  min="1" max="20"  step="1" onChange={this.setDelta2.bind(this)}  defaultValue="1" />
        </label>
        </div>
       </div>
     );
   }

   onDrop(files){
    const file=files[0];
    this.setState({src:file.preview});
   }

   onChange(evt){
    this.setState({text:evt.target.value});
   }

   setDelta2(evt){
    const v=Number(evt.target.value);
    console.log('d2',v);
    this._setDelta2(v);
    // this.setState({d2:v});
   }

   setMinLightness(evt){
    const v=Number(evt.target.value);
    console.log('MinLightness',v);
    this._setMinLightness(v);
    // this.setState({minLightness:v});
   }


 }
 

  ReactDOM.render(
  <Example />,
  document.getElementById("root")
);