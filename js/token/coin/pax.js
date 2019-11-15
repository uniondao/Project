//授权
function shouquan_pax() {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        layer.msg(script_Lan.sign_login[currentLan]);
        location.reload();
    }

    num = Math.pow(10,16);  //+Number(10000)
    num = num.toString();
    num = web3.utils.toWei(num, CONFIG.pax_wei);
    num = web3.utils.toBN(num);
    num = num.toString();
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    $(".approve_commit").html(script_Lan.issue_remarks[currentLan]);
    Contract_pax.methods.approve(CONFIG.und_issue_addr, num).send({ from: SELF_ADDR , gasPrice: gas,gas:70000 }, function(error, transactionHash){
        if(error){
            layer.msg(script_Lan.operate_err[currentLan]);
            $("#issue").html(script_Lan.issue_now[currentLan]);
            $(".approve_commit").html('&nbsp');
        }else{
            Verification_apply(transactionHash);
        }
    });
}

//获取USDT代币数量
function balance_pax() {
    var SELF_ADDR = $("#address").val();
    Contract_pax.methods.balanceOf(SELF_ADDR).call()
        .then(function(data) {
            if (isNaN(data)) {
                balance_pax();
                return null;
            }

            var balance_num = web3.utils.fromWei(data, CONFIG.pax_wei);
            balance_num = parseFloat(balance_num);
            $("#pax_balance").val(Number(balance_num).toFixed(CONFIG.Fixed));
        })
}

//获取USDT授权数量
function allowance_pax() {
    var SELF_ADDR = $("#address").val();
    Contract_pax.methods.allowance(SELF_ADDR, CONFIG.und_issue_addr).call()
        .then(function(data) {
            if (data > 0) {
                var num = web3.utils.fromWei(data, CONFIG.pax_wei);
            } else {
                var num = 0;
            }
            $("#pax_allowance").val(num);
            return true;
        });
}

//抵押代币
function mortgage_pax(num) {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        layer.msg(script_Lan.sign_login[currentLan]);
        location.reload();
        return false;
    }
    var pax_balance = $("#pax_balance").val();
    if (Number(num) > Number(pax_balance)) {
        layer.msg(script_Lan.pax_num_min[currentLan]);
        location.reload();
        return false;
    }

    other2und(num, CONFIG.pax_addr, SELF_ADDR, CONFIG.pax_wei);
}

//获取PAX资金池
function tokenSupply_pax(){

    Contract_und_issue.methods.tokenSupply(pax_addr).call()
        .then(function(data) {
            if (isNaN(data)) {
                tokenSupply_pax();
                return null;
            }
            var balance_num = web3.utils.fromWei(data, CONFIG.und_wei);
            balance_num = parseFloat(balance_num);
            $(".tokenSupply_pax").text(Number(balance_num).toFixed(4));
        })
}