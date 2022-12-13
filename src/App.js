import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import  Transaction from "./transaction.js";


import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

  function App() {

    const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {

    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
    
  },[blockNumber] );
    

  const [hash, sethash] = useState(0);
  const [parentHash, setparentHash] = useState(0);
  const [nonce, setnonce] = useState(0);
  const [miner, setminer] = useState(0);
  const [gasLimit, setgasLimit] = useState(0);
  const [gasUsed, setgasUsed] = useState(0);
  const [timestamp, settimestamp] = useState();
  const [numTransaction, setnumTransaction] = useState([]) 

  useEffect(() => {
    async function getBlock() {
      const block = await alchemy.core.getBlockWithTransactions(blockNumber);
      const fullTx = block.transactions          
      sethash(block.hash);
      setparentHash(block.parentHash);          
      setnonce(block.nonce);      
      setminer(block.miner);
      setgasLimit(Utils.formatEther(block.gasLimit._hex));          
      setgasUsed(Utils.formatEther(block.gasUsed._hex));
      settimestamp(Date(block.timestamp));
      setnumTransaction(fullTx.length)         
    }

    getBlock();
    
  },[] );
  
  
   return (
   <><div className="App">
       <b>Latest Block Number</b>: {blockNumber}
       <br></br>
     </div><div>
         <b>Hash</b>: {hash}<br />
         <b>Parent Hash</b>: {parentHash}<br />
         <b>Nonce</b>: {nonce}<br />
         <b>Miner</b>: {miner}<br />
         <b>Gas Limit </b>: {gasLimit}<br />
         <b>Gas Used </b>: {gasUsed}<br />
         <b>Timestamp </b>: {timestamp} <br />
         <b>Transactions in the block </b>: {numTransaction} <br />
       </div><div> <Transaction /> </div>
       
       </>
       
   )
  
  
  
}



export default App;
