//授权
function shouquan_usdc(num) {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        alert(script_Lan.sign_login[currentLan]);
        location.reload();
    }
    temp_num = num;
    num = Number(num)+Number(100000000000000000000);  //+Number(10000)
    num = web3.utils.toWei(num, CONFIG.usdc_wei);
    num = web3.utils.toBN(num);
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    $("#approve_commit").html(script_Lan.issue_remarks[currentLan]);
    Contract_usdc.methods.approve(CONFIG.und_issue_addr, num).send({ from: SELF_ADDR , gasPrice: gas})
        .on("receipt", function(data) {
            $("#issue").html(script_Lan.issue_wait[currentLan]+"<dot>···</dot>");
            mortgage_usdc(temp_num)
            return true;
        })
        .on("error", function(error) {
            alert(script_Lan.approve_fail[currentLan]);
            location.reload();
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
        return false;
        location.reload();
    }
    var usdc_balance = $("#usdc_balance").val();
    if (Number(num) > Number(usdc_balance)) {
        alert(script_Lan.dusc_num_min[currentLan]);
        return false;
        location.reload();
    }

    other2und(num, CONFIG.usdc_addr, SELF_ADDR, CONFIG.usdc_wei);
}