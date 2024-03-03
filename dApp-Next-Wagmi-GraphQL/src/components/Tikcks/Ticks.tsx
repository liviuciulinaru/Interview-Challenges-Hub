import { inEth } from 'utils/contract'
import { getPools } from 'utils/query'
import Tick from './Tick'

function Ticks() {
  const { isLoading, error, data } = getPools()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {(error as any).message}</p>

  return (
    <div>
      <h2>Pool Details</h2>
      {data?.pool && <PoolDisplayComponent pool={data?.pool} />}
    </div>
  )
}

const PoolDisplayComponent = ({ pool }) => {
  if (!pool) return null

  console.log(pool)
  return (
    <div className="flex">
      <div className="flex flex-grow flex-col overflow-hidden py-6">
        <div className="w-full p-4 lg:px-8">
          <div className="mb-4 flex items-center">
            <div className="flex flex-grow items-center">
              <div className="relative mr-3 h-10 w-10 flex-shrink-0">
                <div className="bg-cardBackgroundColor relative flex h-full w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
                  <img
                    className="h-full w-full object-cover opacity-100 transition-opacity duration-1000"
                    src="https://img.reservoir.tools/images/v2/mainnet/z9JRSpLYGu7%2BCZoKWtAuABFuoqH0Xw8RwP3XGRDltop1fhPM8HEzGHYJJoP7nCutORfRiuoOYI9cOjaDwPMUnvsZ4I%2FEcSV51ZEMCeIgkaUd3XYnng9OiV%2Ben4SDHOP0M1y60ls%2B6jLxzTNhg5LRcw%3D%3D?width=250"
                    alt=""
                  />
                  <img
                    src="/assets/shared-ui/collection-images/placeholder/placeholder.png"
                    alt=""
                    className="pointer-events-none absolute top-0 left-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000"
                  />
                </div>
                <span
                  className="absolute bottom-0 right-0 z-10 flex h-1/2 w-1/2 items-center justify-center overflow-hidden rounded-full"
                  role="img"
                  title="Dai Stablecoin"
                >
                  <img
                    src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
                    alt=""
                    className="absolute inset-0 h-full w-full opacity-100"
                  />
                </span>
              </div>
              <div className="flex flex-grow flex-col">
                <div className="flex">
                  <span className="w-0 flex-grow truncate">
                    {pool.collateralToken.name}
                    <span className="text-text-secondary">/{pool.currencyToken.symbol}</span>
                  </span>
                </div>
                <div className="flex">
                  <span className="text-text-secondary w-0 flex-grow truncate text-xs">
                    TVL: {inEth(pool.totalValueLocked)} {pool.currencyToken.symbol}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-x-4 overflow-x-auto p-1">
            {pool.ticks.map(tick => (
              <Tick tick={tick} pool={pool} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticks
