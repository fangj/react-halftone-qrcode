//original version By Lachlan  http://lach.la/
//modified by Fang Jian https://github.com/fangj

function halftoneQR(QRBytes, controlBytes) {
    var halftoneImageSize=QRBytes.length * 3;
    var i,j;

    var halftoneImageArray=new Array(halftoneImageSize);
    for(i=0;i<halftoneImageSize;i++){
        halftoneImageArray[i]=new Array(halftoneImageSize);
    }
    
    for ( i = 0; i < QRBytes.length; i++) {
        for ( j = 0; j < QRBytes[i].length; j++) {
            // Middle Cell
            halftoneImageArray[i * 3 + 1][j *3 + 1]=QRBytes[i][j];
        }
    }

    // Re-draw control bytes
    for ( i = 0; i < controlBytes.length; i++) {
        for ( j = 0; j < controlBytes[i].length; j++) {
            var point=controlBytes[i][j];
            if (point!== null) {
                halftoneImageArray[i * 3 + 0][j *3 + 0]=point;
                halftoneImageArray[i * 3 + 0][j *3 + 1]=point;
                halftoneImageArray[i * 3 + 0][j *3 + 2]=point;
                halftoneImageArray[i * 3 + 1][j *3 + 0]=point;
                halftoneImageArray[i * 3 + 1][j *3 + 1]=point;
                halftoneImageArray[i * 3 + 1][j *3 + 2]=point;
                halftoneImageArray[i * 3 + 2][j *3 + 0]=point;
                halftoneImageArray[i * 3 + 2][j *3 + 1]=point;
                halftoneImageArray[i * 3 + 2][j *3 + 2]=point;
            }
        }
    }
    return halftoneImageArray;
}
module.exports = halftoneQR;