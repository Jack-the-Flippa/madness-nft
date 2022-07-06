//SPDX-License-Identifier: MIT

pragma solidity >=0.7.0<0.9.0;

import "./lib/ERC721Enumerable.sol";
import "./lib/Ownable.sol";
import "./lib/SafeMath.sol";

contract MadnessBros is ERC721Enumerable, Ownable{
    using SafeMath for uint256;
    using Address for address;
    using Strings for uint256;

    string public baseURI;
    uint256 public constant NFTPrice = 50000000000000000;//500000000000000000; // 0.05 ETH
    uint public constant maxNFTPurchase = 3;
    uint256 public MAX_NFT;
    mapping(address => uint256) public ownedNfts;

    bool public saleIsActive = false;

    constructor(string memory name, string memory symbol, uint256 maxNFTSupply) ERC721(name, symbol){
        MAX_NFT = maxNFTSupply;
    }

    function withdraw() public onlyOwner { 
        payable(msg.sender).transfer(address(this).balance);
    }

    function reserveNFT() public onlyOwner {
        uint supply = totalSupply();
        uint i;
        for (i = 0; i < 5; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    function setBaseURI(string memory _baseUri) public onlyOwner {
        baseURI = _baseUri;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function mintNFT(uint numberOfTokens) public payable{
        require(saleIsActive, "Sale must be active to mint NFT");
        require(numberOfTokens <= maxNFTPurchase, "Maximum of 3 NFTs per person");
        require(totalSupply().add(numberOfTokens) <= MAX_NFT, "Your Purchase would exceed max total supply");
        require(NFTPrice.mul(numberOfTokens) <= msg.value, "Not enough ETH sent");
        require(ownedNfts[msg.sender] + numberOfTokens <= 3, "Maximum of 3 NFTs per person");

        for(uint i = 0; i < numberOfTokens; i++) {
            uint mintIndex = totalSupply();
            if (totalSupply() < MAX_NFT) {
                _safeMint(msg.sender, mintIndex);
                ownedNfts[msg.sender]++;
            }
        }
    }

  
   
}