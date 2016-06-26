var NGaussian=require("./gaussian");
var tinycolor = require("tinycolor2");
module.exports={
  limitTemplate,
  limit
};

function limitTemplate(qrBytes,ctlBytes,blockSize=6,d2=1,minLightness=0,maxLightness=1) {
  var baseSize=qrBytes.length;
  var imageSize=baseSize*blockSize;
  var imageLength=imageSize*imageSize;
  var UlimitTemplate=new Array(imageLength); //上限模板，限定亮度的最大值，对应二维码黑色部分
  for (let i = 0; i < UlimitTemplate.length; i++) {
    UlimitTemplate[i]=1;
  }
  var DlimitTemplate=new Array(imageLength); //下限模板，限定亮度的最小值，对应二维码白色部分
  for (let i = 0; i < DlimitTemplate.length; i++) {
    DlimitTemplate[i]=0;
  }
  const idx2rowcol=idx=>({row:Math.floor(idx/imageSize),col:Math.floor(idx%imageSize)});
  const rowcol2xy=({row,col})=>({x:Math.floor(col/6),y:Math.floor(row/6)});
  const rowcol2dxdy=({row,col})=>({dx:col%6,dy:row%6});
  const dxdy2didx=({dx,dy})=>dy*blockSize+dx;
  var DlimitBlockTemplate=buildDlimitBlockTemplate(blockSize,d2);
  var UlimitBlockTemplate=buildUlimitBlockTemplate(blockSize,d2);
  //构造上限模板
  for (let i = 0; i < imageLength; i++) {
    const {row,col}=idx2rowcol(i);//大图中行列
    const {x,y}=rowcol2xy({row,col});//对应二维码数组中坐标
    if(ctlBytes[x][y]!==null){//是控制块
      if(!ctlBytes[x][y]){//白色
        DlimitTemplate[i]=maxLightness;
      }else{
        UlimitTemplate[i]=minLightness;
      }
    }else{//内容块
      const {dx,dy}=rowcol2dxdy({row,col});//在小块中的偏移
      const didx=dxdy2didx({dx,dy});
      if(!qrBytes[x][y]){//白色
        DlimitTemplate[i]=DlimitBlockTemplate[didx];
      }else{//黑色
        UlimitTemplate[i]=UlimitBlockTemplate[didx];
      }
    }
  }
  return {UlimitTemplate,DlimitTemplate};
}

function buildDlimitBlockTemplate(blockSize,d2){
  var blockLength=blockSize*blockSize;
  var DlimitBlockTemplate=new Array(blockLength);
  var gs=NGaussian(d2);
  for (var x = 0; x < blockSize; x++) {
    for(var y= 0; y<blockSize;y++){
      var idx=y*blockSize+x;
      var center=(blockSize-1)/2;
      var ux=Math.floor(Math.abs(x-center));
      var uy=Math.floor(Math.abs(y-center));
      var v=gs(ux,uy);
      DlimitBlockTemplate[idx]=v;
    }
  }
  return DlimitBlockTemplate;
}

function buildUlimitBlockTemplate(blockSize,d2){
  var blockLength=blockSize*blockSize;
  var UlimitBlockTemplate=new Array(blockLength);
  var DlimitBlockTemplate=buildDlimitBlockTemplate(blockSize,d2);
  for (var i = 0; i < blockLength; i++) {
    UlimitBlockTemplate[i]=1-DlimitBlockTemplate[i];
  }
  return UlimitBlockTemplate;
}

function limit(imageData,UlimitTemplate,DlimitTemplate) {
  var imageDataLength = imageData.data.length;
  for (var i = 0; i <= imageDataLength; i += 4) {
    var color=tinycolor({ r: imageData.data[i], g: imageData.data[i+1], b: imageData.data[i+2],a:imageData.data[i+3] });
    var hsl=color.toHsl();
    var idx=Math.floor(i/4);
    if(hsl.l>UlimitTemplate[idx]){
      hsl.l=UlimitTemplate[idx];
    }else if(hsl.l<DlimitTemplate[idx]){
      hsl.l=DlimitTemplate[idx];
    }
    var rgb=tinycolor(hsl).toRgb();
    imageData.data[i] = rgb.r;
    imageData.data[i+1] = rgb.g;
    imageData.data[i+2] = rgb.b;
  }
  return imageData;
}