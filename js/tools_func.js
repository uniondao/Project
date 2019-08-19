//过滤
function onlyNumber(obj) {
    //得到第一个字符是否为负号
    var t = obj.value.charAt(0);
    //先把非数字的都替换掉，除了数字和. 
    obj.value = obj.value.replace(/[^\d\.]/g, '');
    //必须保证第一个为数字而不是. 
    obj.value = obj.value.replace(/^\./g, '');
    //保证只有出现一个.而没有多个. 
    obj.value = obj.value.replace(/\.{2,}/g, '.');
    //保证.只出现一次，而不能出现两次以上 
    obj.value = obj.value.replace('.', '$#$').replace(/\./g, '').replace(
        '$#$', '.');
    //如果第一位是负号，则允许添加
    if (t == '-') {
        obj.value = '-' + obj.value;
    }
}

function toNum(str) {
    //得到第一个字符是否为负号
    var t = str.charAt(0);
    //先把非数字的都替换掉，除了数字和. 
    str = str.replace(/[^\d\.]/g, '');
    //必须保证第一个为数字而不是. 
    str = str.replace(/^\./g, '');
    //保证只有出现一个.而没有多个. 
    str = str.replace(/\.{2,}/g, '.');
    //保证.只出现一次，而不能出现两次以上 
    str = str.replace('.', '$#$').replace(/\./g, '').replace(
        '$#$', '.');
    //如果第一位是负号，则允许添加
    if (t == '-') {
        str = '-' + str;
    }
    return str;
}


/** 
 * 时间戳格式化函数 
 * @param  {string} format    格式 
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间 
 * @return {string}           格式化的时间字符串 
 */
function  timestampToTime(timestamp) {        
    var   date =  new  Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000     
    var  Y = date.getFullYear() +  '-';        
    var  M = (date.getMonth() + 1 < 10 ?  '0' + (date.getMonth() + 1) : date.getMonth() + 1) +  '-';        
    var  D = date.getDate() +  ' ';        
    var  h = date.getHours();  
    h = String(h).length < 2 ? '0' + h : h;  
    h = h +  ':';  
    var  m = date.getMinutes();   
    m = String(m).length < 2 ? '0' + m : m;      
    // var  s = date.getSeconds();        
    return  Y + M + D + h + m;
}

//小数除法
function dNum(num1,num2) {
    return (Math.floor(num1/num2 * 10000) / 100.00)
}