const {createClient} = require("redis")

const client = createClient();

client.connect().catch(console.error)

module.exports = client;