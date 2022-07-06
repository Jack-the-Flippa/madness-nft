const hre = require("hardhat");
const fs = require('fs');

async function main() {

  const MadnessBros = await hre.ethers.getContractFactory("MadnessBros");
  const madnessbros = await MadnessBros.deploy("MadnessBros", "MAD", 100);

  await madnessbros.deployed();

  console.log("MadnessBros deployed to:", madnessbros.address);

  fs.writeFileSync("./config.js",`
  export const contractAddress = "${madnessbros.address}"
  export const ownerAddress = "${madnessbros.signer.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
