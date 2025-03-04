const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "producer-service",
  brokers: ["kafka:9092"], // Kafka service in Docker
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected");
};

const sendMessage = async (topic, message) => {
  await producer.send({
    topic,
    messages: [{ value: message }],
  });
  console.log(`Message sent to topic ${topic}: ${message}`);
};

module.exports = { connectProducer, sendMessage };
