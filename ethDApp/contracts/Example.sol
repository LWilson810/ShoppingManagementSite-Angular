pragma solidity ^0.4.0;

contract C {
    uint public data = 42;
}

contract test {
    mapping (address => uint) public balances;
    enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }
    ActionChoices choice;
    ActionChoices constant defaultChoice = ActionChoices.GoStraight;
    C c = new C();
    uint local;
    event report(ActionChoices);
    function setGoStraight() public {
        choice = ActionChoices.GoStraight;
    }
    function getChoice() public view returns (ActionChoices) {
        return choice;
    }
    function getDefaultChoice() public view returns (ActionChoices) {
        emit report(defaultChoice);

        return ActionChoices(defaultChoice);
    }

    function getC() public {
        local = c.data();
    }
}

