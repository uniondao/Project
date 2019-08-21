//etn换udao
function eth2udao(gas) {
    var SELF_ADDR = $("#address").val();
    var time = (new Date()).valueOf()/1000 + 900;
    var num = $("#paywithNum").val();
    var min_num = (num  * 0.9);
    min_num = min_num.toFixed(18);
    min_num = web3.utils.toWei(min_num, CONFIG.udao_wei);
    min_num = web3.utils.toBN(min_num);
    console.log("min_num："+min_num);
    gas = Number(gas)+Number(3000000000);
    Contract_exchange_udao.methods.ethToTokenSwapInput(min_num,time).send({ from: SELF_ADDR , value: web3.utils.toWei(num,'ether'),gasPrice:gas,gas:200000})
        .on("receipt", function(data) {
            alert("兑换成功");
            location.reload();
        })
        .on("error", function(error) {
            alert("兑换失败");
            console.log(error);
            // location.reload();
        });
}

//undt换eth
async function udao2eth(gas) {
    let SELF_ADDR = $("#address").val();
    let time = (new Date()).valueOf()/1000 + 900;
    let num = $("#paywithNum").val();
    let min_num = await eth2udaoNum();
    let allow = await authorize_udao_num(SELF_ADDR,CONFIG.exchange_addr);
    if(allow <= 0 || allow < num){
        console.log("需要授权");
        let gas = await getGasPrice();
        console.log("gas:"+gas)
        var res = await authorize_udao(SELF_ADDR,CONFIG.exchange_addr,100000000000000000000,gas);
        console.log(res);
        console.log("已授权");
    }

    min_num = num * (1 / min_num) * 0.99;
    console.log("min_num："+min_num);

    num = web3.utils.toWei(num,CONFIG.udao_wei);
    num = web3.utils.toBN(num);
    min_num = min_num.toFixed(18);
    min_num = web3.utils.toWei(min_num, CONFIG.udao_wei);
    min_num = web3.utils.toBN(min_num);
    console.log("min_num："+min_num);
    gas = Number(gas)+Number(3000000000);
    Contract_exchange_udao.methods.tokenToEthSwapInput(num,min_num,time).send({ from: SELF_ADDR ,gasPrice:gas,gas:200000})
        .on("receipt", function(data) {
            alert("兑换成功");
            location.reload();
        })
        .on("error", function(error) {
            alert("兑换失败");
            console.log(error);
            // location.reload();
        });
}

//其他币换undt
function other2dao() {

}

//udao换其他币
async function udao2other(num) {
    try {
        let account = await ethAccounts();
        let allow = await authorize_udao_num(account,CONFIG.Contract_exchange_udao);
        let gas = await getGasPrice();
        if(allow <= 0 || allow < num){
            await authorize_udao(account,CONFIG.Contract_exchange_udao,100000000000000000000,gas);
        }

        var min_num = (num  * 0.9);
        min_num = min_num.toFixed(18);
        console.log("min_num："+min_num);
        min_num = web3.utils.toWei(min_num, CONFIG.udao_wei);
        min_num = web3.utils.toBN(min_num);
        console.log("min_num："+min_num);

        num = web3.utils.toWei(num, CONFIG.udao_wei);
        num = web3.utils.toBN(num);

        var min_fee = 1;

        var time = Math.ceil((new Date()).valueOf()/1000) + 900;


        Contract_exchange_udao.methods.tokenToTokenSwapInput(100000000000000,98906999026249,1,time,"0x4a32e09c60af50f0a5869bf5c622f4e5d57c3b37").send({ from: account,gasPrice:gas,gas:200000})
            .on("confirmation", function(data) {
                console.log("兑换成功");
                resolve(data);
            })
            .on("error", function(error) {
                console.log("兑换失败");
                reject(error);
            });
    }
    catch (e) {
        console.log("捕获异常");
        console.log(e);
    }
}

//指定数量的eth能换多少undt
async function eth2udaoNum() {
    let num = await Contract_exchange_udao.methods.getEthToTokenInputPrice(1).call();
    return num;
}

//指定数量的undt能换多少eth
async function udao2ethNum() {
    let num = await Contract_exchange_udao.methods.getTokenToEthInputPrice(1).call();
    return num;
}


