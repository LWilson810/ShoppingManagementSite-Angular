

module.exports = {
	networks: {
		localnode: { // Whatever network our local node connects to
			network_id: "*", // Match any network ID
			host: "localhost",
			port: 7545,
			gas: 4712388,
			gasPrice: 200000000000
		}
	}
};