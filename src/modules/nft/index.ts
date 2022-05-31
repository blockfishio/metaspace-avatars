import { log, BigInt } from '@graphprotocol/graph-ts'
import { NFT, Order } from '../../entities/schema'
import { Transfer,Azuki } from '../../entities/azuki/Azuki'
import * as status from '../order/status'
import * as addresses from '../../data/addresses'

export function isMint(event: Transfer): boolean {
  return event.params.from.toHexString() == addresses.Null
}

export function getNFTId(
  category: string,
  contractAddress: string,
  tokenId: string
): string {
  return category + '-' + contractAddress + '-' + tokenId
}

export function getTokenURI(event: Transfer): string {
  let nft = Azuki.bind(event.address)
  let tokenURICallResult = nft.try_tokenURI(event.params.tokenId)

  let tokenURI = ''

  if (tokenURICallResult.reverted) {
    log.warning('tokenURI reverted for tokenID: {} contract: {}', [
      event.params.tokenId.toString(),
      event.address.toHexString()
    ])
  } else {
    tokenURI = tokenURICallResult.value
  }

  return tokenURI
}

export function updateNFTOrderProperties(nft: NFT, order: Order): NFT {
  if (order.status == status.SOLD || order.status == status.CANCELLED) {
    nft.searchOrderStatus = order.status
    nft.searchOrderPrice = order.price
    nft.searchOrderCreatedAt = order.createdAt
    nft.searchOrderExpiresAt=order.updatedAt
    return nft
  } else {
    return nft
  }
}

export function addNFTOrderProperties(nft: NFT, order: Order): NFT {
  nft.searchOrderStatus = order.status
  nft.searchOrderPrice = order.price
  nft.searchOrderCreatedAt = order.createdAt
  nft.searchOrderExpiresAt=order.updatedAt
  return nft
}

export function clearNFTOrderProperties(nft: NFT): NFT {
  nft.searchOrderStatus = null
  nft.searchOrderPrice = null
  nft.searchOrderCreatedAt = null
  nft.searchOrderExpiresAt = null
  return nft
}

// export function cancelActiveOrder(nft: NFT, order:Order): NFT {
//   let oldOrder = Order.load(nft.activeOrder)
//   if (oldOrder != null && oldOrder.status == status.OPEN) {
//     // Here we are setting old orders as cancelled, because the smart contract allows new orders to be created
//     // and they just overwrite them in place. But the subgraph stores all orders ever
//     // you can also overwrite ones that are expired
//     oldOrder.status = status.CANCELLED
//     oldOrder.updatedAt = now
//     oldOrder.save()

//     return true
//   }
//   return false
// }

