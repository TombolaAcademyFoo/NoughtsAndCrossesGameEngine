//Actual server should set api.useVhost to false.
//If running locally virtual hostname must be set up on the local machine's hosts file at 127.0.0.1
module.exports = {portNumber: 35000, api: {'useVHost': true, vHostName: 'noughtsandcrosses'}};