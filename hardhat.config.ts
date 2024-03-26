import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from "dotenv";
dotenv.config();

// tasks
import "./src/tasks/accounts";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      blockGasLimit: 30000000
    },
    cronos : {
      url : "https://rpc.ebisusbay.com/",
      chainId: 25,
      accounts: process.env.SIGNER !== undefined ? [process.env.SIGNER] : [],
      // useLedger: true,
      factory : '',
      wcro : '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    },
    testnet_cronos : {
      url : "https://rpc.ebisusbay.biz/",
      chainId : 338,
      accounts:  process.env.SIGNER !== undefined ? [process.env.SIGNER] : [],
      factory : '0x6202A2640a092229B770A82be719aF610e4C5719',
      wcro: '0x467604E174c87042fcc4412c5BC70AaBc8733016',
      router : '0x610a6717EDC11A62A3BaA81bb88Da9637D23f90C'

      // useLedger: false,
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 9999,
      },
      metadata: {
        bytecodeHash: "none",
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  },
  paths: {
    tests: "./src/test",
  },

  etherscan: {
    apiKey: {
      cronos: process.env.CRONOS_API_KEY,
      testnet_cronos: process.env.CRONOS_TEST_API_KEY,
    },
    customChains: [
      {
        network: "cronos",
        chainId: 25,
        urls: {
          apiURL: "https://api.cronoscan.com/api",
          browserURL: "https://cronoscan.com/",
        },
      },{
        network: "testnet_cronos",
        chainId : 338,
        urls:{
          apiURL: "https://explorer-api.cronos.org/testnet/api/v1/hardhat/contract?apikey=" + process.env.CRONOS_TEST_API_KEY,
          browserURL : "http://explorer.cronos.org/testnet"
        }
      }
    ]
   }

};

export default config;
