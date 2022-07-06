import { ethers } from 'ethers';
import React, {useState, useContext} from 'react'
import MadnessBros from "./artifacts/contracts/MadnessBros.sol/MadnessBros.json"
import { AccountContext } from '../context';
const contractAddr = "0xC50f061Be6Be625bF20C3DcF5C135530713268F2"

function Mint(props) {

    const [myValue, setMyValue] = useState("0")
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const account = useContext(AccountContext);


   let onFileChange = (event) => {
        setMyValue(event.target.value);
   }

   async function mintNft(event){
        
        event.preventDefault();

        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddr, MadnessBros.abi, signer)
            let cost = (myValue*0.05).toString();
            const transaction = await contract.mintNFT(myValue, {value: ethers.utils.parseEther(cost)})
            await transaction.wait()
        }
   }

    


    

        return (
            <div className="flex flex-col items-center gap-7 justify-center -mt-20 bg-white" style={{height: "100vh"}}>
                <span className="font-bold text-center text-4xl">Mint Madness Bro NFT</span>
                <div className="flex flex-col max-w-3xl gap-4">
                    <span className="font-medium text-justify text-xl md:mb-0 text-black">
                        Input the number of Madness Bros NFTs that you would like to mint and hit the Mint button.<br/>
                        Dont forget to make sure that you have connected your wallet.
                        <br/><br/>
                        <i>*Maximum of 3 NFTs per address</i>
                    </span>
                </div>

                <form
                 onSubmit={mintNft}
                 >
                    <input type="input" className="border-2 mr-4 border-sky-900" name="myFile" onChange={onFileChange} placeholder=' Number of NFTs' />
                    <input className="bg-sky-900 text-white px-10 text-lg font-semibold rounded-full cursor-pointer shadow-md shadow-slate-600 hover:bg-yellow-500" type="submit" value="Mint" />
                </form>
               
            </div>
        )
    
}

export default Mint;