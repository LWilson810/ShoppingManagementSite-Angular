# REB Token Sale

## Table of Contents

* [Table of Contents](#table-of-contents)
* [Overview](#overview)
* [Implementation Details](#implementation-details)
* [Development](#development)

## Overview

The REBGLO's smart contracts allow investors to buy REB tokens during the its crowdsale event.

## Implementation Details

REBToken.sol

This is the token contract and specifies the token name, symbol and decimals. Upon token deployment the token is paused for transfers. This means that the owner is able to create/ mint tokens for not to transfer from user to user. Note: token contract ownership needs to be given to crowdsale contract so it is allowed to mint REB token during crowdsale.

There is a function to check user's balance tier. It is called checkBalanceTier. By passing an Ethereum address to this function it returns a string with the address balance tier such as Gold, Platinum, etc.

REBCrowdsale.sol

It has the necessary specifications for the crowdsale to run.
The total token supply is 10 Billion or 10,000,000,000.

The percentage distribution is the following:

* 58% public
* 1% bounty program
* 1% airdrop
* 15% advisors (vests in 3 months)
* 25% team (vests in 12 months)

IMPORTANT: ownership needs to be transferred to crowdsale so as it is allowed to mint tokens.

functionalities:

1 - Allows for the distribution of tokens via airdrop. It needs to be triggered by crowdsale contract owner.

2 - Allows owner to change rate of crowdsale at any time.

3 - Permits minting of customized number of tokens by owner at any moment during crowdsale via the `mintTokensFor()`.

4 - there is a buyTokens() function which handle the logic of the public presale + crowdsale. If user sends ETH directly to contract this is the function that will be invoked.

5 - Allows the entering of Ethereum address for the team and advisors token vesting smart contracts. They must be entered before the finalization of the crowdsale.

6 - mint tokens for bounty, team and advisors at crowdsale's end. If there is any remaining tokens from the 10 billion that was not minted during the crowdsale, it is minted at finalization event and they go to the multi-sig wallet.

7 - There is an openingTime, closingTime and presaleEndTime for the crowdsale. These are timestamps and need to be set upon crowdsale deployment.

8 - crowdsale can be finalized either when the softCap is reached ( 800 000 000 million REb ) or when it is after the closingTime.

9 - In case there is a remainder amount in the crowdsale contract to manage (this may happen if the last purchaser participating in the crowdsale sends more wei than needed to finish the purchase of all left over tokens), then the remainder amount will be recorded on the public variable `remainderAmount` as well as who the address it should be sent to after the crowdsale is over `remainderPurchaser`.

10 - allows for airdrop through the `triggerAirDrop` function, mints tokens for airdrop up to the airdrop share cap of 100 M tokens.

LockTokenAllocation.sol

It deals with the vesting of REB tokens for both team and advisors. Two of these contracts must be deployed; one for team and the other for advisors. Pass the params of the time vesting according to the spec, that is to say:

* advisors vests in 3 months
* team vests in 12 months

## Deployment

These are the steps for a full deployment of the smart contracts and its running:

1. Deploy REB token contract.

2. Deploy the REB crowdsale smart contract passing all the necessary parameters found in the REBCrowdsale constructor function.

3. Pass ownership of REBToken contract to REB crowd sale contract. This is important because it allows only the crowdsale contract to mint tokens.

4. Every investor that participates in the crowdsale needs to be whitelisted. Therefore, the crowdsale owner needs to whitelist these users by passing their Ethereum external account addresses to the function `addToWhitelist` or `addManyToWhitelist`.

5. When the crowdsale is finished (either by time or when all tokens are sold), the function `finalize()` must be called so the crowdsale finalizes.

## Development

**Dependencies**

* `node@9.5.x`
* `truffle@^4.1.x`
* `ganache-cli@^6.0.x`
* `zeppelin-solidity@1.7.X`

## Setting Up

* Clone this repository.

* Install all [system dependencies](#development).

  * `npm install`

* Compile contract code

  * `node_modules/.bin/truffle compile`

## Running Tests

* `bash run_test.sh`

## Deployed contracts

* Token Contract

address: [0x61383ac89988b498df5363050ff07fe5c52ecdda](https://etherscan.io/address/0x61383ac89988b498df5363050ff07fe5c52ecdda)

* Crowdsale Contract

address: [https://etherscan.io/address/0x4d0269b1898bee6aa94f54d1724f9862aabdd010](https://etherscan.io/address/https://etherscan.io/address/0x4d0269b1898bee6aa94f54d1724f9862aabdd010)

* Airdrop Contract

address: [https://etherscan.io/address/0x147c6e79cbc375f101bc44dd54b03ea051a446cc](https://etherscan.io/address/https://etherscan.io/address/0x147c6e79cbc375f101bc44dd54b03ea051a446cc)

* Lock Tokens for Advisors - Unlocked at 15 of December 2018

address: [https://etherscan.io/address/0xDfc8EcB515C0Bb72DE8BcBe0CB7a2D84B65C8027
](https://etherscan.io/address/https://etherscan.io/address/0xDfc8EcB515C0Bb72DE8BcBe0CB7a2D84B65C8027)

* Lock Tokens for Team - Unlocked at 15 of September 2019

address: [https://etherscan.io/address/0xcCECe1A6050ce319123793BbEac0fF5FA7bec445

](https://etherscan.io/address/https://etherscan.io/address/0xcCECe1A6050ce319123793BbEac0fF5FA7bec445
)
