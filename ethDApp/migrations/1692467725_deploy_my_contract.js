const Example = artifacts.require("test.sol");
module.exports = function(deployer) {
  deployer.deploy(Example);
  // Use deployer to state migration tasks.
};
