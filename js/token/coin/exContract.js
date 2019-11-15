//exchange 合约币种 兑换 其他币种
async function exchange2other(num,rateNum,sellCoin,buyCoin) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    let min_fee = 1;
    let time = Math.ceil((new Date()).valueOf()/1000) + 900;
    let buyCoin_decimals = buyCoin.toLowerCase()+'_decimals';
    let sellCoin_decimals = sellCoin.toLowerCase()+'_decimals';
    let buyCoin_addr = buyCoin.toLowerCase()+'_addr';
    let min_num = $("#receiveNum").val();
    min_num = min_num.replace('≈','');
    min_num = $.trim(min_num);
    min_num = Number(min_num);
    min_num = min_num * 0.99;
    console.log("min_num:"+min_num);

    gas = Number(gas)+Number(CONFIG.GasExtra);

    //单位转换
    min_num = min_num.toFixed(18);
    min_num = min_num * Math.pow(10,CONFIG[buyCoin_decimals]);
    min_num = Math.floor(min_num);
    min_num = web3.utils.toBN(min_num);
    min_num = min_num.toString();

    //单位转换
    num = num * Math.pow(10,CONFIG[sellCoin_decimals]);
    num = web3.utils.toBN(num);
    num = num.toString();

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

    gas = Number(gas)+Number(CONFIG.GasExtra);

    let min_num = $("#receiveNum").val();
    min_num = min_num.replace('≈','');
    min_num = $.trim(min_num);
    min_num = Number(min_num);
    min_num = min_num *0.99;

    //单位转换
    min_num = min_num.toFixed(18);
    min_num = min_num * Math.pow(10,CONFIG[buyCoin_decimals]);
    min_num = Math.floor(min_num);
    min_num = web3.utils.toBN(min_num);
    min_num = min_num.toString();
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

    gas = Number(gas)+Number(CONFIG.GasExtra);

    let min_num = $("#receiveNum").val();
    min_num = min_num.replace('≈','');
    min_num = $.trim(min_num);
    min_num = Number(min_num);
    min_num = min_num *0.99;

    //单位转换
    min_num = min_num.toFixed(18);
    min_num = web3.utils.toWei(min_num,'ether');
    min_num = web3.utils.toBN(min_num);
    min_num = min_num.toString();

    //单位转换
    num = num * Math.pow(10,CONFIG[sellCoin_decimals]);
    num = web3.utils.toBN(num);
    num = num.toString();


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
    let A0 = await web3.eth.getBalance(CONFIG[ex_addr]);
    let B0 = await Contract.methods.balanceOf(CONFIG[ex_addr]).call();
    A0 = A0 / Math.pow(10,18);
    B0 = B0 / Math.pow(10,18);
    let ji = A0 * B0;
    let output = ji / (A0 + inputAmount);
    output = B0 - output;
    if(output <= 0){
        output = 0;
    }
    return output;
}

//卖单情况下，根据输入数量得到输出数量
//Sell ERC20 for ETH
async function getOutputAmountERC2E(inputAmount,coin) {
    inputAmount = Number(inputAmount);
    const coin_addr = coin.toLowerCase()+"_addr";
    const ex_addr = "exchange_"+coin.toLowerCase()+"_addr";
    window.Contract = await getContract(abi_base, CONFIG[coin_addr]);
    let A0 = await Contract.methods.balanceOf(CONFIG[ex_addr]).call();
    let B0 = await web3.eth.getBalance(CONFIG[ex_addr]);
    A0 = A0 / Math.pow(10,18);
    B0 = B0 / Math.pow(10,18);
    let ji = A0 * B0;
    let output = ji / (A0 + inputAmount);
    output = B0 - output;
    if(output <= 0){
        output = 0;
    }
    return output;
}

/*********** ERC20 ⇄ ERC20 ***********/
async function getOutputAmountERC2ERC(inputAmount,sellCoin,buyCoin){
    // TokenA (ERC20) to ETH conversion
    inputAmount = Number(inputAmount);
    const sellCoin_decimals = sellCoin.toLowerCase()+'_decimals';
    const buyCoin_decimals = buyCoin.toLowerCase()+'_decimals';
    const sellCoin_addr = sellCoin.toLowerCase()+"_addr";
    const ex_sellCoin_addr = "exchange_"+sellCoin.toLowerCase()+"_addr";
    window.Contract = await getContract(abi_base, CONFIG[sellCoin_addr]);
    let A0  = await Contract.methods.balanceOf(CONFIG[ex_sellCoin_addr]).call();
    let B0  = await web3.eth.getBalance(CONFIG[ex_sellCoin_addr]);

    A0 = A0 / Math.pow(10,CONFIG[sellCoin_decimals]);
    B0 = B0 / Math.pow(10,18);
    let ji = A0 * B0;
    let output = ji / (A0 + inputAmount);
    let eth = B0 - output;

    // ETH to TokenB conversion
    const buyCoin_addr = buyCoin.toLowerCase()+"_addr";
    const ex_buyCoin_addr = "exchange_"+buyCoin.toLowerCase()+"_addr";
    let A1 = await web3.eth.getBalance(CONFIG[ex_buyCoin_addr]);
    window.Contract = await getContract(abi_base, CONFIG[buyCoin_addr]);
    let B1 = await Contract.methods.balanceOf(CONFIG[ex_buyCoin_addr]).call();

    A1 = A1 / Math.pow(10,18);
    B1 = B1 / Math.pow(10,CONFIG[buyCoin_decimals]);
    ji = A1 * B1;
    output = ji / (A1 + eth);
    let res = B1 - output;
    if(res <= 0){
        res = 0;
    }
    return res;
}

//获取手续费
function getFeeERC(inputAmount) {
    return Number(inputAmount) * 0.00591;
}
