import Dash from "dash"

// const {NETWORK, MNEMONIC, CONTRACT_ID} = process.env
let NETWORK = "testnet"
let MNEMONIC = "feed correct flat group weird strike raise pencil exercise load dutch water"
let CONTRACT_ID = "C56kNun9tsNbbZJn3iTvmywoY4NUjkU6ntiFvEKVPTFF"


export const client = new Dash.Client({
  network: NETWORK,
  // picking a known good ip address can sometimes help reliablility
//   dapiAddresses: ["44.227.137.77:1443"],
  wallet: {
    mnemonic: MNEMONIC,
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 990000,
    },
  },
  apps: {
    tutorialContract: {
      contractId: CONTRACT_ID,
    },
  },
})