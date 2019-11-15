//授权
function shouquan_usdt() {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        layer.msg(script_Lan.sign_login[currentLan]);
        location.reload();
    }
    num = Math.pow(10,16);  //+Number(10000)

    num = num.toString();
    num = web3.utils.toWei(num, CONFIG.usdt_wei);

    num = web3.utils.toBN(num);
    num = num.toString();
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }

    $(".approve_commit").html(script_Lan.issue_remarks[currentLan]);
    Contract_usdt.methods.approve(CONFIG.und_issue_addr, num).send({ from: SELF_ADDR , gasPrice: gas,gas:70000 }, function(error, transactionHash){
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
function balance_usdt() {
    var SELF_ADDR = $("#address").val();
    Contract_usdt.methods.balanceOf(SELF_ADDR).call()
        .then(function(data) {
            if (isNaN(data)) {
                balance_usdt();
                return null;
            }

            var balance_num = web3.utils.fromWei(data, CONFIG.usdt_wei);
            balance_num = parseFloat(balance_num);
            $("#usdt_balance").val(Number(balance_num).toFixed(CONFIG.Fixed));
        })
}

//获取USDT授权数量
function allowance_usdt() {
    var SELF_ADDR = $("#address").val();
    Contract_usdt.methods.allowance(SELF_ADDR, CONFIG.und_issue_addr).call()
        .then(function(data) {
            if (data > 0) {
                var num = web3.utils.fromWei(data, CONFIG.usdt_wei);
            } else {
                var num = 0;
            }
            $("#usdt_allowance").val(num);
            return true;
        });
}

//抵押代币
function mortgage_usdt(num) {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        layer.msg(script_Lan.sign_login[currentLan]);
        location.reload();
        return false;
    }
    var usdt_balance = $("#usdt_balance").val();
    if (Number(num) > Number(usdt_balance)) {
        layer.msg(script_Lan.usdt_num_min[currentLan]);
        location.reload();
        return false;
    }

    other2und(num, CONFIG.usdt_addr, SELF_ADDR, CONFIG.usdt_wei);
}

//获取USDT资金池
function tokenSupply_usdt(){

    Contract_und_issue.methods.tokenSupply(usdt_addr).call()
        .then(function(data) {
            if (isNaN(data)) {
                tokenSupply_usdt();
                return null;
            }
            var balance_num = web3.utils.fromWei(data, CONFIG.und_wei);
            balance_num = parseFloat(balance_num);
            $(".tokenSupply_usdt").text(Number(balance_num).toFixed(4));
        })
}