(function(ecc){

    // 设置数值精度
    function setScale(value, scale) {
        return (Math.floor(value * Math.pow(10, scale)) / Math.pow(10, scale)).toFixed(scale);
    }
    window.setScale = setScale;

    /**
     * 生成64位hex随机数
     */
    function randomHex(){
        var chars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
        var nums="";
        for(var i=0;i<64;i++){
            var id = parseInt(Math.random()*16);
            nums+=chars[id];
        }
        return nums;
    }
    window.randomHex = randomHex;

    /**
     * EOS风格的sha256加密
     * @param {string} source 64位随机数源
     */
    function eosSha256(source){
        return ecc.sha256(getEosSha256Array(source));
    }
    window.eosSha256 = eosSha256;
    
    /**
     * 获取EOS风格的sha256源数组
     * @param {string} sha256Source 64位随机数源
     * @returns 每2位为一组的数字数组
     */
    function getEosSha256Array(sha256Source){
        if(sha256Source.length != 64){
            throw "sha256Source length must be 64";
        }
        var sourceArr = sha256Source.split("");
        var result = [];
        for(var i=0;i<32;i++){
            var hex_str = sourceArr[i*2] + sourceArr[i*2+1];
            var num = parseInt(hex_str,16);
            result[i] = num;
        }
        return result;
    }
    window.getEosSha256Array = getEosSha256Array;

    /**
     * 将十进制数组分32次转成16进制字符串
     */
    function hashToString(hash){
        var result = "";
        for(var i=0;i<32;i++){
            //将十进制数字转成十六进制字符串
            var hex_str = hash[i].toString(16);
            
            if(hex_str.length == 0){
                hex_str = "00";
            } else if(hex_str.length == 1){
                hex_str = "0" + hex_str;
            }
            result += hex_str;
        }
        return result;
    }
    window.hashToString = hashToString;

})(window.eosjs_ecc);
