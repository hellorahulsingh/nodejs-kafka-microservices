const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "dlq-consumer",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "dlq-group" });

const connectConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "notifications.dlq", fromBeginning: true });
  console.log("DLQ Consumer subscribed to topic: notifications.dlq");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.error(`DLQ received failed message: ${message.value.toString()} on topic ${topic}`);
    },
  });
};

module.exports = { connectConsumer };
