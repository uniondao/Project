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

    c2c_addr = CONFIG.c2c_addr;
    undt_addr = CONFIG.undt_addr;
    Contract_c2c = new web3.eth.Contract(abi_c2c, c2c_addr); //合约
    Contract_undt = new web3.eth.Contract(abi_undt, undt_addr); //合约
}