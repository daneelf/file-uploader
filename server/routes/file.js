const express = require("express");
const multer = require("multer");
const File = require("../model/file");
const Router = express.Router();
const path = require("path");
const fs = require("fs");

const FILE_SIZE = 104857600;

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./public/files");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: FILE_SIZE, // max file size 1MB = 1000000 bytes
  },
});

Router.post(
  "/v1/api/audio/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const { filename, path, mimetype, size } = req.file;
      const file = new File({
        filename: filename,
        file_path: path,
        file_mimetype: mimetype,
        size: size,
      });
      await file.save();
      res.send("file uploaded successfully.");
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.send("Opps! Try again!");
      res.status(500).send(error.message);
    }
  }
);

Router.get("/v1/api/audio/all", async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

Router.delete("/v1/api/audio/delete/:id", (req, res) => {
  try {
    fs.unlinkSync("./public/files/" + req.query.file);
    res.status(200).send("File succesfully deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }

  File.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      res.send(err.message);
    }
  });
});

Router.post("/v1/api/audio/delete/all", (req, res) => {
  File.deleteMany({})
    .then(function () {
      res.send("...and then the're were none!");
    })
    .catch(function (error) {
      res.send(error.message);
    });
});

module.exports = Router;
