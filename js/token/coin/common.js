

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