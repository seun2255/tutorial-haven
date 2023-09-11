require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.16",
  networks: {
    networks: {
      matic: {
        url: process.env.NETWORK_URL,
        accounts: [process.env.PRIVATE_KEY],
      },
    },
  },
};
