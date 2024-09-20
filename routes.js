import { Router } from "express";
import KafkaController from "./kafkaController.js";

const router = Router();

router.post("/create_topic", async (req, res) => {
  try {
    const { topicName, noOfPartition } = req.body;
    const kafkaController = new KafkaController();
    await kafkaController.createTopic(topicName, noOfPartition);
    res.send({
      status: "Ok",
      message: "Topic Successfully Created",
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to create Topic",
    });
  }
});

router.post("/publish", async (req, res) => {
  try {
    const { topicName, message } = req.body;
    const messages = [{
        key: message?.key,
        value: message?.value
    }]
    const kafkaController = new KafkaController();
    await kafkaController.publishMessageToTopic(topicName, messages);
    res.send({
      status: "Ok",
      message: "Message Successfully published",
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to publish message",
    });
  }
});

router.post("/consume", async (req, res) => {
  try {
    const { topicName } = req.body;
    const kafkaController = new KafkaController();
    await kafkaController.consumeMessageFromTopic(topicName, (message) => {
      res.send({
        status: "Ok",
        message,
      });
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to consume message",
    });
  }
});

export default router;
