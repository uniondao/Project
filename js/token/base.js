window.addEventListener('load', async() => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);

    }
    // Non-dapp browsers...
    else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask or imToken!');
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/71b7dcb12a69469aa61af1e049759342"));
    }
    init();
});

function init() {

    und_addr = CONFIG.und_addr;
    udao_addr = CONFIG.udao_addr;
    usdt_addr = CONFIG.usdt_addr;
    dai_addr = CONFIG.dai_addr;
    tusd_addr = CONFIG.tusd_addr;
    usdc_addr = CONFIG.usdc_addr;
    pax_addr = CONFIG.pax_addr;
    udao_issue_addr = CONFIG.udao_issue_addr;
    und_issue_addr = CONFIG.und_issue_addr;
    candy_addr = CONFIG.candy_addr;
    factory_addr = CONFIG.factory_addr;
    exchange_addr = CONFIG.exchange_addr;
    reserve_addr = CONFIG.reserve_addr;
    airdrop_addr = CONFIG.airdrop_addr;
    team_addr = CONFIG.team_addr;
    investment_addr = CONFIG.investment_addr;
    Contract_und = new web3.eth.Contract(abi_und, und_addr); //合约
    Contract_udao = new web3.eth.Contract(abi_udao, udao_addr); //合约
    Contract_usdt = new web3.eth.Contract(abi_usdt, usdt_addr); //代币
    Contract_dai = new web3.eth.Contract(abi_usdt, dai_addr); //代币
    Contract_tusd = new web3.eth.Contract(abi_usdt, tusd_addr); //代币
    Contract_usdc = new web3.eth.Contract(abi_usdt, usdc_addr); //代币
    Contract_pax = new web3.eth.Contract(abi_usdt, pax_addr); //代币
    Contract_udao_issue = new web3.eth.Contract(abi_udao_issue, udao_issue_addr); //合约
    Contract_und_issue = new web3.eth.Contract(abi_und_issue, und_issue_addr); //合约
    // Contract_candy = new web3.eth.Contract(abi_candy, candy_addr); //合约
    //Contract_exchange = new web3.eth.Contract(abi_exchange, exchange_addr); //合约
    Contract_airdrop = new web3.eth.Contract(abi_airdrop, airdrop_addr); //合约
    Contract_team = new web3.eth.Contract(abi_team, team_addr); //合约
    Contract_investment = new web3.eth.Contract(abi_investment, investment_addr); //合约
}