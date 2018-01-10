pragma solidity ^0.4.0;

contract z36 {
    
    function z36() public payable {
        owners[msg.sender] = true;
    }

    struct Client {
        address addr;
    }
    
    struct Asset {
        string code;
    }
    
    struct Wallet {
        Client client;
        Asset[] assets;
    }

    mapping(address => bool) owners;
    mapping(string => Asset) assets;
    mapping(address => Client) clients;
    
    modifier restricted() {
        require(owners[msg.sender]);
        _;
    }
    
    function setAsset(string code) restricted {
        assets[code] = Asset({ code: code });
    }
    
    function getAsset(string code) restricted constant returns (string) {
        return assets[code].code;
    }

}
