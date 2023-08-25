// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Haven.sol";

contract TutorialHaven is ERC721 {
    Haven public tokenContract;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint => VideoData) public videoMetadata;
    mapping(uint => address[]) public access;

    event VideoUploaded(uint256 indexed tokenId);

    struct VideoData {
        string title;
        string description;
        string url;
        string thumbnail;
        string author;
        address paymentAddress;
        string access;
        uint256 cost;
    }

    constructor(address _tokenContractAddress) ERC721("Tutorial Haven", "THN") {
        tokenContract = Haven(_tokenContractAddress);
    }

    function uploadVideo(VideoData calldata data) public returns (uint) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);

        videoMetadata[newItemId] = VideoData(
            data.title,
            data.description,
            data.url,
            data.thumbnail,
            data.author,
            data.paymentAddress,
            data.access,
            data.cost
        );

        emit VideoUploaded(newItemId);
        return newItemId;
    }

    function buyAccess(uint256 _id) public {
    uint256 cost = videoMetadata[_id].cost;
    address paymentAddress = videoMetadata[_id].paymentAddress;

    // Ensure that the contract is approved to spend the required tokens by the user
    require(
        tokenContract.allowance(msg.sender, address(this)) >= cost,
        "Allowance not enough"
    );

    // Transfer tokens from msg.sender to the payment address
    tokenContract.transferFrom(msg.sender, paymentAddress, cost);

    access[_id].push(msg.sender);
}

    function checkAccess(uint256 _id) public view returns (bool) {
        if (
            keccak256(abi.encodePacked(videoMetadata[_id].access)) ==
            keccak256(abi.encodePacked("public"))
        ) return true;
        for (uint256 i = 0; i < access[_id].length; i++) {
            if (access[_id][i] == msg.sender) {
                return true; // Address found in the array
            }
        }
        return false; // Address not found in the array
    }
}
