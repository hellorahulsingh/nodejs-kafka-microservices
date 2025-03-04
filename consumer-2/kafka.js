// const { Kafka } = require("kafkajs");

// const kafka = new Kafka({
//   clientId: "consumer-2",
//   brokers: ["kafka:9092"],
// });

// const consumer = kafka.consumer({ groupId: "group-2" });

// const connectConsumer = async () => {
//   await consumer.connect();
//   await consumer.subscribe({ topic: "event2", fromBeginning: true });
//   console.log("Consumer 2 subscribed to topic: event2");

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log(`Consumer 2 received message: ${message.value.toString()} on topic ${topic}`);
//     },
//   });
// };

// module.exports = { connectConsumer };

const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "consumer-2",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "group-2" });
const producer = kafka.producer();

const connectConsumer = async () => {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: "event2", fromBeginning: true });
  console.log("Consumer 2 subscribed to topic: event2");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const value = message.value.toString();
        console.log(`Consumer 2 received: ${value} on topic ${topic}`);

        // Simulating a failure scenario
        if (value.includes("fail")) {
          throw new Error("Simulated failure");
        }
      } catch (error) {
        console.error(`Consumer 2 failed to process message: ${message.value.toString()}`);
        await producer.send({
          topic: "notifications.dlq",
          messages: [{ value: message.value.toString() }],
        });
      }
    },
  });
};

module.exports = { connectConsumer };
