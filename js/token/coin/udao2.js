/*稳定币合约*/

//授权
function shouquan_udao(udao_num, und_num,if_one=null,coin=null) {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        alert(script_Lan.sign_login[currentLan]);
        return false;
    }
    if (udao_num <= 0) {
        alert(script_Lan.approve_num_min[currentLan]);
        return false;
    }
    udao_num = Number(udao_num)+Number(100000000000000000000);  //+Number(10000)
    udao_num = web3.utils.toWei(udao_num, CONFIG.udao_wei);
    udao_num = web3.utils.toBN(udao_num);
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    Contract_udao.methods.approve(CONFIG.und_issue_addr, udao_num).send({ from: SELF_ADDR, gasPrice: gas })
        .on("receipt", function(data) {
            $("#redemption").html(script_Lan.redeem_wait[currentLan]+"<dot>···</dot>");

            if(if_one){
                withdraw_onecoin(temp_num,coin);
            }else{
                withdraw(und_num);
            }

            return true;
        })
        .on("error", function(error) {
            alert(script_Lan.approve_fail[currentLan]);
            location.reload();
        });
}

//获取UDAO代币数量
async function balance_udao(UserAddr) {
    return new Promise(function (resolve, reject) {
        Contract_udao.methods.balanceOf(UserAddr).call()
            .then(function(data) {
                if(data){
                    let balance_num = web3.utils.fromWei(data, CONFIG.udao_wei);
                    balance_num = Number(balance_num).toFixed(CONFIG.Fixed);
                    resolve(balance_num);
                }else{
                    reject(err);
                }
            })
    });
}

//获取UDAO授权数量
function allowance_udao() {
    var SELF_ADDR = $("#address").val();
    Contract_udao.methods.allowance(SELF_ADDR, CONFIG.und_issue_addr).call()
        .then(function(data) {

            if (data > 0) {
                var num = web3.utils.fromWei(data, CONFIG.udao_wei);
            } else {
                var num = 0;
            }
            $("#udao_allowance").val(num);
            return null;
        });
}

/*稳定币的发行合约*/

//获取最新价 (udao单价)
function getnewprice() {
    Contract_udao_issue.methods.newPrice(und_addr).call()
        .then(function(data) {
            var price = web3.utils.fromWei(data, CONFIG.udao_wei);
            $("#udaoPrice").val(price);
        })
}

//多少区块为一期
function how_manyperiod() {
    Contract_udao_issue.methods.blocksPeriod().call()
        .then(function(data) {
            $("#how_manyperiod").val(data);
        })
}

//获取本期预售数
function getSaleAmount() {
    Contract_udao_issue.methods.getThisTimesSaleAmount(CONFIG.und_addr).call()
        .then(function(data) {
            var num = parseInt(web3.utils.fromWei(data, CONFIG.und_wei));
            $("#yushou").html(num);
        })
}

//获取当前期数
function getPeriod() {
    var current_heigh = $(".current_heigh").html();
    Contract_udao_issue.methods.blocksPeriod().call()
        .then(function(data) {
            if (isNaN(data)) {
                getPeriod();
                return;
            }

            $("#perid_block").html(data);
            if (current_heigh && data) {
                current_heigh = Number(current_heigh);
                data = Number(data);
                var period = current_heigh / data;
                period = parseInt(period);
                $("#current_period").html(period);
                var shengyu = (period * data + data) - current_heigh;
                if (shengyu == 0) {
                    shengyu = data;
                }
                $("#residue_block").html(shengyu);
                //已过高度
                var has_block = parseInt(data - parseInt(shengyu));
                var prec = dNum(has_block,data);
                $('.progress-tip div').text(' CURRENT PROGRESS '+prec+"%")

                $(".progress-percent ").css('width',prec+"%");
                var W = $(".progress-percent").width();
                $(".progress-bar .progress-tip").css('left',W-100);

                // arr_map(period);
            }
        })
}

