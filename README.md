# Kafka Microservices

This repository contains a Kafka-based microservices architecture with a producer and multiple consumers, including a Dead Letter Queue (DLQ) consumer.

## Project Structure
```
kafka-microservices/
│── producer/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   ├── kafka.js
│
│── consumer-1/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   ├── kafka.js
│
│── consumer-2/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   ├── kafka.js
│
│── dlq-consumer/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   ├── kafka.js
│
│── docker-compose.yaml
│── README.md
```

## Prerequisites
- Docker
- Docker Compose
- Kafka & Zookeeper (handled by Docker Compose)

## Setup and Run

### Start the Microservices
To start the entire system, run:
```sh
docker-compose up -d
```
This will start the producer, consumers, and the DLQ consumer along with Kafka and Zookeeper.

### Kafka Visualizer
You can monitor Kafka topics using Kafka UI:
```
http://localhost:9000
```

## Log Analysis
You can check logs for each service using:
```sh
docker logs -f consumer-1
```
```sh
docker logs -f consumer-2
```
```sh
docker logs -f dlq-consumer
```

## Publishing Messages
You can send messages to specific consumers using cURL commands.

### Send Message to Consumer-1
```sh
curl -X POST http://localhost:3000/publish -H "Content-Type: application/json" \
-d '{"topic": "event1", "message": "Message for Consumer 1"}'
```

### Send Message to Consumer-2
```sh
curl -X POST http://localhost:3000/publish -H "Content-Type: application/json" \
-d '{"topic": "event2", "message": "Message for Consumer 2"}'
```

### Publish a Failing Message (for DLQ Handling)
```sh
curl -X POST http://localhost:3000/publish -H "Content-Type: application/json" \
-d '{"topic": "event1", "message": "fail this message"}'
```

## Stopping Services
To stop all services, run:
```sh
docker-compose down
```

## License
This project is licensed under the MIT License.