const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("This is our main testing scope", function () {
    let faucet, signer;

    before("Deploy the contract instance first", async function () {
        const Faucet = await ethers.getContractFactory("Faucet");
        faucet = await Faucet.deploy({
            value: ethers.utils.parseUnits("10", "ether"),
        });
        await faucet.deployed();
        [signer] = await ethers.provider.listAccounts();
    });

    it("It should set the owner to be the deployer of the contract", async function () {
        assert.equal(await faucet.owner(), signer);
    });

    it("It should only allow owner to call selfdestruct", async function () {
        //  how to get a different signer??
        let notOwner =
            assert.equal(await faucet.owner(), signer);
    });

    it("It should withdraw the correct amount", async function () {
        let withdrawAmount = ethers.utils.parseUnits(".11", "ether");
        await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
    })

    // it("It should invole the fallback function", async function () {
    //     // declare a separate ethers signer
    //     let signer1 = ethers.provider.getSigner(0);
    //     // create an ethers wallet instance using default signer
    //     const wallet = new ethers.Wallet(signer, ethers.provider);

    //     // send some ETH to our newly created wallet!
    //     await signer1.sendTransaction({
    //         to: wallet.address,
    //         value: ethers.utils.parseUnits("1", "ether"),
    //     });

    //     // send an empty transaction to the faucet
    //     let response = await wallet.sendTransaction({
    //         to: faucet.address,
    //     });
    //     let receipt = await response.wait();

    //     // query the logs for the FallbackCalled event
    //     const topic = faucet.interface.getEventTopic('FallbackCalled');
    //     const log = receipt.logs.find(x => x.topics.indexOf(topic) >= 0);
    //     const deployedEvent = faucet.interface.parseLog(log);

    //     assert(deployedEvent, "Expected the Fallback Called event to be emitted!");
    // });

});