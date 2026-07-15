// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ContentRegistry
 * @notice On-chain registry for content metadata and community notes
 * Stores IPFS hashes and voting records for posts and community notes
 */
contract ContentRegistry {
    
    struct Post {
        uint256 id;
        address author;
        string ipfsHash;
        uint256 timestamp;
        uint256 upvotes;
        uint256 downvotes;
        bool isFlagged;
    }
    
    struct CommunityNote {
        uint256 id;
        uint256 postId;
        address author;
        string ipfsHash;
        string noteType; // "context", "dispute", "correction"
        uint256 helpfulVotes;
        uint256 notHelpfulVotes;
        bool isActive;
    }
    
    // Post counter
    uint256 public postCounter;
    
    // Community note counter
    uint256 public noteCounter;
    
    // Mapping of post ID to post details
    mapping(uint256 => Post) public posts;
    
    // Mapping of note ID to community note details
    mapping(uint256 => CommunityNote) public communityNotes;
    
    // Mapping of post ID to array of note IDs
    mapping(uint256 => uint256[]) public postNotes;
    
    // Mapping to track upvotes/downvotes per user (post ID -> voter -> voted)
    mapping(uint256 => mapping(address => bool)) public hasUpvoted;
    mapping(uint256 => mapping(address => bool)) public hasDownvoted;
    
    // Mapping for community note votes
    mapping(uint256 => mapping(address => int8)) public noteVotes; // -1: not helpful, 1: helpful, 0: not voted
    
    event PostCreated(uint256 indexed postId, address indexed author, string ipfsHash);
    event PostVoted(uint256 indexed postId, address indexed voter, bool isUpvote);
    event PostFlagged(uint256 indexed postId);
    event CommunityNoteCreated(
        uint256 indexed noteId,
        uint256 indexed postId,
        address indexed author,
        string noteType
    );
    event CommunityNoteVoted(uint256 indexed noteId, address indexed voter, bool isHelpful);
    
    /**
     * @notice Create a new post
     * @param _ipfsHash IPFS hash of the post content
     */
    function createPost(string calldata _ipfsHash) external returns (uint256) {
        require(bytes(_ipfsHash).length > 0, "IPFS hash required");
        
        uint256 postId = postCounter++;
        
        posts[postId] = Post({
            id: postId,
            author: msg.sender,
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp,
            upvotes: 0,
            downvotes: 0,
            isFlagged: false
        });
        
        emit PostCreated(postId, msg.sender, _ipfsHash);
        
        return postId;
    }
    
    /**
     * @notice Vote on a post
     * @param _postId ID of the post
     * @param _isUpvote true for upvote, false for downvote
     */
    function voteOnPost(uint256 _postId, bool _isUpvote) external {
        Post storage post = posts[_postId];
        require(post.author != address(0), "Post does not exist");
        require(msg.sender != post.author, "Cannot vote on own post");
        
        if (_isUpvote) {
            require(!hasUpvoted[_postId][msg.sender], "Already upvoted");
            require(!hasDownvoted[_postId][msg.sender], "Remove downvote first");
            
            hasUpvoted[_postId][msg.sender] = true;
            post.upvotes += 1;
        } else {
            require(!hasDownvoted[_postId][msg.sender], "Already downvoted");
            require(!hasUpvoted[_postId][msg.sender], "Remove upvote first");
            
            hasDownvoted[_postId][msg.sender] = true;
            post.downvotes += 1;
        }
        
        emit PostVoted(_postId, msg.sender, _isUpvote);
    }
    
    /**
     * @notice Flag a post as problematic
     * @param _postId ID of the post to flag
     */
    function flagPost(uint256 _postId) external {
        Post storage post = posts[_postId];
        require(post.author != address(0), "Post does not exist");
        
        post.isFlagged = true;
        emit PostFlagged(_postId);
    }
    
    /**
     * @notice Add a community note to a post
     * @param _postId ID of the post
     * @param _ipfsHash IPFS hash of the note content
     * @param _noteType Type of note (context, dispute, correction)
     */
    function addCommunityNote(
        uint256 _postId,
        string calldata _ipfsHash,
        string calldata _noteType
    ) external returns (uint256) {
        require(posts[_postId].author != address(0), "Post does not exist");
        require(bytes(_ipfsHash).length > 0, "IPFS hash required");
        
        uint256 noteId = noteCounter++;
        
        communityNotes[noteId] = CommunityNote({
            id: noteId,
            postId: _postId,
            author: msg.sender,
            ipfsHash: _ipfsHash,
            noteType: _noteType,
            helpfulVotes: 0,
            notHelpfulVotes: 0,
            isActive: true
        });
        
        postNotes[_postId].push(noteId);
        
        emit CommunityNoteCreated(noteId, _postId, msg.sender, _noteType);
        
        return noteId;
    }
    
    /**
     * @notice Vote on whether a community note is helpful
     * @param _noteId ID of the community note
     * @param _isHelpful true if helpful, false if not helpful
     */
    function voteCommunityNote(uint256 _noteId, bool _isHelpful) external {
        CommunityNote storage note = communityNotes[_noteId];
        require(note.author != address(0), "Note does not exist");
        require(note.isActive, "Note is not active");
        require(msg.sender != note.author, "Cannot vote on own note");
        
        int8 previousVote = noteVotes[_noteId][msg.sender];
        
        // Remove previous vote if exists
        if (previousVote == 1) {
            note.helpfulVotes -= 1;
        } else if (previousVote == -1) {
            note.notHelpfulVotes -= 1;
        }
        
        // Add new vote
        if (_isHelpful) {
            note.helpfulVotes += 1;
            noteVotes[_noteId][msg.sender] = 1;
        } else {
            note.notHelpfulVotes += 1;
            noteVotes[_noteId][msg.sender] = -1;
        }
        
        emit CommunityNoteVoted(_noteId, msg.sender, _isHelpful);
    }
    
    /**
     * @notice Get post details
     * @param _postId ID of the post
     */
    function getPost(uint256 _postId) external view returns (Post memory) {
        return posts[_postId];
    }
    
    /**
     * @notice Get community notes for a post
     * @param _postId ID of the post
     */
    function getPostNotes(uint256 _postId) external view returns (uint256[] memory) {
        return postNotes[_postId];
    }
    
    /**
     * @notice Get community note details
     * @param _noteId ID of the note
     */
    function getCommunityNote(uint256 _noteId) external view returns (CommunityNote memory) {
        return communityNotes[_noteId];
    }
}
