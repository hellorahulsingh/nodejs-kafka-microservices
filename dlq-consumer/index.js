const { connectConsumer } = require("./kafka");

connectConsumer().catch(console.error);
