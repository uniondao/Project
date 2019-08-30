//exchange 合约币种 兑换 其他币种
async function exchange2other(num,rateNum,sellCoin,buyCoin) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    let min_fee = 1;
    let time = Math.ceil((new Date()).valueOf()/1000) + 900;
    let buyCoin_decimals = buyCoin.toLowerCase()+'_decimals';
    let sellCoin_decimals = sellCoin.toLowerCase()+'_decimals';
    let buyCoin_addr = buyCoin.toLowerCase()+'_addr';
    let min_num = 0;

    gas = Number(gas)+Number(CONFIG.GasExtra);

    min_num = rateNum * num;
    min_num = min_num - (min_num * 0.05);

    //单位转换
    min_num = min_num.toFixed(18);
    min_num = min_num * Math.pow(10,CONFIG[buyCoin_decimals]);
    min_num = Math.floor(min_num);
    min_num = web3.utils.toBN(min_num);

    //单位转换
    num = num * Math.pow(10,CONFIG[sellCoin_decimals]);
    num = web3.utils.toBN(num);

    return new Promise(function (resolve, reject) {
         Contract_exchange.methods.tokenToTokenSwapInput(num,min_num,min_fee,time,CONFIG[buyCoin_addr]).send({ from: account,gasPrice:gas,gas:CONFIG.GasLimit},function (error, transactionHash) {
            if(error){
                return reject(error);
            }
            console.log(transactionHash);
             return  resolve(transactionHash);
         })
    })
}

//以太坊 兑换 exchange 合约币种
async function eth2exchange(num,buyCoin) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    let time = Math.ceil((new Date()).valueOf()/1000) + 900;
    let buyCoin_decimals = buyCoin.toLowerCase()+'_decimals';
    let rateNum = await eth2exchangeNum();

    gas = Number(gas)+Number(CONFIG.GasExtra);

    min_num = rateNum * num;
    min_num = min_num - (min_num * 0.05);

    //单位转换
    min_num = min_num.toFixed(18);
    min_num = min_num * Math.pow(10,CONFIG[buyCoin_decimals]);
    min_num = Math.floor(min_num);
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
    let sellCoin_decimals = sellCoin.toLowerCase()+'_decimals';
    let rateNum = await eth2exchangeNum();
    rateNum = 1 / rateNum;

    gas = Number(gas)+Number(CONFIG.GasExtra);

    min_num = rateNum * num;
    min_num = min_num - (min_num * 0.05);

    //单位转换
    min_num = min_num.toFixed(18);
    min_num = web3.utils.toWei(min_num,'ether');
    min_num = Math.floor(min_num);
    min_num = web3.utils.toBN(min_num);

    //单位转换
    num = num * Math.pow(10,CONFIG[sellCoin_decimals]);
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

/*********** ETH ⇄ ERC20 ***********/

//获取兑换率
function getExchangeRate(inputAmount,outputAmount ) {
    inputAmount = Number(inputAmount);
    outputAmount = Number(outputAmount);
    let rate;
    if(inputAmount <= 0){
        rate = 0;
    }else{
        rate = inputAmount / outputAmount;
    }
    return rate;
}

//获取手续费
function getFee(inputAmount) {
    inputAmount = Number(inputAmount);
    let fee = inputAmount * 0.003;
    return fee;
}

//卖单情况下，根据输入数量得到输出数量
//Sell ETH for ERC20
async function getOutputAmountE2ERC (inputAmount,coin) {
    inputAmount = Number(inputAmount);
    const coin_addr = coin.toLowerCase()+"_addr";
    const ex_addr = "exchange_"+coin.toLowerCase()+"_addr";
    window.Contract = await getContract(abi_base, CONFIG[coin_addr]);
    const inputReserve = await web3.eth.getBalance(CONFIG[ex_addr]);
    const outputReserve = await Contract.methods.balanceOf(CONFIG[ex_addr]).call();

    const numerator = inputAmount * outputReserve * 997;
    const denominator = inputReserve * 1000 + inputAmount * 997;
    const outputAmount = numerator / denominator;
    return outputAmount;
}

//卖单情况下，根据输入数量得到输出数量
//Sell ERC20 for ETH
async function getOutputAmountERC2E(inputAmount,coin) {
    inputAmount = Number(inputAmount);
    const coin_addr = coin.toLowerCase()+"_addr";
    const ex_addr = "exchange_"+coin.toLowerCase()+"_addr";
    window.Contract = await getContract(abi_base, CONFIG[coin_addr]);
    const inputReserve = await Contract_exchange.methods.balanceOf(CONFIG[ex_addr]).call();
    const outputReserve = await web3.eth.getBalance(CONFIG[ex_addr]);

    const numerator = inputAmount * outputReserve * 997;
    const denominator = inputReserve * 1000 + inputAmount * 997;
    const outputAmount = numerator / denominator;
    return outputAmount;
}

/*********** ERC20 ⇄ ERC20 ***********/
async function getOutputAmountERC2ERC(inputAmount,sellCoin,buyCoin){
    // TokenA (ERC20) to ETH conversion
    const inputAmountA = Number(inputAmount);
    const sellCoin_addr = sellCoin.toLowerCase()+"_addr";
    const ex_sellCoin_addr = "exchange_"+sellCoin.toLowerCase()+"_addr";
    window.Contract = await getContract(abi_base, CONFIG[sellCoin_addr]);
    const inputReserveA = await Contract.methods.balanceOf(CONFIG[ex_sellCoin_addr]).call();
    const outputReserveA = await web3.eth.getBalance(CONFIG[ex_sellCoin_addr]);

    const numeratorA = inputAmountA * outputReserveA * 997
    const denominatorA = inputReserveA * 1000 + inputAmountA * 997
    const outputAmountA = numeratorA / denominatorA

    // ETH to TokenB conversion
    const inputAmountB = outputAmountA
    const buyCoin_addr = buyCoin.toLowerCase()+"_addr";
    const ex_buyCoin_addr = "exchange_"+buyCoin.toLowerCase()+"_addr";
    const inputReserveB = await web3.eth.getBalance(CONFIG[ex_buyCoin_addr])
    window.Contract = await getContract(abi_base, CONFIG[buyCoin_addr]);
    const outputReserveB = await Contract.methods.balanceOf(CONFIG[ex_buyCoin_addr]).call();

    const numeratorB = inputAmountB * outputReserveB * 997
    const denominatorB = inputReserveB * 1000 + inputAmountB * 997
    const outputAmountB = numeratorB / denominatorB
    return outputAmountB;
}

//获取手续费
function getFeeERC(inputAmount) {
    return Number(inputAmount) * 0.00591;
}
