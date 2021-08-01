import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance=new web3.eth.Contract(
    CampaignFactory.abi,
    "0x9533bbB13ad5624ba160E723eBb1E78eA8DA991a"
);



export default instance;
