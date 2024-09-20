import debug from "debug";
import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

class KafkaController {
  constructor() {
    this.kafka = new Kafka({
      clientId: process.env.CLIENT_ID,
      brokers: [process.env.BROKER_1],
    });
  }

  //   method to create topic with multiple partitions
  async createTopic(topicName, noOfPartition) {
    try {
      // create admin client to manage kafka topic
      const admin = this.kafka.admin();
      await admin.connect();
      await admin.createTopics({
        topics: [
          {
            topic: topicName.toString(),
            numPartitions: parseInt(noOfPartition),
            replicationFactor: 1,
          },
        ],
      });
      await admin.disconnect();
    } catch (error) {
      console.log("Error createTopic:", error);
      throw error;
    }
  }

  //   publish message to the topic
  async publishMessageToTopic(topicName, messages) {
    const producer = this.kafka.producer();
    try {
      await producer.connect();
      await producer.send({
        topic: topicName,
        messages,
      });
    } catch (error) {
      console.log("Error in publish message", error);
      throw error;
    } finally {
      await producer.disconnect();
    }
  }

  //   consume message
  async consumeMessageFromTopic(topicName, callback) {
    const consumer = this.kafka.consumer({groupId: 'test-group'});
    try {
        await consumer.connect();
        await consumer.subscribe({
            topic: topicName,
            fromBeginning: true
        });
        await consumer.run({
            eachMessage: async ({
                topic,
                partition,
                message
            }) => {
                const value = `Received message: ${message.value.toString()} from partition ${partition} & topic ${topic}`;
                callback(value);
            }
        })
    } catch (error) {
        console.log("Error in consume message:", error);
        throw error;
    }
  }
}

export default KafkaController;