function getPeriod_async() {
    
}

//获取某期投资数量
function getAmount() {
    var period = $("#current_period").html();
    if (Number(period) <= 0) {
        return false;
    }
    Contract_udao_issue.methods.investTotalAmount(period, CONFIG.und_addr).call()
        .then(function(data) {
            var num = web3.utils.fromWei(data, CONFIG.und_wei);
            $("#hasInvest").html(num);
        })
}

//最高兑换比率
function getMaxRate(period) {
    Contract_udao_issue.methods.getGrowthRate(period).call()
        .then(function(data) {
            var num = web3.utils.fromWei(data, CONFIG.und_wei)
            if (num > 0) {
                num = 1 / num;
            } else {
                num = 0;
            }

            $("#maxrate").html(Number(num).toFixed(CONFIG.Fixed));
        })
}

//每一期实际应该出售的UDAO
async function saleTotal(period) {
    return new Promise(function (resolve, reject) {
        Contract_udao_issue.methods.SaleTotal(period,CONFIG.und_addr).call()
            .then(function(data) {
                console.log("第"+period+"期出售数量："+data)
                return resolve(data);
            })
    });
}

//每一期兑换比率
async function investRate(period) {
    return new Promise(function (resolve, reject) {
        Contract_udao_issue.methods.investRate(period,CONFIG.und_addr).call()
            .then(function(data) {
                console.log("第"+period+"期兑换比率："+data)
                return resolve(data);
            })
    });
}

//获取银行卡地址
function addressToAccounts(){
    var SELF_ADDR = $("#address").val();
    Contract_udao.methods.addressToAccounts(SELF_ADDR).call()
        .then(function(data) {
            if (isNaN(data)) {
                addressToAccounts();
                return null;
            }
            if(data == 0){
                $('#bank_card').html("0000000000000000000");
                $('.noaccounts').css("display","block");
            }else{
                $('#bank_card').html(data);
            }
        })
}
//创建地址
function createAccount(){
    var SELF_ADDR = $("#address").val();
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    $('#createAccount').html(script_Lan.create_wait[currentLan]+"<dot>···</dot>");
    Contract_udao.methods.createAccount(SELF_ADDR).send({ from: SELF_ADDR, gasPrice: gas })
        .then(function(data) {
            console.log(data);
            alert(script_Lan.create_acount[currentLan]);
            location.reload();
        })
}
//查看地址人数
function accountsNumber(){
    Contract_udao.methods.accountsNumber().call()
        .then(function(data) {
            if (isNaN(data)) {
                accountsNumber();
                return null;
            }
            $("#user_number").html(data);

        })
}

//转账
function udao_send(){
     var SELF_ADDR = $("#address").val();
     var gas = $("#getGasPrice").val();
    var account = $("#payee_udao").val();
    var num = $("#amount_udao").val();
    var remarks = $("#remarks_udao").val();
    var udao_banance = $('#udao_balance').html();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    if(Number(num)<0 || Number(num)>Number(udao_banance)){
        alert(script_Lan.issue_num_max[currentLan]);
        return false;
    }
    num = web3.utils.toWei(num, CONFIG.udao_wei);
    num = web3.utils.toBN(num);
    $('#udao_send').html(script_Lan.submitting[currentLan]+"<dot>···</dot>");
    if(account.slice(0,2) == '0x'){
        Contract_udao.methods.transferAndSendMsg(account,num,remarks).send({ from: SELF_ADDR, gasPrice: gas })
            .then(function(data) {
                console.log(data);
                alert(script_Lan.submitSuccess[currentLan]);
                location.reload();
            })
    }else{
        Contract_udao.methods.transferAndSendMsgByAccount(account,num,remarks).send({ from: SELF_ADDR, gasPrice: gas })
            .then(function(data) {
                console.log(data);
                alert(script_Lan.submitSuccess[currentLan]);
                location.reload();
            })
    }

}