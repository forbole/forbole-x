import React from 'react'
import renderer from 'react-test-renderer'
import { ApolloProvider } from '@apollo/client'
import { createMockClient, MockApolloClient } from 'mock-apollo-client'
import { GetAccountBalanceQuery } from '../../../graphql/types'
import { wait } from '../../utils'
import AccountCard from '../../../components/AccountCard'

let component
let mockClient: MockApolloClient

const accountBalanceMockData = jest.fn().mockResolvedValue({
  data: {
    account: [
      {
        address: 'desmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
        available: [
          {
            coins: [
              {
                denom: 'udaric',
                amount: '9000155',
              },
            ],
          },
        ],
        delegations: [
          {
            amount: {
              denom: 'udaric',
              amount: '990000',
            },
          },
        ],
        unbonding: [],
        rewards: [
          {
            amount: [],
            withdraw_address: 'desmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
          },
        ],
      },
    ],
    validator: [],
  },
})

const mockAccount = {
  walletId: 'f149b58827224d515a0025f991b240749b4e7927f47c55c7aee0da2d953e9312',
  address: 'desmos1qpm8wutycha3ncd0u3w9g42v89xnnfs6f9sg8d',
  createdAt: 1614826912972,
  crypto: 'DSM',
  fav: false,
  index: 0,
  name: 'DSM',
  displayName: '',
  rpDisplayName: '',
  id: '',
}

describe('AccountCard', () => {
  beforeEach(async () => {
    mockClient = createMockClient()
    mockClient.setRequestHandler(GetAccountBalanceQuery, accountBalanceMockData)

    const mockFormatExpression = {
      format: (value) => value.toString(),
    }
    let mockNumberFormatFunction = Intl.NumberFormat = jest.fn()
      .mockImplementation(() => mockFormatExpression);

    renderer.act(() => {
      component = renderer.create(
        <ApolloProvider client={mockClient}>
          <AccountCard account={mockAccount} />
        </ApolloProvider>
      )
    })
    await wait()
  })

  it('it renders', async () => {
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(accountBalanceMockData).toHaveBeenCalled()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
