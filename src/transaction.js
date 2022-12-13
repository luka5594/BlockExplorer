import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

  function Transaction() {

    const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {

    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
    
  },[blockNumber] );

  
  const [transactionsHash, settransactionsHash] = useState([]);
  const  [transactionIndex, settransactionIndex] = useState([])
  const  [transactionFrom, settransactionFrom] = useState([]) 
  const  [transactionTo, settransactionTo] = useState([])   

  useEffect(() => {
    async function getBlock() {
      const block = await alchemy.core.getBlockWithTransactions(blockNumber);
     const tx = block.transactions.slice(block.transactions.length - 10)
      console.log(tx)       
      settransactionsHash(tx.map( x => x.hash));
      settransactionIndex(tx.map( x => x.transactionIndex));
      settransactionFrom(tx.map( x => x.from));
      settransactionTo(tx.map( x => x.to));
    }

    getBlock();
    
  },[] );
  function mapsArray(array){
    return array.map(item=>(<tr key={item}>{item}</tr>))
  } 
  
    
     return (
        <table>
        <caption><b>Main info about last 10 transactions in the block</b></caption>
        <thead>
          <tr>
            <th scope ="col">Transaction hash</th>
            <th scope ="col">Transaction Index</th>
            <th scope ="col">From address</th>
            <th scope ="col">To address</th>
            

            </tr>
            </thead>
            <tbody>
            <td>
            {
     mapsArray(transactionsHash)
  
            }
            </td>
          <td>
           {  
  mapsArray(transactionIndex)
           } 
           </td>
           <td>
           {  
 mapsArray(transactionFrom)
           } 
           </td>
           <td>
           {  
  mapsArray(transactionTo)
           } 
           </td>
      
   

     
       </tbody>
       </table>
     )
        } 
        export default Transaction;