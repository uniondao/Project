//exchange 合约币种 兑换 其他币种
async function exchange2other(num,rateNum,sellCoin,buyCoin) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    let min_fee = 1;
    let time = Math.ceil((new Date()).valueOf()/1000) + 900;
    let wei = sellCoin.toLowerCase()+'_wei';
    let buyCoin_addr = buyCoin.toLowerCase()+'_addr';
    let min_num = 0;

    gas = Number(gas)+Number(CONFIG.GasExtra);

    min_num = rateNum * num;
    min_num = min_num - (min_num * 0.05);

    //单位转换
    min_num = min_num.toFixed(18);
    min_num = web3.utils.toWei(min_num, CONFIG[wei]);
    min_num = web3.utils.toBN(min_num);

    //单位转换
    num = web3.utils.toWei(num, CONFIG[wei]);
    num = web3.utils.toBN(num);

    return new Promise(function (resolve, reject) {
         Contract_exchange.methods.tokenToTokenSwapInput(num,min_num,min_fee,time,CONFIG[buyCoin_addr]).send({ from: account,gasPrice:gas,gas:CONFIG.GasLimit},function (error, transactionHash) {
            if(error){
                return reject(error);
            }
             return  resolve(transactionHash);
         })
    })
}

//以太坊 兑换 exchange 合约币种
async function eth2exchange(num,buyCoin) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    let time = Math.ceil((new Date()).valueOf()/1000) + 900;
    let wei = buyCoin.toLowerCase()+'_wei';
    let rateNum = await eth2exchangeNum();

    gas = Number(gas)+Number(CONFIG.GasExtra);

    min_num = rateNum * num;
    min_num = min_num - (min_num * 0.05);

    //单位转换
    min_num = min_num.toFixed(18);
    min_num = web3.utils.toWei(min_num, CONFIG[wei]);
    min_num = web3.utils.toBN(min_num);
    return new Promise(function (resolve, reject) {
        Contract_exchange.methods.ethToTokenSwapInput(min_num,time).send({ from: account,value: web3.utils.toWei(num,'ether'),gasPrice:gas,gas:CONFIG.GasLimit},function (error, transactionHash) {
            if(error){
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}

//exchange 合约币种 兑换 以太坊
async function exchange2eth(num,sellCoin) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    let time = Math.ceil((new Date()).valueOf()/1000) + 900;
    let wei = sellCoin.toLowerCase()+'_wei';
    let rateNum = await eth2exchangeNum();

    gas = Number(gas)+Number(CONFIG.GasExtra);

    min_num = rateNum * num;
    min_num = min_num - (min_num * 0.05);

    //单位转换
    min_num = min_num.toFixed(18);
    min_num = web3.utils.toWei(min_num, CONFIG[wei]);
    min_num = web3.utils.toBN(min_num);

    //单位转换
    num = web3.utils.toWei(num,CONFIG[wei]);
    num = web3.utils.toBN(num);

    return new Promise(function (resolve, reject) {
        Contract_exchange.methods.tokenToEthSwapInput(num,min_num,time).send({ from: account,gasPrice:gas,gas:CONFIG.GasLimit},function (error, transactionHash) {
            if(error){
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}

//指定数量的eth能换多少exchange 合约币种
async function eth2exchangeNum() {
    let num = await Contract_exchange.methods.getEthToTokenInputPrice(1).call();
    return num;
}

//指定数量的exchange 合约币种能换多少eth
async function exchange2ethNum() {
    let num = await Contract_exchange.methods.getTokenToEthInputPrice(1).call();
    return num;
}