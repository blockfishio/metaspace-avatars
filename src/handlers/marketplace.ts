import { BigInt } from "@graphprotocol/graph-ts"
import {
 
    MatchTransaction
  } from "../entities/Marketplace/Marketplace"


  import {
    NFT,
    Order,
    
  } from '../entities/schema'
  import * as status from '../modules/order/status'

export function handleMatchTransaction(event: MatchTransaction): void {
    let contractAddress = event.params.contractAddress
    const tokenId=event.params.tokenId
    let nftId = contractAddress.toHexString()+'_'+tokenId.toString()

  
    let nft = NFT.load(nftId)
    if (nft != null)  {
    let orderId = event.transaction.hash.toHexString()
    let order=Order.load(orderId)
    if (order==null){

    order = new Order(orderId)
    order.status = status.SOLD
    order.nfts=[nftId]
    order.nftAddress = contractAddress
    order.paymentToken=event.params.paymentToken
    order.tokenIds = [tokenId]
    order.txHash = event.transaction.hash
    order.owner = event.params.seller
    order.blockNumber = event.block.number
    order.createdAt = event.block.timestamp
    order.updatedAt = event.block.timestamp
    }
    else{
      let tmp_0=order.tokenIds
      tmp_0!.push(tokenId)
      order.tokenIds=tmp_0
      let tmp_1=order.nfts
      tmp_1!.push(nftId)
      order.nfts=tmp_1
    }
    order.price=event.params.price
    order.save()    
    if (nft.orders!=null){
      let tmp_2=nft.orders
      tmp_2!.push(orderId)
      nft.orders=tmp_2
    }
    else{
      nft.orders=[orderId]
    }
    nft.owner = event.params.buyer.toHex()
      nft.updatedAt = event.block.timestamp
      nft.save()
  }
  
    
  
  

  

  }
  