import { Breadcrumbs, Link as MLink } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import AccountAvatar from '../../components/AccountAvatar'
import Layout from '../../components/Layout'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import Proposal from '../../components/Proposal'

const Account: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { accounts } = useWalletsContext()
  const account = accounts.find((a) => a.address === router.query.address)
  const { no } = router.query
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]

  return (
    <Layout
      passwordRequired
      activeItem="/proposals"
      HeaderLeftComponent={
        account ? (
          <Breadcrumbs>
            <Link href="/wallets" passHref>
              <MLink color="textPrimary">{t('wallet manage')}</MLink>
            </Link>
            <AccountAvatar account={account} hideAddress size="small" />
          </Breadcrumbs>
        ) : null
      }
    >
      <Proposal
        // Vote
        proposal={{
          no: '01',
          proposer: {
            name: 'forbole',
            image:
              'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
            address: 'address',
          },
          title: 'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
          content:
            'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
          detail:
            'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about the impact that validators charging 0% commission has on the Cosmos Hub, particularly with respect to the decentralization of the Cosmos Hub and the sustainability for validator operations.\n\nDiscussion around this topic has taken place in many places including numerous threads on the Cosmos Forum, public Telegram channels, and in-person meetups. Because this has been one of the primary discussion points in off-chain Cosmos governance discussions, we believe it is important to get a signal on the matter from the on-chain governance process of the Cosmos Hub.\n\nThere have been past discussions on the Cosmos Forum about placing an in-protocol restriction on validators from charging 0% commission.',
          votingTime: 'Voting Time: 12 Dec 2019 16:22  to 26 Dec 2019, 16:22 UTC',
          duration: '(in 14 days)',
          isActive: true,
          tag: 'vote',
          type: 'text proposal',
        }}
        crypto={crypto}
        // Vote Result
        // proposal={{
        //   no: '01',
        //   proposer: {
        //     name: 'forbole',
        //     image:
        //       'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //     address: 'address',
        //   },
        //   title: 'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
        //   content:
        //     'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
        //   detail:
        //     'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about the impact that validators charging 0% commission has on the Cosmos Hub, particularly with respect to the decentralization of the Cosmos Hub and the sustainability for validator operations.\n\nDiscussion around this topic has taken place in many places including numerous threads on the Cosmos Forum, public Telegram channels, and in-person meetups. Because this has been one of the primary discussion points in off-chain Cosmos governance discussions, we believe it is important to get a signal on the matter from the on-chain governance process of the Cosmos Hub.\n\nThere have been past discussions on the Cosmos Forum about placing an in-protocol restriction on validators from charging 0% commission.',
        //   votingTime: 'Voting Time: 12 Dec 2019 16:22  to 26 Dec 2019, 16:22 UTC',
        //   duration: '(in 14 days)',
        //   isActive: false,
        //   tag: 'passed',
        //   type: 'text proposal',
        //   depositDetails: [
        //     {
        //       depositor: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //         address: 'address',
        //       },
        //       amount: 100000,
        //       time: '10 Jan 2020, 13:00:23',
        //     },
        //     {
        //       depositor: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //         address: 'address',
        //       },
        //       amount: 100000,
        //       time: '10 Jan 2020, 13:00:23',
        //     },
        //   ],
        //   voteDetails: [
        //     {
        //       voter: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //       },
        //       votingPower: 10,
        //       votingPowerPercentage: 0.1,
        //       votingPowerOverride: 0.1,
        //       answer: 'yes',
        //     },
        //     {
        //       voter: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //       },
        //       votingPower: 10,
        //       votingPowerPercentage: 0.1,
        //       votingPowerOverride: 0.1,
        //       answer: 'no',
        //     },
        //     {
        //       voter: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //       },
        //       votingPower: 10,
        //       votingPowerPercentage: 0.1,
        //       votingPowerOverride: 0.1,
        //       answer: 'veto',
        //     },
        //     {
        //       voter: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //       },
        //       votingPower: 10,
        //       votingPowerPercentage: 0.1,
        //       votingPowerOverride: 0.1,
        //       answer: 'abstain',
        //     },
        //     {
        //       voter: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //       },
        //       votingPower: 10,
        //       votingPowerPercentage: 0.1,
        //       votingPowerOverride: 0.1,
        //       answer: 'yes',
        //     },
        //     {
        //       voter: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //       },
        //       votingPower: 10,
        //       votingPowerPercentage: 0.1,
        //       votingPowerOverride: 0.1,
        //       answer: 'no',
        //     },
        //     {
        //       voter: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //       },
        //       votingPower: 10,
        //       votingPowerPercentage: 0.1,
        //       votingPowerOverride: 0.1,
        //       answer: 'veto',
        //     },
        //     {
        //       voter: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //       },
        //       votingPower: 10,
        //       votingPowerPercentage: 0.1,
        //       votingPowerOverride: 0.1,
        //       answer: 'abstain',
        //     },
        //     {
        //       voter: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //       },
        //       votingPower: 10,
        //       votingPowerPercentage: 0.1,
        //       votingPowerOverride: 0.1,
        //       answer: 'yes',
        //     },
        //     {
        //       voter: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //       },
        //       votingPower: 10,
        //       votingPowerPercentage: 0.1,
        //       votingPowerOverride: 0.1,
        //       answer: 'no',
        //     },
        //     {
        //       voter: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //       },
        //       votingPower: 10,
        //       votingPowerPercentage: 0.1,
        //       votingPowerOverride: 0.1,
        //       answer: 'veto',
        //     },
        //     {
        //       voter: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //       },
        //       votingPower: 10,
        //       votingPowerPercentage: 0.1,
        //       votingPowerOverride: 0.1,
        //       answer: 'abstain',
        //     },
        //   ],
        // }}
        // crypto={crypto}
        // voteSummary={{
        //   percentage: 0.438,
        //   amount: 200000,
        //   description: '(~81M of ~186M ATOM)',
        //   colors: ['#28C989', '#1C86FC', '#FD248C', '#FD7522'],
        //   data: [
        //     {
        //       title: 'yes',
        //       percentage: 0.2,
        //       value: 2504158159222,
        //     },
        //     {
        //       title: 'no',
        //       percentage: 0.5,
        //       value: 2504158159222,
        //     },
        //     {
        //       title: 'veto',
        //       percentage: 0.1,
        //       value: 58159222000,
        //     },
        //     {
        //       title: 'abstain',
        //       percentage: 0.2,
        //       value: 3504158159222,
        //     },
        //   ],
        // }}
        // Deposit
        // proposal={{
        //   no: '01',
        //   proposer: {
        //     name: 'forbole',
        //     image:
        //       'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //     address: 'address',
        //   },
        //   title: 'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
        //   content:
        //     'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
        //   detail:
        //     'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about the impact that validators charging 0% commission has on the Cosmos Hub, particularly with respect to the decentralization of the Cosmos Hub and the sustainability for validator operations.\n\nDiscussion around this topic has taken place in many places including numerous threads on the Cosmos Forum, public Telegram channels, and in-person meetups. Because this has been one of the primary discussion points in off-chain Cosmos governance discussions, we believe it is important to get a signal on the matter from the on-chain governance process of the Cosmos Hub.\n\nThere have been past discussions on the Cosmos Forum about placing an in-protocol restriction on validators from charging 0% commission.',
        //   votingTime: 'Voting Time: 12 Dec 2019 16:22  to 26 Dec 2019, 16:22 UTC',
        //   duration: '(in 14 days)',
        //   isActive: true,
        //   tag: 'deposit',
        //   type: 'text proposal',
        //   depositDetails: [
        //     {
        //       depositor: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //         address: 'address',
        //       },
        //       amount: 100000,
        //       time: '10 Jan 2020, 13:00:23',
        //     },
        //     {
        //       depositor: {
        //         name: 'forbole',
        //         image:
        //           'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
        //         address: 'address',
        //       },
        //       amount: 100000,
        //       time: '10 Jan 2020, 13:00:23',
        //     },
        //   ],
        // }}
        // crypto={crypto}
      />
    </Layout>
  )
}

export default Account
