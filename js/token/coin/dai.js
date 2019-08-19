//获取DAI代币数量
function balance_dai() {
    var SELF_ADDR = $("#address").val();
    Contract_dai.methods.balanceOf(SELF_ADDR).call()
        .then(function(data) {
            if (isNaN(data)) {
                balance_dai();
                return null;
            }
            var balance_num = web3.utils.fromWei(data, CONFIG.dai_wei);
            balance_num = parseFloat(balance_num);
            $("#dai_balance").val(Number(balance_num).toFixed(4));
        })
}

//获取DAI授权数量
function allowance_dai() {
    var SELF_ADDR = $("#address").val();
    Contract_dai.methods.allowance(SELF_ADDR, CONFIG.und_issue_addr).call()
        .then(function(data) {
            if (data > 0) {
                var num = web3.utils.fromWei(data, CONFIG.dai_wei);
            } else {
                var num = 0;
            }
            $("#dai_allowance").val(num);
            return null;
        });
}

//授权
function shouquan_dai(num) {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        alert(script_Lan.sign_login[currentLan]);
        location.reload();
    }
    temp_num = num;
    num = Number(num)+Number(100000000000000000000);  //+Number(10000)
    num = web3.utils.toWei(num, CONFIG.dai_wei);
    num = web3.utils.toBN(num);
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    $("#approve_commit").html(script_Lan.issue_remarks[currentLan]);
    Contract_dai.methods.approve(CONFIG.und_issue_addr, num).send({ from: SELF_ADDR , gasPrice: gas})
        .on("receipt", function(data) {
            $("#issue").html(script_Lan.issue_wait[currentLan]+"<dot>···</dot>");
            // alert(script_Lan.approve_success[currentLan]);
            mortgage_dai(temp_num);
            return true;
        })
        .on("error", function(error) {
            alert(script_Lan.approve_fail[currentLan]);
            location.reload();
        });

}

//抵押代币
function mortgage_dai(num) {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        alert(script_Lan.sign_login[currentLan]);
        return false;
        location.reload();
    }
    var dai_balance = $("#dai_balance").val();
    if (Number(num) > Number(dai_balance)) {
        alert(script_Lan.dai_num_min[currentLan]);
        return false;
        location.reload();
    }
    other2und(num, CONFIG.dai_addr, SELF_ADDR, CONFIG.dai_wei);
}