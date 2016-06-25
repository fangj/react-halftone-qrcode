function NGaussian(d2) {
  return function(x,y){
    return Math.pow(Math.E,-(x*x+y*y)/d2);
  };
}

module.exports=NGaussian;