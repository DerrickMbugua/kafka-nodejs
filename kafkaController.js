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
}

export default KafkaController;
