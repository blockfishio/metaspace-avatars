# Blockchain indexer

It uses [thegraph](https://thegraph.com)

**Run**

```bash
npm run build-data -- --network mainnet

npm run codegen
npm run build

npm run deploy -- --network mainnet
```

checkout the docs https://thegraph.com/docs/quick-start

#### Get first 5 NFTs

Owner's `id` is the owner's Ethereum address.
Category could be: `parcel`, `estate`, `ens`, `wearable`

```typescript
{
  nfts(first: 5) {
    id
    tokenId
    contractAddress
    owner {
      id
    }
    orders{
      id
    }
  }
}
```

#### Get first 5 Collection NFTs Orders

```typescript
{
  orders(first: 5) {
     id
    tokenIds
    paymentToken
    nftAddress
    owner
    buyer
}
```

