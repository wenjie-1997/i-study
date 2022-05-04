const subject = require("../models/subject");
const subjectDto = require("../dto/subject");

class SubjectController {
  get = async (req, res, next) => {
    try {
      const result = await subject.get(req.query);
      return res.json(
        result.map((subject) => subjectDto.subjectToDto(subject))
      );
    } catch (error) {
      next(error);
    }
  };

  post = async (req, res, next) => {
    try {
      const result = await subject.post(req.body);
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  put = async (req, res, next) => {
    try {
      const result = await subject.put(req.body);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const result = await subject.delete(req.body);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new SubjectController();
