import React from 'react'
import { inEth, mint, redeem } from 'utils/contract'
import { useSigner } from 'wagmi'
import OperationForm from './OperationForm'

interface Props {
  tick: {
    id: string
    limit: number
    available: number
    rate: number
    raw: any
  }
  pool: {
    currencyToken: {
      symbol: string
    }
  }
}

const Tick: React.FC<Props> = ({ tick, pool }) => {
  const { data: signer } = useSigner()

  return (
    <button className="outline-gray-outline hover:shadow-small hover:outline-purple-secondary relative flex w-64 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-xl bg-white p-3 outline outline-1 hover:outline-2">
      <div className="bg-gray-background mb-2 flex w-full flex-col overflow-hidden rounded-lg px-3">
        <div className="my-2 flex w-full justify-between">
          <div className="flex flex-col text-start">
            <span className="text-purple-primary text-2xl font-medium">{tick.rate}%</span>
            <span className="text-text-secondary text-xs">Current APR</span>
          </div>
          <div className="border-blue-primary text-blue-primary bg-blue-secondary flex h-5 w-11 justify-center rounded-md border">
            <p className="my-auto text-xs">30d</p>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <p className="text-text-secondary text-sm">Loan Limit</p>
        <p className="text-text-primary text-sm">
          {inEth(tick.limit)} {pool.currencyToken.symbol}
        </p>
      </div>
      <div className="flex w-full justify-between">
        <p className="text-text-secondary text-sm">Deposits</p>
        <p className="text-text-primary text-sm">
          {inEth(tick.available)} {pool.currencyToken.symbol}
        </p>
      </div>
      <div className="flex w-full justify-between">
        <p className="text-text-secondary text-sm">Mint</p>
        <OperationForm buttonText="Mint" submit={amount => mint(signer, tick.raw, amount, 0)} />
      </div>
      <div className="flex w-full justify-between">
        <p className="text-text-secondary text-sm">Redeem</p>
        <OperationForm buttonText="Redeem" submit={amount => redeem(signer, tick.raw, amount)} />
      </div>
    </button>
  )
}

export default Tick
