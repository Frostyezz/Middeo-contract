//SPDX-License-Identifier: MIT
pragma solidity 0.4.17;
pragma experimental ABIEncoderV2;

contract Platform {
    struct Candidate {
        address author;
        string proposal;
    }

    struct Post {
        string title;
        string description;
        address author;
        uint[] tags;
        uint posted;
        uint256 reward;
        Candidate[] candidatures;
        address winner;
        string status;
    }

    struct User{
        Id[] posts;
        Id[] candidatures;
    }

    struct Id{
        string id;
    }

    mapping(string => Post) posts;
    mapping(address => User) users;

    function createPost(
        string id,
        string description,
        string title
    ) public payable {
        posts[id].description = description;
        posts[id].title = title;
        posts[id].reward = msg.value;
        posts[id].author = msg.sender;
        posts[id].status = "OPEN";
        posts[id].posted = now;
        users[msg.sender].posts.push(Id({id:id}));
    }

    function retrievePost(string id) public view returns (Post) {
        return posts[id];
    }

    function retrieveUserPosts() public view returns (Id[]){
        return users[msg.sender].posts;
    }

    function retrieveUserCandidatures() public view returns (Id[]){
        return users[msg.sender].candidatures;
    }

    function applyToPost(string id, string proposal) public {
        posts[id].candidatures.push(
            Candidate({author: msg.sender, proposal: proposal})
        );
    }

    function selectWinner(string id, address winner) public {
        require(msg.sender == posts[id].author);
        posts[id].winner = winner;
        posts[id].status = "IN_PROGRESS";
    }

    function releaseReward(string id) public {
        require(msg.sender == posts[id].author);
        posts[id].winner.transfer(posts[id].reward);
        posts[id].status = "DONE";
    }
}
