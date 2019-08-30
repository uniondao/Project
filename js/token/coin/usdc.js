//授权
function shouquan_usdc() {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        alert(script_Lan.sign_login[currentLan]);
        location.reload();
    }
    num = Math.pow(10,16);  //+Number(10000)
    num = web3.utils.toWei(num, CONFIG.usdc_wei);
    num = web3.utils.toBN(num);
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    $(".approve_commit").html(script_Lan.issue_remarks[currentLan]);
    Contract_usdc.methods.approve(CONFIG.und_issue_addr, num).send({ from: SELF_ADDR , gasPrice: gas,gas:70000 }, function(error, transactionHash){
        if(error){
            alert(script_Lan.operate_err[currentLan]);
            $("#issue").html(script_Lan.issue_now[currentLan]);
            $(".approve_commit").html('&nbsp');
        }else{
            Verification_apply(transactionHash);
        }
    });

}

//获取USDT代币数量
function balance_usdc() {
    var SELF_ADDR = $("#address").val();
    Contract_usdc.methods.balanceOf(SELF_ADDR).call()
        .then(function(data) {
            if (isNaN(data)) {
                balance_usdc();
                return null;
            }

            var balance_num = web3.utils.fromWei(data, CONFIG.usdc_wei);
            balance_num = parseFloat(balance_num);
            $("#usdc_balance").val(Number(balance_num).toFixed(CONFIG.Fixed));
        })
}

//获取USDT授权数量
function allowance_usdc() {
    var SELF_ADDR = $("#address").val();
    Contract_usdc.methods.allowance(SELF_ADDR, CONFIG.und_issue_addr).call()
        .then(function(data) {
            if (data > 0) {
                var num = web3.utils.fromWei(data, CONFIG.usdc_wei);
            } else {
                var num = 0;
            }
            $("#usdc_allowance").val(num);
            return true;
        });
}

//抵押代币
function mortgage_usdc(num) {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        alert(script_Lan.sign_login[currentLan]);
        location.reload();
        return false;
    }
    var usdc_balance = $("#usdc_balance").val();
    if (Number(num) > Number(usdc_balance)) {
        alert(script_Lan.dusc_num_min[currentLan]);
        location.reload();
        return false;
    }

    other2und(num, CONFIG.usdc_addr, SELF_ADDR, CONFIG.usdc_wei);
}
//获取USDC资金池
function tokenSupply_usdc(){

    Contract_und_issue.methods.tokenSupply(usdc_addr).call()
        .then(function(data) {
            if (isNaN(data)) {
                tokenSupply_usdc();
                return null;
            }
            var balance_num = web3.utils.fromWei(data, CONFIG.und_wei);
            balance_num = parseFloat(balance_num);
            $(".tokenSupply_usdc").text(Number(balance_num).toFixed(4));
        })
}