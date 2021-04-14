import React from 'react'
import Layout from '../components/Layout'
import DelegateValidatorsTable from '../components/DelegateValidatorsTable'
import { useWalletsContext } from '../contexts/WalletsContext'
import cryptocurrencies from '../misc/cryptocurrencies'

const Delegate: React.FC = () => {
  const { wallets, accounts } = useWalletsContext()
  // not sure how user switch account, fix it later
  const crypto = cryptocurrencies[accounts[0].crypto]
  const fakeValidators = [
    {
      image:
        'https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg',
      name: 'Forbole1',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.1,
      status: 'unjail',
      isActive: false,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z1',
    },
    {
      image:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
      name: 'Forbole2',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.2,
      status: 'tombstone',
      isActive: false,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z2',
    },
    {
      image:
        'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
      name: 'Forbole3',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.11,
      status: 'candidate',
      isActive: true,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z3',
    },
    {
      image:
        'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
      name: 'Forbole4',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.1,
      status: 'candidate',
      isActive: true,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z4',
    },
    {
      image:
        'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
      name: 'Forbole5',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.1,
      status: 'candidate',
      isActive: true,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z5',
    },
    {
      image:
        'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
      name: 'Forbole6',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.1,
      status: 'candidate',
      isActive: true,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z6',
    },
    {
      image:
        'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
      name: 'Forbole7',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.1,
      status: 'candidate',
      isActive: true,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z7',
    },
    {
      image:
        'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
      name: 'Forbole8',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.1,
      status: 'candidate',
      isActive: true,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z8',
    },
    {
      image:
        'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
      name: 'Forbole9',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.1,
      status: 'candidate',
      isActive: true,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z9',
    },
    {
      image:
        'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
      name: 'Forbole10',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.1,
      status: 'candidate',
      isActive: true,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs610',
    },
    {
      image:
        'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
      name: 'Forbole11',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.1,
      status: 'candidate',
      isActive: true,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs611',
    },
    {
      image:
        'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
      name: 'Forbole12',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.1,
      status: 'candidate',
      isActive: true,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs612',
    },
    {
      image:
        'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
      name: 'Forbole13',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.1,
      status: 'candidate',
      isActive: true,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z13',
    },
    {
      image:
        'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
      name: 'Forbole14',
      location: {
        name: 'Country/Area',
        image:
          'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
      },
      commission: 0.015,
      vpRatios: 0.05,
      delegatedAmount: 11887597,
      amtRatio: 0.05,
      reward: 122321,
      selfRatio: 0.1,
      status: 'candidate',
      isActive: true,
      address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs614',
    },
  ]
  return (
    <Layout passwordRequired activeItem="/delegate">
      <DelegateValidatorsTable account={accounts[0]} validators={fakeValidators} crypto />
    </Layout>
  )
}

export default Delegate
