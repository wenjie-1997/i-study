const topicDto = require("../dto/topic");
const topic = require("../models/topic");
const topicComponentDto = require("../dto/topicComponent");
const { unlink } = require("fs");

class TopicController {
  get = async (req, res, next) => {
    try {
      let topicList = await topic.get(req.query);
      topicList = await Promise.all(
        topicList.map(async (t) => {
          const topicComponentList = await topic.getTopicComponent({
            topicId: t.topic_id,
          });
          return {
            ...t,
            topicComponentList: topicComponentList.map((tc) =>
              topicComponentDto.topicComponentToDto(tc)
            ),
          };
        })
      );
      return res.json(
        topicList.map((topic) => {
          return topicDto.topicToDto(topic);
        })
      );
    } catch (error) {
      next(error);
    }
  };

  post = async (req, res, next) => {
    try {
      const result = await topic.post(req.body);
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  put = async (req, res, next) => {
    try {
      const result = await topic.put(req.body);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const result = await topic.delete(req.body);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  insertTopicComponent = async (req, res, next) => {
    try {
      const { componentType, topicId } = req.body;
      if (componentType === 1) await topic.insertRichText(req.body);
      if (parseInt(componentType) === 2) {
        req.body = {
          componentType: parseInt(componentType),
          topicId: parseInt(topicId),
        };

        const newpath = "./public/material";
        const file = req.files.file;
        const fileName = file.name;
        const url = `${newpath}/${topicId}/${new Date()
          .toISOString()
          .replace(/[:.-]/g, "")}${fileName}`;

        file.mv(url, (err) => {
          if (err) {
            console.log(err);
            next(err);
          }
        });
        await topic.insertMaterial({ topicId, url, fileName });
      }

      if (componentType === 3) await topic.insertForum(req.body);
      if (componentType === 4) await topic.insertSubmission(req.body);
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  updateTopicComponent = async (req, res, next) => {
    try {
      console.log(req.body);
      const { componentType } = req.body;
      if (componentType === 1) await topic.updateRichText(req.body);
      if (parseInt(componentType) === 2) {
        const topicId = parseInt(req.body.topicId);
        const materialId = parseInt(req.body.materialId);
        const newpath = "./public/material";
        const file = req.files.file;
        const fileName = file.name;
        const url = `${newpath}/${topicId}/${new Date()
          .toISOString()
          .replace(/[:.-]/g, "")}${fileName}`;
        file.mv(url, (err) => {
          if (err) {
            console.log(err);
            next(err);
          }
        });
        await topic.updateMaterial({ materialId, url, fileName });
        unlink(req.body.url, (err) => {
          next(err);
        });
      }

      if (componentType === 3) await topic.updateForum(req.body);
      if (componentType === 4) await topic.updateSubmission(req.body);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  deleteTopicComponent = async (req, res, next) => {
    try {
      const { componentType } = req.body;
      if (componentType === 1) await topic.deleteRichText(req.body);
      if (componentType === 2) {
        const { url } = req.body;
        await topic.deleteMaterial(req.body);
        unlink(url, (err) => {
          next(err);
        });
      }

      if (componentType === 3) await topic.deleteForum(req.body);
      if (componentType === 4) await topic.deleteSubmission(req.body);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  downloadMaterial = async (req, res, next) => {
    try {
      const { url, fileName } = req.query;
      res.download(url, fileName); // Set disposition and send it.
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new TopicController();
