import { useQuery } from 'react-query'

const GET_POOL_QUERY = `
  query GetPool($id: ID!) {
    pool(id: $id) {
      id
      totalValueLocked
      totalValueAvailable
      totalValueUsed

      ticks {
        id
        limit
        duration
        rate
        accrualRate
        available
        raw
        }
      

      collateralToken {
        id
        name
      }
    
      currencyToken {
        id
        name
        symbol
      }
  }
}
`

const GRAPHQL_URL = 'https://api.studio.thegraph.com/proxy/31830/metastreet-v2-sepolia/version/latest'
const POOL_ID = '0xaCCAD35bB4EcbFf5614423e598d97b968657cf44'

export const getPools = () =>
  useQuery('pool', async () => {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GET_POOL_QUERY, variables: { id: POOL_ID } }),
    })
    return (await response.json()).data
  })
