import { Router } from "express";
import KafkaController from "./kafkaController.js";

const router = Router();


router.post('/create_topic', async(req, res) => {
    try {
        const { topicName, noOfPartition } = req.body;
        const kafkaController = new KafkaController();
        await kafkaController.createTopic(topicName,noOfPartition);
        res.send({
            status: "Ok",
            message: "Topic Successfully Created",
          });
    } catch (error) {
        res.status(500).send({
            message: "Failed to create Topic"
          });
    }
});

export default router;
