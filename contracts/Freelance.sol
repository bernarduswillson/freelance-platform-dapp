// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "hardhat/console.sol";

contract Freelance {
  enum ContractStatus { CREATED, IN_PROGRESS, COMPLETED, DISPUTED, CANCELLED }

  struct Contract {
    // general info
    string jobTitle;
    string description;
    string agreements;
    uint256 deadline;
    ContractStatus status;

    // timestamps
    uint256 createdAt;
    uint256 startedAt;
    uint256 completedAt;

    // parties
    address payable client;
    address payable freelancer;

    // amounts
    uint256 paymentAmount; // from client to freelancer
    uint256 guaranteeAmount; // from client to contract

    // deliverables
    string ipfsCID;

    // feedback
    uint8 clientRating;
    uint8 freelancerRating;
  }

  mapping(bytes32 => Contract) public contractMapping;
  mapping(address => bytes32[]) public clientContracts;
  mapping(address => bytes32[]) public freelancerContracts;

  event ContractCreated(bytes32 indexed contractId, address indexed client, address indexed freelancer);

  function createContract(
    string memory jobTitle,
    string memory description,
    string memory agreements,
    uint256 deadline,
    address payable freelancer,
    uint256 paymentAmount
  ) public payable {
    require(msg.value == paymentAmount, "Payment amount must be sent with the transaction");

    bytes32 contractId = keccak256(
      abi.encodePacked(
        block.timestamp,
        msg.sender,
        freelancer
      )
    );

    Contract memory newContract = Contract({
      jobTitle: jobTitle,
      description: description,
      agreements: agreements,
      deadline: deadline,
      status: ContractStatus.CREATED,
      createdAt: block.timestamp,
      startedAt: 0,
      completedAt: 0,
      client: payable(msg.sender),
      freelancer: freelancer,
      paymentAmount: paymentAmount,
      guaranteeAmount: 0,
      ipfsCID: "",
      clientRating: 0,
      freelancerRating: 0
    });

    contractMapping[contractId] = newContract;
    clientContracts[msg.sender].push(contractId);
    freelancerContracts[freelancer].push(contractId);

    emit ContractCreated(contractId, msg.sender, freelancer);
  }
}