/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'mainnet',
    networks: {
      hardhat: {},
      goerli: {
        url: 'https://rpc.ankr.com/eth_goerli',
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      },
      testnet: {
        url: "https://data-seed-prebsc-1-s1.binance.org:8545",
        chainId: 97,
        gasPrice: 20000000000,
        accounts: {mnemonic: "lens tourist earn jewel cluster remind erase notice silly gloom curious food"}
      },
      mainnet: {
        url: "https://bsc-dataseed.binance.org/",
        chainId: 97,
        gasPrice: 20000000000,
        accounts: {mnemonic: "lens tourist earn jewel cluster remind erase notice silly gloom curious food"}
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
