const Submission = require("../models/submission");
const submissionDto = require("../dto/submission");
const subjectDto = require("../dto/subject");
const topicComponentDto = require("../dto/topicComponent");
const userDto = require("../dto/user");
const { unlink } = require("fs");

class SubmissionController {
  get = async (req, res, next) => {
    try {
      const result = await Submission.get(req.query);
      return res.json(submissionDto.submissionToDto(result[0] || {}));
    } catch (error) {
      next(error);
    }
  };

  getList = async (req, res, next) => {
    try {
      const result = await Submission.getList(req.query);
      return res.json(
        result.map((s) => ({
          ...submissionDto.submissionToDto(s),
          ...userDto.userToDto(s),
        }))
      );
    } catch (error) {
      next(error);
    }
  };

  post = async (req, res, next) => {
    try {
      const { submissionDate, studentId, submissionId } = req.body;

      const newpath = "./public/submission";
      const file = req.files.file;
      const fileName = file.name;
      const url = `${newpath}/${submissionId}/${studentId}/${new Date()
        .toISOString()
        .replace(/[:.-]/g, "")}${fileName}`;

      file.mv(url, (err) => {
        if (err) {
          console.log(err);
          next(err);
        }
      });
      await Submission.post({
        url,
        fileName,
        submissionDate,
        studentId: parseInt(studentId),
        submissionId: parseInt(submissionId),
      });

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  put = async (req, res, next) => {
    try {
      const studentSubmissionId = parseInt(req.body.studentSubmissionId);
      const submissionId = parseInt(req.body.submissionId);
      const studentId = parseInt(req.body.studentId);
      const submissionDate = req.body.submissionDate;
      console.log(
        {
          studentSubmissionId,
          submissionId,
          studentId,
          submissionDate,
        },
        req.body.url
      );
      const newpath = "./public/submission";
      const file = req.files.file;
      const fileName = file.name;
      const url = `${newpath}/${submissionId}/${studentId}/${new Date()
        .toISOString()
        .replace(/[:.-]/g, "")}${fileName}`;
      file.mv(url, (err) => {
        if (err) {
          console.log(err);
          next(err);
        }
      });
      unlink(req.body.url, (err) => {
        console.log(err);
      });
      const result = await Submission.put({
        url,
        fileName,
        submissionDate,
        studentSubmissionId,
      });
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const result = await Submission.delete(req.body);
      const { url } = req.body;
      unlink(url, (err) => {
        next(err);
      });
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

  getHomeworkList = async (req, res, next) => {
    try {
      const result = await Submission.selectUnfinishedHomework(req.query);
      res.json(
        result.map((e) => ({
          ...subjectDto.subjectToDto(e),
          ...submissionDto.submissionToDto(e),
          ...topicComponentDto.topicComponentToDto(e),
        }))
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new SubmissionController();
