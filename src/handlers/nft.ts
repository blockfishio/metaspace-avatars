import {
 
    Transfer
  } from "../entities/azuki/Azuki"
  import {
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
    // else {
    //   let oldNFT = NFT.load(id)
    // }
  
    // if (category == categories.BOARDINGPASS) {
    //   let boardingpass: Boardingpass
    //   if (isMint(event)) {
    //     nft.subcategory = subcategory
    //     boardingpass = buildBoardingpassFromNFT(nft)
    //     nft.boardingpass = id
    //     nft.image = getBoardingpassImage(boardingpass)
    //     nft.thumbnail = getBoardingpassThumbnail(boardingpass)
    //     nft.searchText = id
    //     nft.name = getBoardingpassName(boardingpass)
    //   } else {
    //     boardingpass = new Boardingpass(nft.id)
    //     boardingpass.owner = nft.owner
    //   }
    //   boardingpass.save()
    // }
    // else if (category == categories.LAND) {
    //   let land: Land
    //   if (isMint(event)) {
    //     nft.subcategory = subcategory
    //     land = buildLandFromNFT(nft)
    //     nft.land = id
    //     nft.searchIsLand = true
    //     nft.image = getLandImage(land)
    //     nft.thumbnail = getLandImage(land)
    //     nft.searchText = getLandSearchText(land)
    //     nft.name = getLandName(land)
    //   } else {
    //     land = new Land(nft.id)
    //     land.owner = nft.owner
    //   }
    //   land.save()
    // }
    // else if (category == categories.BUILDING) {
    //   let building: Building
    //   if (isMint(event)) {
    //     nft.subcategory = subcategory
    //     building = buildBuildingFromNFT(nft)
    //     building.rarity = BigInt.fromI32(event.params.rarity)
    //     nft.building = id
    //     nft.image = getBuildingImage(building)
    //     nft.thumbnail = getBuildingImage(building)
    //     nft.name = getBuildingName(building)
    //     nft.searchText = toLowerCase(nft.name)
  
    //   } else {
    //     building = new Building(nft.id)
    //     building.owner = nft.owner
    //   }
    //   building.save()
    // }
    // else if (category == categories.TOWER) {
    //   let tower: Tower
    //   if (isMint(event)) {
    //     nft.subcategory = subcategory
    //     tower = buildTowerFromNFT(nft)
    //     tower.rarity = BigInt.fromI32(event.params.rarity)
    //     nft.tower = id
    //     nft.image = getTowerImage(tower)
    //     nft.thumbnail = getTowerThumbnail(tower)
    //     nft.name = getTowerName(tower)
    //     nft.searchText = toLowerCase(nft.name)
    //   } else {
    //     tower = new Tower(nft.id)
    //     tower.owner = nft.owner
    //   }
    //   tower.save()
    // }
    // else if (category == categories.TRAP) {
    //   let trap: Trap
    //   if (isMint(event)) {
    //     nft.subcategory = subcategory
    //     trap = buildTrapFromNFT(nft)
    //     trap.rarity = BigInt.fromI32(event.params.rarity)
    //     nft.trap = id
    //     nft.image = getTrapImage(trap)
    //     nft.thumbnail = getTrapThumbnail(trap)
    //     nft.name = getTrapName(trap)
    //     nft.searchText = toLowerCase(nft.name)
    //   } else {
    //     trap = new Trap(nft.id)
    //     trap.owner = nft.owner
    //   }
    //   trap.save()
    // }
    // else {
    //   if (isMint(event)) {
    //     nft.subcategory = subcategory
    //   }
    // }
  
  
    createAccount(event.params.to)
  
    nft.save()
  }
  