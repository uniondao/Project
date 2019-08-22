/*稳定币合约*/

//授权
function shouquan_und() {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        alert(script_Lan.sign_login[currentLan]);
        return false;
    }
    num = Math.pow(10,16);  //+Number(10000)
    num = web3.utils.toWei(num, CONFIG.und_wei);
    num = web3.utils.toBN(num);
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    Contract_und.methods.approve(CONFIG.und_issue_addr, num).send({ from: SELF_ADDR , gasPrice: gas}, function(error, transactionHash){
        if(error){
            alert(script_Lan.operate_err[currentLan]);
            $("#redemption").html(script_Lan.redemption_now[currentLan]);
            $(".approve_commit").html('&nbsp');
        }else{
            Verification_apply(transactionHash);
        }

    });
}

//获取und授权数量
function allowance_und() {
    var SELF_ADDR = $("#address").val();
    Contract_und.methods.allowance(SELF_ADDR, CONFIG.und_issue_addr).call()
        .then(function(data) {
            if (data > 0) {
                var num = web3.utils.fromWei(data, CONFIG.und_wei);
            } else {
                var num = 0;
            }
            $("#und_allowance").val(num);
            return true;
        });
}

//获取und数量
function balance_und() {
    console.log(123);
    var SELF_ADDR = $("#address").val();
    Contract_und.methods.balanceOf(SELF_ADDR).call()
        .then(function(data) {
            if (isNaN(data)) {
                get_balance();
                return null;
            }
            var balance_num = web3.utils.fromWei(data, CONFIG.und_wei);
            balance_num = Number(balance_num).toFixed(CONFIG.Fixed);

            $(".und_balance").text(balance_num);
            $(".payCurrentBalance").html(balance_num);
            $("#und_balance").val(balance_num);
            $("#undt_balance").text(balance_num);
            $('#mybalance_und').text(balance_num+' UNDT');
        })
}

//获取und总供应量
function supply() {
    Contract_und.methods.totalSupply().call()
        .then(function(data) {
            if (isNaN(data)) {
                supply();
                return null;
            }
            var balance_num = web3.utils.fromWei(data, CONFIG.und_wei);
            balance_num = parseFloat(balance_num);
            $(".supply_und").html(Number(balance_num).toFixed(CONFIG.Fixed));
        })
}

//投资und到udao
function invest_und2udao(num) {
    var SELF_ADDR = $("#address").val();
    var und_balance = $(".und_balance").html();
    if (num < 10) {
        alert(script_Lan.invite_num_min[currentLan]);
        return 1;
    }
    if (Number(und_balance) <= 0 || Number(num) > Number(und_balance)) {
        alert(script_Lan.und_no_enough[currentLan]);
        return 1;
    }

    num = web3.utils.toWei(num, CONFIG.udao_wei);
    num = web3.utils.toBN(num);

    $("#und2udao").html(script_Lan.submitting[currentLan]+"<dot>···</dot>");
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    click_und2udao = 1;
    Contract_und.methods.approveAndCall(CONFIG.udao_issue_addr, num, "0x31").send({ from: SELF_ADDR , gasPrice: gas}, function(error, transactionHash){
        if(error){
            alert(script_Lan.operate_err[currentLan]);
            $("#und2udao").html(script_Lan.participate_now[currentLan]);
        }else{
            Verification_presale(transactionHash);
        }

    });
}

/*稳定币的发行合约*/

//获取兑换一个und花费多少udao作手续费
function getFeeCosUDAO() {
    console.log('123');
    Contract_und_issue.methods.fee().call()
        .then(function(data) {
            console.log('getFeeCosUDAO'+data);
            if (isNaN(data)) {
                getFeeCosUDAO();
                return null;
            }
            $("#undFeeUdao").val(web3.utils.fromWei(data, CONFIG.und_wei));
        })
}

//赎回
function withdraw(num) {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        alert(script_Lan.sign_login[currentLan]);
        location.reload();
        return false;
    }
    if (num == null || num <= 0) {
        alert(script_Lan.redeem_num[currentLan]);
        location.reload();
        return false;
    }
    var undSum = $(".und_balance").html();
    if (Number(num) > Number(undSum)) {
        alert(script_Lan.redeem_num_max[currentLan]);
        location.reload();
        return false;
    }
    num = web3.utils.toWei(num, 'ether');
    num = web3.utils.toBN(num);
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    Contract_und_issue.methods.redeem(num).send({ from: SELF_ADDR  , gasPrice: gas ,gas:400000}, function(error, transactionHash){
        if(error){
            alert(script_Lan.operate_err[currentLan]);
            $("#redemption").html(script_Lan.redemption_now[currentLan]);
            $(".approve_commit").html('&nbsp');
        }else{
            Verification_redemption(transactionHash);
        }

    });

}

//赎回单个币种
function withdraw_onecoin(num,coin) {
    var SELF_ADDR = $("#address").val();
    switch(coin)
    {
        case 'usdt':
            var token = CONFIG.usdt_addr;
            break;
        case 'dai':
            var token = CONFIG.dai_addr;
            break;
        case 'usdc':
            var token = CONFIG.usdc_addr;
            break;
        case 'tusd':
            var token = CONFIG.tusd_addr;
            break;
        case 'pax':
            var token = CONFIG.pax_addr;
            break;
    }
    if(token == '' || token == null){
        alert(script_Lan.nocoin[currentLan]);
        return false;
    }
    if (!SELF_ADDR) {
        alert(script_Lan.sign_login[currentLan]);
        location.reload();
        return false;
    }
    if (num == null || num <= 0) {
        alert(script_Lan.redeem_num[currentLan]);
        location.reload();
        return false;
    }
    var undSum = $("#und_balance").val();

    if (Number(num) > Number(undSum)) {
        alert(script_Lan.redeem_num_max[currentLan]);
        location.reload();
        return false;
    }

    num = web3.utils.toWei(num, 'ether');
    num = web3.utils.toBN(num);
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    Contract_und_issue.methods.redeemOne(num,token).send({ from: SELF_ADDR , gasPrice: gas,gas:300000 }, function(error, transactionHash){
        if(error){
            alert(script_Lan.operate_err[currentLan]);
            $("#redemption").html(script_Lan.redemption_now[currentLan]);
            $(".approve_commit").html('&nbsp');
        }else{
            Verification_redemption(transactionHash);
        }

    });

}

