require('dotenv').config();
const ethers = require('ethers');

async function main() {

    const url = process.env.ALCHEMY_RINKEBY_URL;
    const provider = new ethers.providers.JsonRpcProvider(url);

    // let privateKey = process.env.RINKEBY_PRIVATE_KEY;
    // let wallet1 = new ethers.Wallet(privateKey, provider);

    const privateKey2 = process.env.RINKEBY_PRIVATE_KEY2;
    let wallet2 = new ethers.Wallet(privateKey2, provider);

    // const contractAddress = '0x64E7EEBee6d188210af50715Ef19206bdd9b2d58';
    const testAddress = '0xce6f53184b2f6CFA07D0986c70Dd28E85390Fb00';
    // const abi = [{ "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
    const testABI = [{ "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
    const amount1 = ethers.utils.parseEther('0.1');
    // const amount2 = ethers.utils.parseEther('1.0');

    const faucet = new ethers.Contract(testAddress, testABI, wallet2)

    try {
        let tx = await faucet.withdraw(amount1);
        console.log("Your withdrawl tx is: " + tx);
        let receipt = await tx.wait();
        console.log(receipt);
    } catch (err) {
        console.log(err);
    }
}

main();