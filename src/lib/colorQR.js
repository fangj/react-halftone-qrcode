var NGaussian=require('./gaussian');
module.exports={
  limitTemplate,
  limit
};

function limitTemplate(qrBytes,ctlBytes,blockSize,d2,minLightness,maxLightness) {
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
  const idx2rowcol=idx=>({row:idx/imageLength,col:idx%imageLength});
  const rowcol2xy=({row,col})=>({x:row/6,y:row/6});
  const rowcol2dxdy=({row,col})=>({dx:row%6,dy:row%6});
  var DlimitBlockTemplate=buildDlimitBlockTemplate(blockSize,d2);
  var UlimitBlockTemplate=buildUlimitBlockTemplate(blockSize,d2);

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
}

function limit(imageData,UlimitTemplate,DlimitTemplate) {
  return imageData;
}