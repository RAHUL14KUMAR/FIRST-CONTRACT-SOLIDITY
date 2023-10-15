const {ethers}=require("hardhat");

async function main(){
    const contractFactoy=await ethers.getContractFactory("taskContract");

    const contract=await contractFactoy.deploy();
    await contract.deployed();
    console.log("contract deployed to: ",contract.address);
}

async function runMain(){
    try{
        await main();
        process.exit(0);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
runMain();