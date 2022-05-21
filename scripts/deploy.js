const ethers = require('ethers');
require('dotenv').config();

async function main() {

    const url = process.env.ALCHEMY_RINKEBY_URL;

    const provider = new ethers.providers.JsonRpcProvider(url);

    let privateKey = process.env.RINKEBY_PRIVATE_KEY;

    let wallet = new ethers.Wallet(privateKey, provider);

    let artifacts = await hre.artifacts.readArtifact("Faucet");

    let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

    let faucet = await factory.deploy();

    console.log("Faucet address: ", faucet.address);

    await faucet.deployed()

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

// module.exports = main();