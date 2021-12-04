import axios from "axios";
import React, { useState } from "react";
import FileBase64 from "react-file-base64";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState();

  const handleSubmission = () => {
    axios
      .post("http://localhost:8080/img/uploadImg", selectedFile)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  console.log(selectedFile);
  return (
    <div>
      <FileBase64
        type="file"
        multiple={false}
        onDone={({ base64 }) =>
          setSelectedFile({ ...selectedFile, image: base64 })
        }
      />
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
};

export default FileUpload;
