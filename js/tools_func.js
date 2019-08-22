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

//验证发送txid是否成功
function Verification_send(txid){
    var apiurl = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash="+txid+"&apikey=EE6CHPQTD4GXBQPYKBS4IHHCAG6PM93W2B";
    $.get(apiurl, function(data) {
        if(!data.result){
            setTimeout(Verification_send(txid), 1000);
        }else{
            if(data.result.status == '0x1'){
                alert(script_Lan.send_success[currentLan]);
            }else{
                alert(script_Lan.send_fail[currentLan]);
            }
            $('#udao_send').html(script_Lan.next[currentLan]);
            $('#undt_send').html(script_Lan.next[currentLan]);
        }
    });
}

//验证创建账号txid是否成功
function Verification_immediate(txid){
    var apiurl = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash="+txid+"&apikey=EE6CHPQTD4GXBQPYKBS4IHHCAG6PM93W2B";
    $.get(apiurl, function(data) {
        if(!data.result){
            setTimeout(Verification_immediate(txid), 1000);
        }else{
            if(data.result.status == '0x1'){
                alert(script_Lan.create_acount[currentLan]);
            }else{
                alert(script_Lan.operate_err[currentLan]);
            }
            $('#createAccount').html(script_Lan.immediate_application[currentLan]);
        }
    });
}

//验证认购txid是否成功
function Verification_presale(txid){
    var apiurl = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash="+txid+"&apikey=EE6CHPQTD4GXBQPYKBS4IHHCAG6PM93W2B";
    $.get(apiurl, function(data) {
        if(!data.result){
            setTimeout(Verification_presale(txid), 1000);
        }else{
            if(data.result.status == '0x1'){
                alert(script_Lan.submitSuccess[currentLan]);
            }else{
                alert(script_Lan.submitError[currentLan]);
            }
            $("#und2udao").html(script_Lan.participate_now[currentLan]);
        }
    });
}

//验证授权txid是否成功
function Verification_apply(txid){
    var apiurl = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash="+txid+"&apikey=EE6CHPQTD4GXBQPYKBS4IHHCAG6PM93W2B";
    $.get(apiurl, function(data) {
        if(!data.result){
            setTimeout(Verification_apply(txid), 1000);
        }else{
            if(data.result.status == '0x1'){
                alert(script_Lan.approve_success[currentLan]);
            }else{
                alert(script_Lan.approve_fail[currentLan]);
            }
            $("#issue").html(script_Lan.issue_now[currentLan]);
            $("#redemption").html(script_Lan.redemption_now[currentLan]);
            $(".approve_commit").html('&nbsp');
        }
    });
}

//验证发行txid是否成功
function Verification_issue(txid){
    var apiurl = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash="+txid+"&apikey=EE6CHPQTD4GXBQPYKBS4IHHCAG6PM93W2B";
    $.get(apiurl, function(data) {
        if(!data.result){
            setTimeout(Verification_issue(txid), 1000);
        }else{
            if(data.result.status == '0x1'){
                alert(script_Lan.issue_success[currentLan]);
            }else{
                alert(script_Lan.issue_fail[currentLan]);
            }
            $("#issue").html(script_Lan.issue_now[currentLan]);
            $(".approve_commit").html('&nbsp');
        }
    });
}

//验证赎回txid是否成功
function Verification_redemption(txid){
    var apiurl = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash="+txid+"&apikey=EE6CHPQTD4GXBQPYKBS4IHHCAG6PM93W2B";
    $.get(apiurl, function(data) {
        console.log(data);
        if(!data.result){
            setTimeout(Verification_redemption(txid), 1000);
        }else{
            if(data.result.status == '0x1'){
                alert(script_Lan.redeem_success[currentLan]);
            }else{
                alert(script_Lan.redeem_fail[currentLan]);
            }
            $("#redemption").html(script_Lan.redemption_now[currentLan]);
            $(".approve_commit").html('&nbsp');
        }
    });
}

//验证绑定推荐txid是否成功
function Verification_bind(txid){
    var apiurl = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash="+txid+"&apikey=EE6CHPQTD4GXBQPYKBS4IHHCAG6PM93W2B";
    $.get(apiurl, function(data) {
        if(!data.result){
            setTimeout(Verification_bind(txid), 1000);
        }else{
            if(data.result.status == '0x1'){
                alert(script_Lan.bind_success[currentLan]);
            }else{
                alert(script_Lan.bind_fail[currentLan]);
            }
            $(".candy-cont-btn").html(script_Lan.determine_binding[currentLan]);
        }
    });
}

//验证领取奖励txid是否成功
function Verification_airdrop(txid){
    var apiurl = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash="+txid+"&apikey=EE6CHPQTD4GXBQPYKBS4IHHCAG6PM93W2B";
    $.get(apiurl, function(data) {
        if(!data.result){
            setTimeout(Verification_airdrop(txid), 1000);
        }else{
            if(data.result.status == '0x1'){
                alert(script_Lan.aipdrop_success[currentLan]);
            }else{
                alert(script_Lan.aipdrop_fail[currentLan]);
            }
            $(".candy-receive-btn").html(script_Lan.free_receive[currentLan]);
        }
    });
}

function Verification2(txid,type){
    var apiurl = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash="+txid+"&apikey=EE6CHPQTD4GXBQPYKBS4IHHCAG6PM93W2B";
    $.get(apiurl, function(data) {
        if(!data.result){
            setTimeout(Verification2(txid,type), 1000);
        }else{
            if(type == 1){
                if(data.result.status == '0x1'){
                    //授权
                    hidePwait();
                    hideNeedAuth()
                    initState();
                }else{
                    hidePwait();
                    initState();
                    updateState(script_Lan.locked[currentLan]);
                    buttonState.forbid = 0;
                    console.log(buttonState);
                    alert(buttonState.msg);
                }
            }else {
                if(data.result.status == '0x1'){
                    //转换
                    alert(script_Lan.swap_success[currentLan]);
                    location.reload();
                }else{
                    hidePwait();
                    initState();
                    console.log(buttonState);
                    alert(script_Lan.swap_err[currentLan]);
                }
            }
        }
    });
}