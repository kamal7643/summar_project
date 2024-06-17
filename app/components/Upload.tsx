"use client";
import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AiOutlineUpload } from "react-icons/ai";
import { storage } from "@/lib/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [age, setAge] = useState<number>(0);

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDownloadURL(downloadURL);
            console.log("File available at:", downloadURL);
          });
        },
      );
    }
  };

  const handleChange = (event: any) => {
    setAge(Number(event.target.value));
  };

  return (
    <div className="flex w-full justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md space-y-4 flex flex-col">
        <Typography variant="h5" className="mb-4 text-center ">
          Post a new video
        </Typography>
        <TextField fullWidth label="Title" variant="outlined" />
        <TextField fullWidth label="Description" variant="outlined" />
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 w-full px-3 py-2 border rounded"
        />
        <FormControl
          sx={{ m: 1 }}
          size="medium"
          className="w-full p-2 relative left-[-10px]"
        >
          <InputLabel id="demo-select-small-label">Age </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Age"
            fullWidth
            onChange={handleChange}
          >
            <MenuItem value={0}>Public</MenuItem>
            <MenuItem value={1}>Private</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AiOutlineUpload />}
          onClick={handleUpload}
          className="w-full mb-4"
        >
          Upload
        </Button>
        {progress > 0 && (
          <div className="w-full mb-4">
            <Typography variant="body1" className="text-center mb-2">
              Upload Progress: {Math.round(progress)}%
            </Typography>
            <LinearProgress variant="determinate" value={progress} />
          </div>
        )}
        {downloadURL && (
          <div className="w-full">
            <Typography variant="body1" className="text-center">
              File available at:{" "}
              <a href={downloadURL} target="_blank" rel="noopener noreferrer">
                {downloadURL}
              </a>
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
