// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title PasswordManager
 * @dev Smart contract for managing encrypted passwords on blockchain
 */
contract PasswordManager {
    
    struct PasswordEntry {
        bytes32 passwordHash;
        uint256 timestamp;
        bool isActive;
    }
    
    struct User {
        address walletAddress;
        uint256 passwordCount;
        bool isRegistered;
        uint256 registrationTime;
    }
    
    mapping(address => User) public users;
    mapping(address => mapping(bytes32 => PasswordEntry)) public passwords;
    mapping(address => bytes32[]) public userPasswords;
    
    event UserRegistered(address indexed user, uint256 timestamp);
    event PasswordStored(address indexed user, bytes32 indexed passwordHash, uint256 timestamp);
    event PasswordRemoved(address indexed user, bytes32 indexed passwordHash, uint256 timestamp);
    
    /**
     * @dev Register a new user
     */
    function registerUser() external {
        require(!users[msg.sender].isRegistered, "User already registered");
        
        users[msg.sender] = User({
            walletAddress: msg.sender,
            passwordCount: 0,
            isRegistered: true,
            registrationTime: block.timestamp
        });
        
        emit UserRegistered(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Store a password hash on the blockchain
     * @param passwordHash Keccak256 hash of the encrypted password
     */
    function storePassword(bytes32 passwordHash) external {
        require(users[msg.sender].isRegistered, "User not registered");
        require(passwordHash != bytes32(0), "Invalid password hash");
        
        if (!passwords[msg.sender][passwordHash].isActive) {
            userPasswords[msg.sender].push(passwordHash);
            users[msg.sender].passwordCount++;
        }
        
        passwords[msg.sender][passwordHash] = PasswordEntry({
            passwordHash: passwordHash,
            timestamp: block.timestamp,
            isActive: true
        });
        
        emit PasswordStored(msg.sender, passwordHash, block.timestamp);
    }
    
    /**
     * @dev Remove a password from blockchain
     * @param passwordHash Hash of the password to remove
     */
    function removePassword(bytes32 passwordHash) external {
        require(users[msg.sender].isRegistered, "User not registered");
        require(passwords[msg.sender][passwordHash].isActive, "Password not found");
        
        passwords[msg.sender][passwordHash].isActive = false;
        users[msg.sender].passwordCount--;
        
        emit PasswordRemoved(msg.sender, passwordHash, block.timestamp);
    }
    
    /**
     * @dev Get user's password count
     */
    function getPasswordCount() external view returns (uint256) {
        require(users[msg.sender].isRegistered, "User not registered");
        return users[msg.sender].passwordCount;
    }
    
    /**
     * @dev Verify if a password exists
     * @param passwordHash Hash to verify
     */
    function passwordExists(bytes32 passwordHash) external view returns (bool) {
        require(users[msg.sender].isRegistered, "User not registered");
        return passwords[msg.sender][passwordHash].isActive;
    }
    
    /**
     * @dev Get user registration status
     */
    function isUserRegistered() external view returns (bool) {
        return users[msg.sender].isRegistered;
    }
    
    /**
     * @dev Get all active password hashes for user
     */
    function getUserPasswords() external view returns (bytes32[] memory) {
        require(users[msg.sender].isRegistered, "User not registered");
        
        bytes32[] memory activePasswords = new bytes32[](users[msg.sender].passwordCount);
        uint256 count = 0;
        
        for (uint256 i = 0; i < userPasswords[msg.sender].length; i++) {
            bytes32 hash = userPasswords[msg.sender][i];
            if (passwords[msg.sender][hash].isActive) {
                activePasswords[count] = hash;
                count++;
            }
        }
        
        return activePasswords;
    }
    
    /**
     * @dev Get password entry details
     */
    function getPasswordDetails(bytes32 passwordHash) 
        external 
        view 
        returns (uint256 timestamp, bool isActive) 
    {
        require(users[msg.sender].isRegistered, "User not registered");
        PasswordEntry memory entry = passwords[msg.sender][passwordHash];
        return (entry.timestamp, entry.isActive);
    }
}
