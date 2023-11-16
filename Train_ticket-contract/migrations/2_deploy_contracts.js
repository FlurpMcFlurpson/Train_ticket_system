var Train = artifacts.require("Train_tickets");

module.exports = function (deployer) {
    deployer.deploy(Train, 5000);
};