import React from 'react';
import mainimage from './henry.gif'
import Image from 'next/image';
import { useContext } from 'react';
import { AccountContext } from '../context';
import Link from 'next/link';

export default function Home(props) {

  const account = useContext(AccountContext);
  const cnct = props.connect;

  return (

      <div className="flex flex-col items-center justify-center bg-white" style={{height: "100vh"}}>
      <div className="w-80 md:w-80" ><Image className="" alt='eggyboi' src={mainimage}></Image></div>
      <div className="flex w-full items-center flex-col gap-4">
        <span className="text-center italic mt-9 leading-7 font-bold text-2xl">
          Celebrating 5 Years of Madness and Degeneracy
        </span>
        <span className="text-center leading-5 text-lg">
          The Madness Bros NFT Collection was <strong>made by degens for degens.</strong>
          <br /><br />
          There are <strong>only 100 Madness Bros </strong>in total, each one with its very own unique look and choice of drug.
          <br /><br />
          Mint yours today for only <strong>0.05 ETH</strong> to get your very own.
          <br /><br />
            {
                !account && <button className="cursor-pointer shadow-md shadow-slate-600 bg-yellow-500 text-white font-semibold rounded-full px-5 py-1" onClick={cnct}>Connect Wallet</button>      
            }
            {
                account && <Link href="/mint"><button className="cursor-pointer shadow-md shadow-slate-600 bg-sky-900 text-white font-semibold rounded-full px-5 py-1" >Go to Minting Page</button></Link>
            }
          
          <br /><br />
          <i>*Available only on the Rinkeby TestNet</i>
          <br />
          <i>**Rinkeby TestNet Ether can be acquired for free at </i>
        </span>
      </div>
    </div>

  
  )
}
