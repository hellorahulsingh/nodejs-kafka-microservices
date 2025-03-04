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

# kafka visualizer
http://localhost:9000

# log analysis
docker logs -f consumer-1
docker logs -f consumer-2
docker logs -f dlq-consumer

# Send message to consumer-1 from producer
curl -X POST http://localhost:3000/publish -H "Content-Type: application/json" \
-d '{"topic": "event1", "message": "Message for Consumer 1"}'

# Send message to consumer-2 from producer
curl -X POST http://localhost:3000/publish -H "Content-Type: application/json" \
-d '{"topic": "event2", "message": "Message for Consumer 2"}'

# publish a fail message
curl -X POST http://localhost:3000/publish -H "Content-Type: application/json" \
-d '{"topic": "event1", "message": "fail this message"}'
