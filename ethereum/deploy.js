const HDWalletprovider=require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider=new HDWalletprovider(
    "country enough card require peasant demand chest scheme siren chapter almost half",
    'https://rinkeby.infura.io/v3/248f97ed213b449ab657a31c86b5ac64'

);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();

//0xE44f290026988724DEaf936B0E2A6eF47f5dF454 address to where it is deployed
