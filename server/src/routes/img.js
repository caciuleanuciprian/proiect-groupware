const express = require("express");
const imgModule = require("../modules/img");
const { upload } = require("./middlewares/imgUpload");

const imgroute = express.Router();

imgroute.get("/img/:id", (req, res) => {
  imgModule.findById(req.params.id, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.json({ items });
    }
  });
});

imgroute.post("/uploadImg", upload.single("image"), (req, res, next) => {
  const obj = {
    img: {
      data: req.file.buffer,
      contentType: req.file.mimetype || "image/png",
    },
  };
  console.log(obj);

  imgModule.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.json({ succes: "" });
    }
  });
});

module.exports = imgroute;
