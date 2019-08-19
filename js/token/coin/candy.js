//充值
function recharge(num) {
    Contract_candy.methods.depositToken(CONFIG.und_addr, num).send({ from: SELF_ADDR })
        .on("receipt", function(data) {

        })
        .on("error", function(error) {

        });
}
//提现
function withdraw(num) {
    Contract_candy.methods.withdrawToken(CONFIG.und_addr, num).send({ from: SELF_ADDR })
        .on("receipt", function(data) {

        })
        .on("error", function(error) {

        });
}
//领取
function getcandy(userAddr) {
    Contract_candy.methods.getCandy(CONFIG.und_addr, userAddr).send({ from: SELF_ADDR })
        .on("receipt", function(data) {

        })
        .on("error", function(error) {

        });
}
//发送
function sendcandy(userAddr, index, rate, amount, balance) {
    Contract_candy.methods.SendCandy(CONFIG.und_addr, userAddr, index, rate, amount, balance).send({ from: SELF_ADDR })
        .on("receipt", function(data) {

        })
        .on("error", function(error) {

        });
}

//我参投总数
//可提现糖果
function balance() {
    var SELF_ADDR = $("#address").val();
    Contract_candy.methods.balanceOf(CONFIG.candy_addr, SELF_ADDR).call()
        .then(function(data) {
            $("#cantou").html(data);
            $("#ketixian").html(data);
        })
}

//待领取糖果
//糖果余额
function balance_Token() {
    //SELF_ADDR，将会修改成特定地址
    var SELF_ADDR = $("#address").val();
    Contract_candy.methods.balanceOf(CONFIG.candy_addr, SELF_ADDR).call()
        .then(function(data) {
            $("#dailingqu").html(data);
        })
}


//当前共有
function current_num() {
    Contract_candy.methods.balanceOfToken(CONFIG.candy_addr).call()
        .then(function(data) {
            $("#current_num").html(data);
        })
}

//预计可领糖果
function expected() {
    var dailingqu_num = $("#dailingqu").html();
    var current_num = $("#current_num").html();
    var cantou = $("#cantou").html();
    if (dailingqu_num == '' || dailingqu_num == null) {
        dailingqu_num = 0;
    }

    if (current_num == '' || current_num == null) {
        current_num = 0;
    }

    if (cantou == '' || cantou == null) {
        cantou = 0;
    }

    if (current_num == 0) {
        res = 0;
    } else {
        res = dailingqu_num / current_num * cantou;
    }
    $("#expected").html(res);
}
//区块高度