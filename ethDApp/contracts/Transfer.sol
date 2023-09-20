pragma solidity ^0.4.24;


contract transfer {
  address from;
  address to;

  constructor() public {
    from = msg.sender;
  }

  event Pay(address _to, address _from, uint amt);

  function pay( address _to ) public payable returns 
  (bool) {
    to = _to;
    to.transfer(msg.value);
    emit Pay(to, from, msg.value);
    return true;
  }
}
