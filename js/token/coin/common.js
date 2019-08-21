//授权
async function authorize_coin(Exaddr,coin,num) {
    if (!Exaddr) {
        reject(script_Lan.sign_login[currentLan]);
    }
    if (num <= 0) {
        reject(script_Lan.approve_num_min[currentLan]);
    }

    let gas = await getGasPrice();
    let wei = coin.toLowerCase()+'_wei';
    let UserAddr = await ethAccounts();
    num = Number(num);
    num = web3.utils.toWei(num, CONFIG[wei]);
    num = web3.utils.toBN(num);
    gas = Number(gas) + Number(CONFIG.GasExtra);
    return new Promise(function (resolve, reject) {
        Contract_Coin.methods.approve(Exaddr, num).send({ from: UserAddr, gasPrice: gas,gas:CONFIG.GasLimit},function (error, transactionHash) {
            if(error){
               return reject(error);
            }
            return resolve(transactionHash);
        })
    });
}

//获取授权数量
async function authorize_coin_num(CoinExAddr,coin) {
    let UserAddr = await ethAccounts();
    let wei = coin.toLowerCase()+'_wei';
    return new Promise(function (resolve, reject) {
        Contract_Coin.methods.allowance(UserAddr, CoinExAddr).call()
            .then(function(data) {
                if (data > 0) {
                    var num = web3.utils.fromWei(data, CONFIG[wei]);
                } else {
                    var num = 0;
                }
                resolve(num);
            });
    });
}