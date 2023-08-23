// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TutorialHaven is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint => VideoData) public videoMetadata;

    struct VideoData {
        string title;
        string description;
        string url;
        string thumbnail;
        string author;
    }

    constructor(
    ) ERC721("Tutorial Haven", "THN") {

    }

    function uploadVideo(
        string calldata _title,
        string calldata _description,
        string calldata _url,
        string calldata _thumbnail,
        string calldata _author
    ) public returns (uint) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);

        VideoData memory data = VideoData(
            _title,
            _description,
            _url,
            _thumbnail,
            _author
        );
        videoMetadata[newItemId] = data;

        return newItemId;
    }
}
