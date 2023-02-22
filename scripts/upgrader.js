require("dotenv").config();


async function upgradeContract(_contractName, _contractAddress) {

    console.log(`Upgrading ${_contractName} ...`);

    const ContractUpgrade = await hre.ethers.getContractFactory(_contractName);

    var contractUpgrade = await upgrades.upgradeProxy(_contractAddress, ContractUpgrade);
    try {
        await contractUpgrade.deployTransaction.wait(5);
    } catch (error) {
        console.log(error);
    }

    var implUpgradeAddress = await upgrades.erc1967.getImplementationAddress(contractUpgrade.address);

    console.log(`${_contractName} Proxy address: ${contractUpgrade.address}`);
    console.log(`${_contractName} Impl. address: ${implUpgradeAddress}`);

    await hre.run("verify:verify", {
        address: implUpgradeAddress,
        constructorArguments: [],
    });
}


async function main() {

    await upgradeContract("FidelityNFT", "0xD92f508a30F89AFdF8411BE8db50D3eD8ac6a6bA")//UPDATE IF NEEDED
        .catch((error) => {
            console.error(error);
            process.exitCode = 1;
        });

    await upgradeContract("FidelityCoin", "0x80170Fe3fC29056aB6aa65cbE16f2791C030ebeC")//UPDATE IF NEEDED
        .catch((error) => {
            console.error(error);
            process.exitCode = 1;
        });

   await  upgradeContract("AirdropFidelityCoin", "0x40EA8f4399ff7B9e5A796c51d9D3aE2a0b92Fa68")//UPDATE IF NEEDED
        .catch((error) => {
            console.error(error);
            process.exitCode = 1;
        });

   await  upgradeContract("PurchaseCoin", "0xD4d974d4fFEF4e4a283487323d7edfC18ED71F90")//UPDATE IF NEEDED
        .catch((error) => {
            console.error(error);
            process.exitCode = 1;
        });

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});