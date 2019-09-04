//etn换undt
function eth2undt() {
    var SELF_ADDR = $("#address").val();
    var time = (new Date()).valueOf()/1000 + 900;
    var num = $("#paywithNum").val();
    var min_num = '';
    Contract_exchange.methods.ethToTokenSwapInput(min_num,time).send({ from: SELF_ADDR , value: web3.utils.toWei(num,'ether')})
        .on("receipt", function(data) {
            layer.msg("兑换成功");
            location.reload();
        })
        .on("error", function(error) {
            layer.msg("兑换失败");
            location.reload();
        });
}

//undt换eth
function undt2eth() {
    var SELF_ADDR = $("#address").val();
    var time = (new Date()).valueOf()/1000 + 900;
    var num = $("#paywithNum").val();
    var min_num = '';
    Contract_exchange.methods.tokenToEthSwapInput(min_num,time).send({ from: SELF_ADDR , value: web3.utils.toWei(num,'ether')})
        .on("receipt", function(data) {
            layer.msg("兑换成功");
            location.reload();
        })
        .on("error", function(error) {
            layer.msg("兑换失败");
            location.reload();
        });
}

//其他币换undt
function other2undt() {
    var SELF_ADDR = $("#address").val();
    var time = (new Date()).valueOf()/1000 + 900;
    Contract_exchange.methods.tokenToExchangeTransferInput(181971142185330750,time).send({ from: SELF_ADDR , value: web3.utils.toWei(num,'ether')})
        .on("receipt", function(data) {
            layer.msg("兑换成功");
            location.reload();
        })
        .on("error", function(error) {
            layer.msg("兑换失败");
            location.reload();
        });
}

//获取swap合约已授权指定币种的数量
async function allowance(UserAddr,CoinAddr) {
    return new Promise(function (resolve, reject) {
        Contract_exchange.methods.allowance(UserAddr, CoinAddr).call()
            .then(function(data) {
                resolve(data);
            });
    });
}

//undt换其他币
async function undt2other(num) {
    try {
        let account = await ethAccounts();
        let allow = await authorize_und_num(account,CONFIG.exchange_addr);
        console.log("已授权数量："+allow);
        if(allow <= 0 || allow < num){
            console.log("需要授权");
            let gas = await getGasPrice();
            console.log("gas:"+gas)
            var res = await authorize_und(account,CONFIG.exchange_addr,num,gas);
            console.log("已授权");
            console.log(res);
        }

        console.log("开始授权流程");

        var min_num = (num  * 0.9);
        min_num = min_num.toFixed(18);
        console.log("min_num："+min_num);
        min_num = web3.utils.toWei(min_num, CONFIG.und_wei);
        min_num = web3.utils.toBN(min_num);
        console.log("min_num："+min_num);

        num = web3.utils.toWei(num, CONFIG.und_wei);
        num = web3.utils.toBN(num);

        var min_fee = 1;

        var time = Math.ceil((new Date()).valueOf()/1000) + 900;

        return new Promise(function (resolve, reject) {
            Contract_exchange.methods.tokenToTokenSwapInput(100000000000000,98906999026249,1,time,"0x8dd5fbce2f6a956c3022ba3663759011dd51e73e").send({ from: account})
                .on("receipt", function(data) {
                    console.log("兑换成功");
                    resolve(data);
                })
                .on("error", function(error) {
                    console.log("兑换失败");
                    reject(error);
                });
        });
    }
    catch (e) {
        console.log("捕获异常");
        console.log(e);
    }
}

//指定数量的eth能换多少undt
function eth2undtNum() {
    Contract_exchange.methods.getEthToTokenInputPrice(1).call()
        .then(function(data) {
            console.log("一个eth能换"+data+" undt");
            $(".getNum").text(data);
        });
}

//指定数量的undt能换多少eth
function undt2ethNum() {
    Contract_exchange.methods.getTokenToEthInputPrice(1).call()
        .then(function(data) {
            console.log("一个undt能换"+data+" eth");
            $(".getNum").text(data);
        });
}


