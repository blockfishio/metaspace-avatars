import { spawn, SpawnOptions } from 'child_process'

enum Network {
  MAINNET = 'mainnet',
  ROPSTEN = 'ropsten',
  BSC = 'bsc',
  BSCTEST = 'bsctest',
  RINKEBY = 'rinkeby'
}

const graphByNetwork: Record<Network, string> = {
  [Network.MAINNET]: process.env.GRAPH_NAME || 'blockfishio/marketplace',
  [Network.ROPSTEN]:
    process.env.GRAPH_NAME || 'silver211/marketplace-ropsten',
  [Network.BSC]:
    process.env.GRAPH_NAME || 'blockfishio/marketplacebsc',
  [Network.BSCTEST]:
    process.env.GRAPH_NAME || 'blockfishio/marketplacebsctest',
  [Network.RINKEBY]:
    process.env.GRAPH_NAME || 'blockfishio/marketplacerinkeby',

}

const tokenByNetwork: Record<Network, string> = {
  [Network.MAINNET]: process.env.ACCESS_TOKEN || '49cd415d97694506a87b985088eb99e6',
  [Network.ROPSTEN]:
    process.env.ACCESS_TOKEN || '6ecf0f5a3f864fed98cda2ff9a7b4226',
  [Network.BSC]:
    process.env.ACCESS_TOKEN || '49cd415d97694506a87b985088eb99e6',
  [Network.BSCTEST]:
    process.env.ACCESS_TOKEN || '49cd415d97694506a87b985088eb99e6',
  [Network.RINKEBY]:
    process.env.ACCESS_TOKEN || '7420fb1822694049b282af57e87c3e63',

}



// TODO: Handle ctrl+C
async function deploy() {
  const network = getNetwork()
  await run(
    `npx`,
    [
      'graph',
      'deploy',
      graphByNetwork[network],
      '--ipfs',
      'https://api.thegraph.com/ipfs/',
      '--node',
      'https://api.thegraph.com/deploy/',
      '--access-token',
      tokenByNetwork[network],
    ],

    {
      stdio: 'inherit'
    }
  )
}

// ------------------------------------------------------------------
// Bash -------------------------------------------------------------

async function run(command: string, args: string[], options?: SpawnOptions) {
  return new Promise((resolve, reject) => {
    const program = spawn(command, args, options)

    program.on('close', code =>
      code === 0 ? resolve() : reject(`Error: ${code}`)
    )
  })
}

// ------------------------------------------------------------------
// Args -------------------------------------------------------------

function getNetwork() {
  let network: Network
  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '--network') {
      network = process.argv[i + 1] as Network
      break
    }
  }

  if (!network || !Object.values(Network).includes(network)) {
    throw new Error(
      "Supply a valid network using --network. Use `npm run deploy -- --network mainnet` if you're using npm"
    )
  }
  return network
}

deploy().then(() => console.log('All done'))
