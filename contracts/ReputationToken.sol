// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title ReputationToken
 * @notice Non-transferable reputation NFTs representing user credibility on OpenTruth
 * Earned through quality posts, governance participation, and community moderation
 */
contract ReputationToken is ERC721, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private tokenIdCounter;
    
    // Tier thresholds based on reputation score
    uint256 public constant TIER_1_THRESHOLD = 100;
    uint256 public constant TIER_2_THRESHOLD = 500;
    uint256 public constant TIER_3_THRESHOLD = 2000;
    
    // Mapping of user address to reputation score
    mapping(address => uint256) public reputationScore;
    
    // Mapping of user address to tier level
    mapping(address => uint8) public userTier;
    
    // Mapping to track token ownership
    mapping(uint256 => address) public tokenOwner;
    
    event ReputationAwarded(address indexed user, uint256 points, string reason);
    event TierUpgraded(address indexed user, uint8 newTier);
    event ReputationBurned(address indexed user, uint256 points, string reason);
    
    constructor() ERC721("OpenTruth Reputation", "TRUTH") {}
    
    /**
     * @notice Award reputation points to a user
     * @param _user Address of the user
     * @param _points Amount of reputation points to award
     * @param _reason Reason for the award
     */
    function awardReputation(
        address _user,
        uint256 _points,
        string calldata _reason
    ) external onlyOwner {
        require(_user != address(0), "Invalid address");
        require(_points > 0, "Points must be positive");
        
        reputationScore[_user] += _points;
        
        // Check for tier upgrade
        uint8 newTier = calculateTier(reputationScore[_user]);
        if (newTier > userTier[_user]) {
            userTier[_user] = newTier;
            emit TierUpgraded(_user, newTier);
        }
        
        emit ReputationAwarded(_user, _points, _reason);
    }
    
    /**
     * @notice Burn reputation points from a user
     * @param _user Address of the user
     * @param _points Amount of reputation points to burn
     * @param _reason Reason for the burn
     */
    function burnReputation(
        address _user,
        uint256 _points,
        string calldata _reason
    ) external onlyOwner {
        require(_user != address(0), "Invalid address");
        require(_points > 0, "Points must be positive");
        require(reputationScore[_user] >= _points, "Insufficient reputation");
        
        reputationScore[_user] -= _points;
        
        // Check for tier downgrade
        uint8 newTier = calculateTier(reputationScore[_user]);
        if (newTier < userTier[_user]) {
            userTier[_user] = newTier;
        }
        
        emit ReputationBurned(_user, _points, _reason);
    }
    
    /**
     * @notice Get the tier based on reputation score
     * @param _score The reputation score
     * @return Tier level (0-3)
     */
    function calculateTier(uint256 _score) public pure returns (uint8) {
        if (_score >= TIER_3_THRESHOLD) return 3;
        if (_score >= TIER_2_THRESHOLD) return 2;
        if (_score >= TIER_1_THRESHOLD) return 1;
        return 0;
    }
    
    /**
     * @notice Get user's current reputation
     * @param _user Address of the user
     * @return Current reputation score
     */
    function getReputation(address _user) external view returns (uint256) {
        return reputationScore[_user];
    }
}
