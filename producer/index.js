
const express = require("express");
const { connectProducer, sendMessage } = require("./kafka");

const app = express();
app.use(express.json());

const PORT = 3000;

// Start Kafka producer
connectProducer().catch(console.error);

// Endpoint to send messages to Kafka
app.post("/publish", async (req, res) => {
  const { topic, message } = req.body;
  if (!topic || !message) {
    return res.status(400).json({ error: "Topic and message are required" });
  }

  try {
    await sendMessage(topic, message);
    res.json({ success: true, topic, message });
  } catch (error) {
    console.error("Error publishing message:", error);
    res.status(500).json({ error: "Error publishing message" });
  }
});

app.listen(PORT, () => {
  console.log(`Producer service running on http://localhost:${PORT}`);
});
