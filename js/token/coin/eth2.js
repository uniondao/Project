//获取eth账户信息
async function ethAccounts() {
    return new Promise(function (resolve, reject) {
        web3.eth.getAccounts(function(err, accounts) {
            if(err){
                reject(err);
            }else{
                resolve(accounts[0]);
            }
        });
    });
}

//eth余额
async function ethBalance(addr) {
    let num = await web3.eth.getBalance(addr);
    num = num / Math.pow(10, 18);
    num = Number(num).toFixed(CONFIG.Fixed);
    return num;
}

//获取区块高度
async function getBlockNumber() {
    let height = await web3.eth.getBlockNumber();
    height = parseInt(height) - parseInt(CONFIG.start_block);
    return height;
}

//登录获取账户
function submit_account() {
    ethereum.enable();
    location.reload();
}

//获取当前gas
async function getGasPrice() {
    let gas = await web3.eth.getGasPrice();
    return gas;
}

//获取Reserve的值
function reserve_undt(){
    Contract_und.methods.balanceOf(reserve_addr).call() .then(function(data) {
        if (isNaN(data)) {
            reserve_undt();
            return null;
        }
        var balance_num = web3.utils.fromWei(data, CONFIG.und_wei);
        $('#reserve_undt').val(balance_num);
    });
}

//获取Reserve的值
function reserve_usdt(){

        Contract_usdt.methods.balanceOf(reserve_addr).call() .then(function(data) {
            if (isNaN(data)) {
                reserve_usdt();
                return null;
            }
            var balance_num = web3.utils.fromWei(data, CONFIG.usdt_wei);
            $('#reserve_usdt').val(balance_num);
        });

}

//获取Reserve的值
function reserve_tusd(){
        Contract_tusd.methods.balanceOf(reserve_addr).call() .then(function(data) {
            if (isNaN(data)) {
                reserve_tusd();
                return null;
            }
            var balance_num = web3.utils.fromWei(data, CONFIG.tusd_wei);
            $('#reserve_tusd').val(balance_num);
        });
}

//获取Reserve的值
function reserve_pax(){
    Contract_pax.methods.balanceOf(reserve_addr).call() .then(function(data) {
        if (isNaN(data)) {
            reserve_pax();
            return null;
        }
        var balance_num = web3.utils.fromWei(data, CONFIG.pax_wei);
        $('#reserve_pax').val(balance_num);
    });
}

//获取Reserve的值
function reserve_dai(){
    Contract_dai.methods.balanceOf(reserve_addr).call() .then(function(data) {
        if (isNaN(data)) {
            reserve_dai();
            return null;
        }
        var balance_num = web3.utils.fromWei(data, CONFIG.dai_wei);
        $('#reserve_dai').val(balance_num);
    });
}

//获取Reserve的值
function reserve_usdc(){
    Contract_usdc.methods.balanceOf(reserve_addr).call() .then(function(data) {
        if (isNaN(data)) {
            reserve_usdc();
            return null;
        }
        var balance_num = web3.utils.fromWei(data, CONFIG.usdc_wei);
        $('#reserve_usdc').val(balance_num);
    });
}