const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "consumer-1",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "group-1" });
const producer = kafka.producer();

const connectConsumer = async () => {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: "event1", fromBeginning: true });
  console.log("Consumer 1 subscribed to topic: event1");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const value = message.value.toString();
        console.log(`Consumer 1 received: ${value} on topic ${topic}`);

        // Simulating a failure scenario
        if (value.includes("fail")) {
          throw new Error("Simulated failure");
        }
      } catch (error) {
        console.error(`Consumer 1 failed to process message: ${message.value.toString()}`);
        await producer.send({
          topic: "notifications.dlq",
          messages: [{ value: message.value.toString() }],
        });
      }
    },
  });
};

module.exports = { connectConsumer };

