//获取TUST代币数量
function balance_tusd() {
    var SELF_ADDR = $("#address").val();
    Contract_tusd.methods.balanceOf(SELF_ADDR).call()
        .then(function(data) {
            if (isNaN(data)) {
                balance_tusd();
                return null;
            }

            var balance_num = web3.utils.fromWei(data, CONFIG.tusd_wei);
            balance_num = parseFloat(balance_num);
            $("#tusd_balance").val(Number(balance_num).toFixed(CONFIG.Fixed));
        })
}


//获取TUSD授权数量
function allowance_tusd() {
    var SELF_ADDR = $("#address").val();
    Contract_tusd.methods.allowance(SELF_ADDR, CONFIG.und_issue_addr).call()
        .then(function(data) {
            if (data > 0) {
                var num = web3.utils.fromWei(data, CONFIG.tusd_wei);
            } else {
                var num = 0;
            }
            $("#tusd_allowance").val(num);
            return null;
        });
}


//授权
function shouquan_tusd() {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        layer.msg(script_Lan.sign_login[currentLan]);
        location.reload();
    }

    num = Math.pow(10,16);  //+Number(10000)
    num = web3.utils.toWei(num, CONFIG.tusd_wei);
    num = web3.utils.toBN(num);
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    $(".approve_commit").html(script_Lan.issue_remarks[currentLan]);
    Contract_tusd.methods.approve(CONFIG.und_issue_addr, num).send({ from: SELF_ADDR, gasPrice: gas,gas:70000 }, function(error, transactionHash){
        if(error){
            layer.msg(script_Lan.operate_err[currentLan]);
            $("#issue").html(script_Lan.issue_now[currentLan]);
            $(".approve_commit").html('&nbsp');
        }else{
            Verification_apply(transactionHash);
        }

    });

}


//抵押代币
function mortgage_tusd(num) {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        layer.msg(script_Lan.sign_login[currentLan]);
        location.reload();
        return false;
    }
    var tusd_balance = $("#tusd_balance").val();
    if (Number(num) > Number(tusd_balance)) {
        layer.msg(script_Lan.tusd_num_min[currentLan]);
        location.reload();
        return false;
    }
    other2und(num, CONFIG.tusd_addr, SELF_ADDR, CONFIG.tusd_wei);
}

//获取TUSD资金池
function tokenSupply_tusd(){

    Contract_und_issue.methods.tokenSupply(tusd_addr).call()
        .then(function(data) {
            if (isNaN(data)) {
                tokenSupply_tusd();
                return null;
            }
            var balance_num = web3.utils.fromWei(data, CONFIG.und_wei);
            balance_num = parseFloat(balance_num);
            $(".tokenSupply_tusd").text(Number(balance_num).toFixed(4));
        })
}