//其他币兑换成und
function other2und(num, coin_addr, self_addr, wei = CONFIG.usdt_wei) {
    num = Number(num);

    num = web3.utils.toWei(num, wei);
    num = web3.utils.toBN(num);
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    $(".approve_commit").html(script_Lan.issue_remarks[currentLan]);

    Contract_und_issue.methods.issue(coin_addr, num).send({ from: self_addr , gasPrice: gas}, function(error, transactionHash){
        if(error){
            alert(script_Lan.operate_err[currentLan]);
            $("#issue").html(script_Lan.issue_now[currentLan]);
            $(".approve_commit").html('&nbsp');
        }else{
            Verification_issue(transactionHash);
        }

    });
}

//获取代币数量
function getTokenNum() {
    Contract_und_issue.methods.getTokenIssueAmount().call()
        .then(function(data) {
            console.log(data);
        })
}

//获取上限
function getUpAmount() {
    Contract_und_issue.methods.getTokenUpAmount().call()
        .then(function(data) {
            console.log(data);
        })
}

//获取返回币种比例
function getPercent() {
    Contract_und_issue.methods.getTokenPoolAddress().call()
        .then(function(data) {
            if (data != 0) {
                Contract_und_issue.methods.getTokenIssueAmount().call()
                    .then(function(data2) {
                        var sum = 0;
                        var len = 0;
                        var str1 = "";
                        var str2 = "1 UND = ";
                        var str3 = "(";
                        var str4 = "";
                        data.forEach(function(item, index) {
                            if (item != "0x0000000000000000000000000000000000000000" || item != 0) {
                                var Num = web3.utils.fromWei(data2[index], CONFIG[CONFIG[item.toLowerCase()]]);
                                sum += Number(Num);
                                len++;
                            }
                        });

                        data.forEach(function(item, index) {
                            if (item != "0x0000000000000000000000000000000000000000" || item != 0) {
                                if (sum == 0) {
                                    str1 += "" + parseInt(100 / len) + "%" + CONFIG[item] + "、";
                                    str2 += parseInt(100 / len) / 100 +" "+ CONFIG[item] + " + ";
                                    str3 += parseInt(100 / len) + "%" + CONFIG[item] + " + ";
                                    str4 += "<span class='num_per'>" + parseInt(100 / len) + "%" + CONFIG[item] + "、</span>";
                                } else {
                                    var Num2 = web3.utils.fromWei(data2[index], CONFIG[CONFIG[item]]);
                                    var val2 = (Num2 / sum) * 100;
                                    val2 = val2.toFixed(CONFIG.Fixed2);
                                    str1 += "" + val2 + "%" + CONFIG[item] + "、";
                                    str4 += "<span class='num_per'>" + val2 + "%" + CONFIG[item] + "、</span>";
                                    var val3 = val2 / 100;
                                    val3 = val3.toFixed(CONFIG.Fixed2);
                                    str2 += val3 +" "+ CONFIG[item] + " + ";

                                    str3 += val2 + "%" + CONFIG[item] + " + ";
                                }
                            }
                        });
                        str1 = str1.substr(0, str1.length - 1);
                        str2 = str2.substr(0, str2.length - 2);
                        str3 += ")";
                        str3 = str3.substr(0, str3.length - 1);
                        $str = str2;
                        $("#bili_redeem").html($str);
                        $("#undopther_txt").attr("placeholder", str1);
                        $("#undopther_txt_cop").val(str1);
                        $(".txt1").html(str4);
                    });
            }
        })
}

//转账
function undt_send(){
    var SELF_ADDR = $("#address").val();
    var gas = $("#getGasPrice").val();
    var account = $("#payee_undt").val();
    var num = $("#amount_undt").val();
    var remarks = $("#remarks_undt").val();
    var und_banance = $('#und_balance').val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    if(Number(num)<0 || Number(num)>Number(und_banance)){
        alert(script_Lan.issue_num_max[currentLan]);
        return false;
    }
    num = web3.utils.toWei(num, CONFIG.udao_wei);
    num = web3.utils.toBN(num);
    $('#undt_send').html(script_Lan.submitting[currentLan]+"<dot>···</dot>");
    if(account.slice(0,2) == '0x'){
        Contract_und.methods.transferAndSendMsg(account,num,remarks).send({ from: SELF_ADDR, gasPrice: gas }, function(error, transactionHash){
            if(error){
                alert(script_Lan.operate_err[currentLan]);
                $('#undt_send').html(script_Lan.next[currentLan]);
            }else{
                Verification_send(transactionHash);
            }

        });
    }else{
        Contract_und.methods.transferAndSendMsgByAccount(account,num,remarks).send({ from: SELF_ADDR, gasPrice: gas }, function(error, transactionHash){
            if(error){
                alert(script_Lan.operate_err[currentLan]);
                $('#undt_send').html(script_Lan.next[currentLan]);
            }else{
                Verification_send(transactionHash);
            }

        });
    }

}