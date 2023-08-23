// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Tutorial Haven Token
 * @dev This is the Tutorial Haven token.
 */

contract Haven {

    //Variables
    string public name;
    string public symbol;
    uint8 public decimals;

    uint256 private _totalSupply;
    uint256 tokenPrice = 1 ether/1000;
    
    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowances;

    //Events
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    constructor() {
        name = "Haven";
        symbol = "HVN";
        decimals = 18;

        _totalSupply += 1000 * 10 ** decimals;
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function buyTokens() external payable {
    require(tokenPrice > 0, "Token price not set");
    require(msg.value > 0, "Amount must be greater than 0");

    uint256 tokenAmount = (msg.value * (10 ** decimals)) / tokenPrice;

    balances[msg.sender] += tokenAmount;
    _totalSupply += tokenAmount;

    emit Transfer(address(0), msg.sender, tokenAmount);
}

function sellTokens(uint256 tokenAmount) external {
        require(tokenAmount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] >= tokenAmount, "Insufficient balance");

        uint256 ethAmount = (tokenAmount * tokenPrice);

        balances[msg.sender] -= tokenAmount;
        _totalSupply -= tokenAmount;

        (bool sent, ) = msg.sender.call{value: ethAmount}("");
        require(sent, "Failed to send Ether");

        emit Transfer(msg.sender, address(0), tokenAmount);
    }

    function totalSupply() public view virtual returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual returns (uint256) {
        return balances[account];
    }

    function allowance(address owner, address spender) public view virtual returns (uint256) {
        return allowances[owner][spender];
    }

    function transfer(address recipient, uint amount) external returns (bool) {
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowances[sender][msg.sender] -= amount;
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }
}