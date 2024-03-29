//授权
async function authorize_coin(Exaddr,coin,num) {
    if (!Exaddr) {
        reject(script_Lan.sign_login[currentLan]);
    }
    if (num <= 0) {
        reject(script_Lan.approve_num_min[currentLan]);
    }

    let gas = await getGasPrice();
    let UserAddr = await ethAccounts();
    const decimals = coin.toLowerCase()+"_decimals";
    num = Number(num);
    num = num * Math.pow(10,CONFIG[decimals]);
    if(String(num).indexOf('e+') != -1){
        let num_str = String(num).split('e+');
        let new_str = num_str[0]+'0'.repeat(num_str[1]);
        num = new_str;
    }
    num = web3.utils.toBN(num);
    num = num.toString();
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
    const decimals = coin.toLowerCase()+"_decimals";
    return new Promise(function (resolve, reject) {
        Contract_Coin.methods.allowance(UserAddr, CoinExAddr).call()
            .then(
                    function(data) {
                        if (data > 0) {
                            var num = Number(data) / Math.pow(10,CONFIG[decimals]);
                        } else {
                            var num = 0;
                        }
                        resolve(num);
                    },
                    function (e) {
                        console.log(e);
                    }
                );
    });
}

//获取余额
async function getCoinBalance(coin) {
    const coin_addr = coin.toLowerCase()+"_addr";
    const decimals = coin.toLowerCase()+"_decimals";
    let account = await ethAccounts();
    window.Contract = await getContract(abi_base, CONFIG[coin_addr]);
    let balance = await Contract.methods.balanceOf(account).call();
    balance = balance / Math.pow(10,CONFIG[decimals]);
    return balance;
}