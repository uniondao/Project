//获取eth账户信息
function ethAccounts() {

    web3.eth.getAccounts(function(err, accounts) {
        if (accounts.length != 0) {
            $("#address").val(accounts[0]);
        }
    });
}

//eth余额
function ethBalance() {
    var addr = $('#address').val();
    if (addr != null || addr != "") {
        web3.eth.getBalance(addr).then(
            function(result) {
                var temp = result / Math.pow(10, 18)
                var num = Number(temp).toFixed(CONFIG.Fixed);
                $('.eth_balance').html(num);
            });
    }
}

//获取区块高度
function getBlockNumber() {
    web3.eth.getBlockNumber().then(function(data) {
        if (isNaN(data)) {
            getBlockNumber();
            return null;
        }
        data = parseInt(data) - parseInt(CONFIG.start_block);
        $("#getBlockNumber").val(data);
        $(".current_heigh").html(data);
    });
}

//登录获取账户
function submit_account() {
    ethereum.enable();
    location.reload();
}

//获取当前gas
function getGasPrice() {
    web3.eth.getGasPrice().then(function(data) {
        if (isNaN(data)) {
            getGasPrice();
            return null;
        }
        $("#getGasPrice").val(data);
    });
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