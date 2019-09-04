//获取活期利率
function getExchangeRateCurrent(){

    Contract_investment.methods.getSupplyRatePerBlock('0xF5DCe57282A584D2746FaF1593d3121Fcac444dC').call()
        .then(function(data) {

            if (isNaN(data)) {
                getExchangeRateCurrent();
                return null;
            }

            var balance_num = web3.utils.fromWei(data, CONFIG.und_wei);
            balance_num = parseFloat(balance_num*100*6000*365);
            $(".getExchangeRateCurrent").text(Number(balance_num).toFixed(4)+"%");

        })
}

//获取活期利率
function getExchangeRateCurrent_day(){

    Contract_investment.methods.getSupplyRatePerBlock('0xF5DCe57282A584D2746FaF1593d3121Fcac444dC').call()
        .then(function(data) {

            if (isNaN(data)) {
                getExchangeRateCurrent_day();
                return null;
            }

            var balance_num = web3.utils.fromWei(data, CONFIG.und_wei);
            balance_num = parseFloat(balance_num*100*6000);
            $(".getExchangeRateCurrent_day").text(Number(balance_num).toFixed(4)+"%");

        })
}



//获取理财账户余额收益
function userCash(){
    var SELF_ADDR = $("#address").val();
    Contract_investment.methods.userCash(SELF_ADDR).call()
        .then(function(data) {
            if (isNaN(data)) {
                userCash();
                return null;
            }
            $("#userCash").val(data);
            var balance_num = data*Math.pow(10,10);
            balance_num = web3.utils.fromWei(balance_num, CONFIG.und_wei);
            balance_num = parseFloat(balance_num);
            Contract_investment.methods.getExchangeRateCurrent('0xF5DCe57282A584D2746FaF1593d3121Fcac444dC').call()
                .then(function(data2) {
                    if (isNaN(data2)) {
                        userCash();
                        return null;
                    }
                    $("#getExchangeRateCurrent").val(data2);
                    var userCash_num = balance_num*data2/Math.pow(10,28);
                    // $(".accumulated_income").text(Number(balance_num).toFixed(4));
                    $(".investment_balance").text(Number(userCash_num).toFixed(8));
                })
        })
}

//获取赎回手续费
function redeemFee() {
    Contract_investment.methods.redeemFee().call()
        .then(function(data) {
            if (isNaN(data)) {
                redeemFee();
                return null;
            }
            var fee = data/10000;
            $("#fee").val(fee);
        });
}

//获取und授权数量
function allowance_und_investment() {
    var SELF_ADDR = $("#address").val();
    Contract_und.methods.allowance(SELF_ADDR, CONFIG.investment_addr).call()
        .then(function(data) {
            if (data > 0) {
                var num = web3.utils.fromWei(data, CONFIG.und_wei);
                $(".investment_unlock").css('display','none');
            } else {
                var num = 0;
            }
            return true;
        });
}

//授权
function investment_unlock() {
    var SELF_ADDR = $("#address").val();
    if (!SELF_ADDR) {
        layer.msg(script_Lan.sign_login[currentLan]);
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
    $(".deposit_submit").html(script_Lan.waitlock[currentLan]+"<dot>···</dot>");
    Contract_und.methods.approve(CONFIG.investment_addr, num).send({ from: SELF_ADDR , gasPrice: gas,gas:70000}, function(error, transactionHash){
        if(error){
            layer.msg(script_Lan.operate_err[currentLan]);
            $(".deposit_submit").html(script_Lan.deposit_submit[currentLan]);
        }else{
            Verification_apply(transactionHash);
        }

    });
}

//获取理财账户余额
function investment_balance(){
    var SELF_ADDR = $("#address").val();
    Contract_investment.methods.userInvestOut(SELF_ADDR).call()
        .then(function(data) {
            if (isNaN(data)) {
                investment_balance();
                return null;
            }
            var balance_num_out = web3.utils.fromWei(data, CONFIG.und_wei);
            balance_num_out = parseFloat(balance_num_out);
            Contract_investment.methods.userCash(SELF_ADDR).call()
                .then(function(data2) {
                    if (isNaN(data2)) {
                        investment_balance();
                        return null;
                    }

                    var balance_num_cash = data2*Math.pow(10,10);
                    balance_num_cash = web3.utils.fromWei(balance_num_cash, CONFIG.und_wei);
                    balance_num_cash_rate = parseFloat(balance_num_cash);
                    Contract_investment.methods.getExchangeRateCurrent('0xF5DCe57282A584D2746FaF1593d3121Fcac444dC').call()
                        .then(function(datarate) {
                            if (isNaN(datarate)) {
                                investment_balance();
                                return null;
                            }
                            var balance_num_cash = balance_num_cash_rate*datarate/Math.pow(10,28);
                            Contract_investment.methods.userInvestIn(SELF_ADDR).call()
                                .then(function(data3) {
                                    if (isNaN(data3)) {
                                        investment_balance();
                                        return null;
                                    }


                                    var balance_num_in = web3.utils.fromWei(data3, CONFIG.und_wei);
                                    balance_num_in = parseFloat(balance_num_in);


                                    var investment_balance = Number(balance_num_out)+Number(balance_num_cash)-Number(balance_num_in);
                                    if(Number(investment_balance) > 0){
                                        $(".accumulated_income").text(Number(investment_balance).toFixed(8));
                                    }

                                })
                        })

                })


        })
}

//投资
function deposit(){
    var SELF_ADDR = $("#address").val();
    var und_balance = $(".und_balance").html();
    var num = $("#deposit_num").val();

    if(!num){
        layer.msg(script_Lan.issue_num_min[currentLan]);
        return false;
    }
    if (Number(und_balance) <= 0 || Number(num) > Number(und_balance)) {
        layer.msg(script_Lan.und_no_enough[currentLan]);
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

    $(".deposit_submit").html(script_Lan.submitting[currentLan]+"<dot>···</dot>");
    Contract_investment.methods.deposit(num).send({ from: SELF_ADDR , gasPrice: gas,gas:400000}, function(error, transactionHash){
        if(error){
            layer.msg(script_Lan.operate_err[currentLan]);
            $(".deposit_submit").html(script_Lan.deposit_submit[currentLan]);
        }else{
            Verification_deposit(transactionHash);
        }

    });
}

//赎回
function redeem_investment(){
    var SELF_ADDR = $("#address").val();
    var investment_balance = $(".investment_balance").html();
    var userCash = $("#userCash").val();
    var getExchangeRateCurrent = $("#getExchangeRateCurrent").val();
    var num = $("#redeem_num").val();

    if(!num){
        layer.msg(script_Lan.issue_num_min[currentLan]);
        return false;
    }
    if (Number(investment_balance) <= 0  || userCash <= 0 || num <= 1) {
        layer.msg(script_Lan.und_no_enough[currentLan]);
        return false;
    }
    num_true =  (num*Math.pow(10,36)/getExchangeRateCurrent).toFixed(0);
    if(Number(num) > Number(investment_balance) || Number(num_true) > Number(userCash)){
        num_true = userCash;
    }

    console.log(num_true);
    num_true = web3.utils.toBN(num_true);


    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }

    $(".redeem_submit").html(script_Lan.submitting[currentLan]+"<dot>···</dot>");
    Contract_investment.methods.redeem(num_true).send({ from: SELF_ADDR , gasPrice: gas,gas:300000}, function(error, transactionHash){
        if(error){
            layer.msg(script_Lan.operate_err[currentLan]);
            $(".redeem_submit").html(script_Lan.redeem_submit[currentLan]);
        }else{
            Verification_redeem(transactionHash);
        }

    });
}

