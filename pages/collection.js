import {ethers} from 'ethers'
import {useEffect, useState, useContext} from 'react'
import Web3Modal from 'web3modal'
import Image from 'next/image';
import { AccountContext } from '../context';
import { contractAddress } from '../config'
import MadnessBros from "./artifacts/contracts/MadnessBros.sol/MadnessBros.json"

export default function Collection() {
    const [nfts, setNFT] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    const account = useContext(AccountContext);
    const ipfs = "Qma9yhZPEqdw8fdZhxFediDW6Ab9oArKPAzVjEVP4uwkP8"

    useEffect(() => {

        loadNfts();
    }, [])

    async function loadNfts() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const contract = new ethers.Contract(contractAddress, MadnessBros.abi, signer)
        const userBalance = 3
        const userArray = []
        for (let i = 0; i < userBalance; i++){userArray.push(i)}

        const items = await Promise.all(userArray.map(async i => {
            let tokenId = await contract.tokenOfOwnerByIndex(account, i)
            let data = await fetch(`https://cf-ipfs.com/ipfs/${ipfs}/${tokenId.toString()}`)
            let json = await data.json()
            let item = {
                tokenId: tokenId.toNumber(),
                tokenImage: json.image,
                tokenMetaData: json.attributes,
            }
            return item
        }))
        console.log(items)
        setNFT(items)
        setLoadingState('loaded') 
    }

    if (loadingState === 'loaded' && !nfts.length) {
        return (
            <h1>You Have No Madness Bros NFTs</h1>
        )
    }

    return (
        <div className="flex flex-col mt-20 items-center gap-7 justify-center bg-white" style={{height: "100vh"}}>
           
           
        <span className="font-bold text-center text-4xl">Your Madness Bro NFTs</span>
                <div className="flex flex-col max-w-3xl gap-4">
                    <span className="font-medium text-justify text-xl md:mb-0 text-black">
                        Here is all the Madness Bros in your collection!<br/>
                    </span>
                </div>
                
                <div className='flex w-full justify-center flex-1'>
                    
                    
                <div className='w-full flex max-w-5xl mt-8 flex-1 gap-3 justify-center flex-wrap'>
            {nfts.map((nft)=>{             
                        return (
                            <div key={nft.tokenId} className='w-56'>
                            <div className='rounded-lg bg-white flex flex-col shadow-md'>
                                <div className='flex py-2 pl-2 items-center justify-between'>
                                    <span className='text-black text-xl text-right'>Madness Bro #{nft.tokenId}</span>
                                </div>    
                                <Image className="max-w-sm w-full" width="100" height="200" alt='eggyboi' src={"https://gateway.pinata.cloud/ipfs/"+nft.tokenImage}></Image>
                                <div className='flex text-black pb-2.5 px-4 py-2 w-full bg-white flex-col'>
                                    <div className='float-left -mb-4'>{nft.tokenMetaData[0].trait_type}<span className='float-right text-right'>{nft.tokenMetaData[0].value}</span></div> 
                                    <br/>
                                    <div className='float-left -mb-4'>{nft.tokenMetaData[1].trait_type}<span className='float-right text-right'>{nft.tokenMetaData[1].value}</span></div> 
                                    <br/>
                                    <div className='float-left -mb-4'>{nft.tokenMetaData[2].trait_type}<span className='float-right text-right'>{nft.tokenMetaData[2].value}</span></div> 
                                    <br/>
                                    <div className='float-left -mb-4'>{nft.tokenMetaData[3].trait_type}<span className='float-right text-right'>{nft.tokenMetaData[3].value}</span></div> 
                                    <br/>
                                    <div className='float-left'>{nft.tokenMetaData[4].trait_type}<span className='float-right text-right'>{nft.tokenMetaData[4].value}</span></div> 
                                </div>
                            </div>
                        </div>
                            
                            
                        )
                       }
                       )}
        </div>
                    
                        
                    
                    
                </div>

                
        </div>
    )

}
