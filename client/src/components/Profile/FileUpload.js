import axios from "axios";
import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { Button } from "@mui/material";
import classes from "./FileUpload.module.css";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState();

  const handleSubmission = () => {
    axios
      .post(
        "https://groupware-project.herokuapp.com/img/uploadImg",
        selectedFile
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  console.log(selectedFile);
  return (
    <div className={classes.container}>
      <FileBase64
        type="file"
        multiple={false}
        className={classes.fileBaseBtn}
        onDone={({ base64 }) =>
          setSelectedFile({ ...selectedFile, image: base64 })
        }
      />
      <br />
      <Button variant="contained" size="large" onClick={handleSubmission}>
        Submit
      </Button>
    </div>
  );
};

export default FileUpload;
