import { ethers } from 'ethers'

// Your contract address
const contractAddress = '0x19570948C2E7694f06606c9F1187b1D7eaBDA2Dd'

const contractABI = [
  {
    inputs: [
      {
        internalType: 'uint128',
        name: 'tick',
        type: 'uint128',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minShares',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint128',
        name: 'tick',
        type: 'uint128',
      },
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    name: 'redeem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const mint = async (signer, tick, amount, minShares) => {
  if (!signer) return

  // Create a new instance of the contract
  const contract = new ethers.Contract(contractAddress, contractABI, signer)

  // Call the mint function
  try {
    const tx = await contract.deposit(tick, amount, minShares)
    await tx.wait()
    console.log('Minting successful')
  } catch (error) {
    console.error('Minting failed', error)
  }
}

export const redeem = async (signer, tick, shares) => {
  if (!signer) return

  // Create a new instance of the contract
  const contract = new ethers.Contract(contractAddress, contractABI, signer)

  // Call the redeem function
  try {
    const tx = await contract.redeem(tick, shares)
    await tx.wait()
    console.log('Redeem successful')
  } catch (error) {
    console.error('Redeem failed', error)
  }
}

export const inEth = wei => Number(ethers.utils.formatEther(wei)).toFixed(2)
