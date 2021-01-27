import Multisig from "./contracts/Multisig.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
  contracts: [Multisig],
  events: {
    // SimpleStorage: ["StorageSet"],
  },
  polls: {
    accounts: 15000,
  },
};

export default options;
