//etn换undt
async function eth2undt() {
    let SELF_ADDR = $("#address").val();
    let time = (new Date()).valueOf()/1000 + 900;
    let num = $("#paywithNum").val();
    let min_num = await eth2undtNum();
    min_num = num * min_num * 0.99;
    min_num = min_num.toFixed(18);
    min_num = web3.utils.toWei(min_num, CONFIG.und_wei);
    min_num = web3.utils.toBN(min_num);
    console.log("min_num："+min_num);
    let gas = await getGasPrice();
    gas = Number(gas)+Number(3000000000);
    Contract_exchange.methods.ethToTokenSwapInput(min_num,time).send({ from: SELF_ADDR , value: web3.utils.toWei(num,'ether'),gasPrice:gas,gas:200000})
        .on("confirmation", function(data) {
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
async function undt2eth(gas) {
    let SELF_ADDR = $("#address").val();
    let time = (new Date()).valueOf()/1000 + 900;
    let num = $("#paywithNum").val();
    let min_num = await eth2undtNum();
    let allow = await authorize_und_num(SELF_ADDR,CONFIG.exchange_addr);
    if(allow <= 0 || allow < num){
        console.log("需要授权");
        let gas = await getGasPrice();
        console.log("gas:"+gas)
        var res = await authorize_und(SELF_ADDR,CONFIG.exchange_addr,100000000000000000000,gas);
        console.log(res);
        console.log("已授权");
    }

    min_num = num * (1 / min_num) * 0.99;
    console.log("min_num："+min_num);

    num = web3.utils.toWei(num,CONFIG.und_wei);
    num = web3.utils.toBN(num);
    min_num = min_num.toFixed(18);
    min_num = web3.utils.toWei(min_num, CONFIG.und_wei);
    min_num = web3.utils.toBN(min_num);
    console.log("min_num："+min_num);
    gas = Number(gas)+Number(3000000000);
    Contract_exchange.methods.tokenToEthSwapInput(num,min_num,time).send({ from: SELF_ADDR ,gasPrice:gas,gas:200000})
        .on("confirmation", function(data) {
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
async function other2undt(bugCoin) {
    try {
        let account = await ethAccounts();
        let fun_name = "authorize_"+bugCoin.toLowerCase()+"_num";
        let allow = await eval(fun_name + "('"+ account+ "','"+CONFIG.exchange_addr+"')");//(account,CONFIG.exchange_addr));
        let gas = await getGasPrice();
        gas = Number(gas) + Number(3000000000);
        let num = $("#paywithNum").val();
        let Balance = $(".payCurrentBalance").text();
        if(Number(num) > Number(Balance)){
            alert("余额不足");
            return;
        }
        if(allow <= 0 || allow < num){
            let fun_name2 = "authorize_"+bugCoin.toLowerCase();
            await eval(fun_name2 + "('" + account+ "','"+CONFIG.exchange_addr+"',"+ 100000000000000000000+","+gas+")");
        }

        let min_num = Number($(".getNum").text());
        if( min_num <= 0){
            alert("兑换比率获取失败");
            return;
        }

        min_num = min_num - (min_num * 0.05);
        min_num = min_num * num;
        min_num = min_num.toFixed(18);
        min_num = web3.utils.toWei(min_num, CONFIG.und_wei);
        min_num = web3.utils.toBN(min_num);

        num = web3.utils.toWei(num, CONFIG.und_wei);
        num = web3.utils.toBN(num);

        let min_fee = 1;
        let time = Math.ceil((new Date()).valueOf()/1000) + 900;
        Contract_exchange.methods.tokenToTokenSwapInput(num,min_num,min_fee,time,"0x6eb93407d116d367893fad239a827235bc0d46fe").send({ from: account,gasPrice:gas,gas:200000})
            .on("receipt", function(data) {
                console.log("兑换成功");
                // resolve(data);
            })
            .on("error", function(error) {
                console.log("兑换失败");
                // reject(error);
            });
    }
    catch (e) {
        console.log("捕获异常");
        console.log(e);
    }
}

//undt换其他币
async function undt2other(bugCoin) {
    try {
        let account = await ethAccounts();
        let allow = await authorize_und_num(account,CONFIG.exchange_addr);
        let gas = await getGasPrice();
        gas = Number(gas) + Number(3000000000);
        let num = $("#paywithNum").val();
        let Balance = $(".payCurrentBalance").text();
        if(Number(num) > Number(Balance)){
            alert("余额不足");
            return;
        }
        if(allow <= 0 || allow < num){
            await authorize_und(account,CONFIG.exchange_addr,100000000000000000000,gas);
        }

        let min_num = Number($(".getNum").text());
        if( min_num <= 0){
            alert("兑换比率获取失败");
            return;
        }

        min_num = min_num - (min_num * 0.05);
        min_num = min_num * num;
        min_num = min_num.toFixed(18);
        min_num = web3.utils.toWei(min_num, CONFIG.und_wei);
        min_num = web3.utils.toBN(min_num);

        num = web3.utils.toWei(num, CONFIG.und_wei);
        num = web3.utils.toBN(num);

        let min_fee = 1;
        let time = Math.ceil((new Date()).valueOf()/1000) + 900;
        let coin_addr = bugCoin.toLowerCase();
        coin_addr = coin_addr+'_addr';
        Contract_exchange.methods.tokenToTokenSwapInput(num,min_num,min_fee,time,CONFIG[coin_addr]).send({ from: account,gasPrice:gas,gas:200000})
            .on("receipt", function(data) {
                console.log("兑换成功");
            })
            .on("error", function(error) {
                console.log("兑换失败");
            });
    }
    catch (e) {
        console.log("捕获异常");
        console.log(e);
    }
}

//指定数量的eth能换多少undt
async function eth2undtNum() {
    let num = await Contract_exchange.methods.getEthToTokenInputPrice(1).call();
    return num;
}

//指定数量的undt能换多少eth
async function undt2ethNum() {
    let num = await Contract_exchange.methods.getTokenToEthInputPrice(1).call();
    return num;
}


