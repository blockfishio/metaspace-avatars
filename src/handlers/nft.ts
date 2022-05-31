import { Asset, Azuki } from "../data/addresses"
import {
 
    Transfer
  } from "../entities/azuki/Azuki"
  import {
      Avatar,
    NFT,
    Order,
    
  } from '../entities/schema'
import {
    isMint,
    getNFTId,
    getTokenURI,
    clearNFTOrderProperties,
  } from '../modules/nft'
import { createAccount } from '../modules/wallet'

export function handleTransfer(event: Transfer): void {
    if (event.params.tokenId.toString() == '') {
      return
    }
  
    let contractAddress = event.address.toHexString()
    let id = contractAddress+'_'+ event.params.tokenId.toString()
  
    let nft = new NFT(id)
  
    nft.tokenId = event.params.tokenId
    nft.owner = event.params.to.toHex()
    nft.contractAddress = event.address
    nft.updatedAt = event.block.timestamp
    nft.tokenURI = getTokenURI(event)
  
    if (isMint(event)) {
      nft.createdAt = event.block.timestamp
  
      nft.searchText = ''
    } 

    
  
    createAccount(event.params.to)
  
    nft.save()

    if (contractAddress.toLowerCase()==Azuki.toLowerCase()){
        let avatar=new Avatar(id)
        avatar.tokenId=event.params.tokenId
        avatar.owner=event.params.to.toHex()
        avatar.contractAddress=event.address
        avatar.updatedAt=event.block.timestamp
        avatar.tokenURI=getTokenURI(event)
        if (isMint(event)) {
            avatar.createdAt = event.block.timestamp
          } 
        avatar.save()

    }


  }
  