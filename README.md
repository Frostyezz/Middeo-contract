# Middeo Smart Contract

## Overview

This smart contract is a decentralized application that facilitates a marketplace for tasks or challenges on the Ethereum blockchain. Users can create posts with specific tasks, receive proposals from other users, select a winner, and distribute rewards—all in a secure and transparent manner. This contract was developed using Solidity, tested with Mocha, compiled and deployed using JavaScript.

## Features

1. **Post Creation**:
   - Users can create a post by specifying a unique ID, a description, and a title. Each post includes a reward, which is stored in the contract's balance until it is awarded to the selected winner. Posts are initially marked as "OPEN."

2. **Proposal Submission**:
   - Other users can submit proposals to a post by providing their proposed solution or idea. Each proposal is linked to the user's Ethereum address.

3. **Winner Selection**:
   - The author of the post can review all submitted proposals and select a winner. The post's status is updated to "IN_PROGRESS" upon winner selection.

4. **Reward Distribution**:
   - Once the task is completed, the post's author can release the reward to the winner. The post's status is then updated to "DONE," indicating that the process is complete.

5. **User Interaction**:
   - Users can retrieve details of specific posts, view a list of all posts, and check their own posts and candidatures.
