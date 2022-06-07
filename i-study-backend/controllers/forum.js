const Forum = require("../models/forum");
const forumDto = require("../dto/forum");

class ForumController {
  get = async (req, res, next) => {
    try {
      const result = await Forum.get(req.query);
      return res.json(result.map((subject) => forumDto.forumToDTO(subject)));
    } catch (error) {
      next(error);
    }
  };

  post = async (req, res, next) => {
    try {
      const result = await Forum.post(req.body);
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  put = async (req, res, next) => {
    try {
      const result = await Forum.put(req.body);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const result = await Forum.delete(req.body);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ForumController();
