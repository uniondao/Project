async function getContract(abi,addr){
    return new Promise(function (resolve, reject) {
        let contract =  new window.web3.eth.Contract(abi, addr);
        resolve(contract);
    });
}

async function getWeb3() {
    let err = null;
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
        } catch (error) {
            err = error;
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = await new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        window.web3 = await new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/71b7dcb12a69469aa61af1e049759342"));
    }

    return new Promise(function (resolve, reject) {
        if(err){
            return reject(error);
        }

        resolve(window.web3);
    });
}