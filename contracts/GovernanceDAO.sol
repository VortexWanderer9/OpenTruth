// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title GovernanceDAO
 * @notice DAO contract for OpenTruth community governance
 * Allows reputation holders to propose and vote on platform decisions
 */
contract GovernanceDAO {
    
    // Proposal struct
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 abstainVotes;
        uint256 createdAt;
        uint256 deadline;
        bool executed;
        string ipfsContentHash;
    }
    
    // Vote types
    enum VoteType { FOR, AGAINST, ABSTAIN }
    
    // Proposal counter
    uint256 public proposalCounter;
    
    // Minimum reputation required to propose
    uint256 public constant MIN_REPUTATION_TO_PROPOSE = 500;
    
    // Voting duration (3 days)
    uint256 public constant VOTING_DURATION = 3 days;
    
    // Quorum requirement (20% of voting power)
    uint256 public quorumPercentage = 20;
    
    // Mapping of proposal ID to proposal details
    mapping(uint256 => Proposal) public proposals;
    
    // Mapping of proposal ID and voter address to vote status
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    
    // Mapping of proposal ID and voter address to vote weight
    mapping(uint256 => mapping(address => uint256)) public voteWeight;
    
    // Reference to reputation contract (would be actual address in deployment)
    address public reputationTokenAddress;
    
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        string title,
        uint256 deadline
    );
    
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        VoteType voteType,
        uint256 weight
    );
    
    event ProposalExecuted(uint256 indexed proposalId);
    
    constructor(address _reputationToken) {
        reputationTokenAddress = _reputationToken;
    }
    
    /**
     * @notice Create a new governance proposal
     * @param _title Proposal title
     * @param _description Proposal description
     * @param _ipfsHash IPFS hash containing full proposal details
     */
    function createProposal(
        string calldata _title,
        string calldata _description,
        string calldata _ipfsHash
    ) external returns (uint256) {
        // In production, would verify caller has sufficient reputation
        require(bytes(_title).length > 0, "Title required");
        require(bytes(_description).length > 0, "Description required");
        
        uint256 proposalId = proposalCounter++;
        
        proposals[proposalId] = Proposal({
            id: proposalId,
            proposer: msg.sender,
            title: _title,
            description: _description,
            forVotes: 0,
            againstVotes: 0,
            abstainVotes: 0,
            createdAt: block.timestamp,
            deadline: block.timestamp + VOTING_DURATION,
            executed: false,
            ipfsContentHash: _ipfsHash
        });
        
        emit ProposalCreated(proposalId, msg.sender, _title, proposals[proposalId].deadline);
        
        return proposalId;
    }
    
    /**
     * @notice Cast a vote on a proposal
     * @param _proposalId ID of the proposal
     * @param _voteType Type of vote (FOR, AGAINST, ABSTAIN)
     */
    function vote(uint256 _proposalId, VoteType _voteType) external {
        Proposal storage proposal = proposals[_proposalId];
        
        require(block.timestamp <= proposal.deadline, "Voting period ended");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");
        
        // In production, would get actual vote weight from reputation contract
        uint256 voteWeight = 1; // Placeholder: would be reputation score
        
        hasVoted[_proposalId][msg.sender] = true;
        voteWeight[_proposalId][msg.sender] = voteWeight;
        
        if (_voteType == VoteType.FOR) {
            proposal.forVotes += voteWeight;
        } else if (_voteType == VoteType.AGAINST) {
            proposal.againstVotes += voteWeight;
        } else {
            proposal.abstainVotes += voteWeight;
        }
        
        emit VoteCast(_proposalId, msg.sender, _voteType, voteWeight);
    }
    
    /**
     * @notice Check if a proposal has passed
     * @param _proposalId ID of the proposal
     * @return true if proposal passed, false otherwise
     */
    function hasProposalPassed(uint256 _proposalId) public view returns (bool) {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp > proposal.deadline, "Voting still ongoing");
        
        uint256 totalVotes = proposal.forVotes + proposal.againstVotes + proposal.abstainVotes;
        require(totalVotes > 0, "No votes cast");
        
        // Simple majority rule: FOR votes > AGAINST votes
        return proposal.forVotes > proposal.againstVotes;
    }
    
    /**
     * @notice Get proposal details
     * @param _proposalId ID of the proposal
     * @return The proposal struct
     */
    function getProposal(uint256 _proposalId) external view returns (Proposal memory) {
        return proposals[_proposalId];
    }
}
