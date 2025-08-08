import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Input,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const FileConverter = () => {
  const [file, setFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormatChange = (event) => {
    setTargetFormat(event.target.value);
  };

  const handleSubmit = () => {
    if (!file || !targetFormat) {
      alert("Please select a file and target format");
      return;
    }

    //Sends data to the backend
    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", targetFormat);

    fetch("http://localhost:5000/convert", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.blob())
      .then((convertedFile) => {
        const url = window.URL.createObjectURL(convertedFile);
        const a = document.createElement("a");
        a.href = url;
        a.download = `converted.${targetFormat}`;
        a.click();
      })
      .catch((err) => {
        console.error("Conversion error:", err);
        alert("Error converting file");
      });
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: 500,
        p: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          File Converter
        </Typography>

        <Button variant="outlined" component="label">
          Upload File
          <Input
            type="file"
            onChange={handleFileChange}
            sx={{ display: "none" }}
          />
        </Button>
        {file && (
          <Typography variant="body2" color="text.secondary">
            Selected: {file.name}
          </Typography>
        )}

        <FormControl fullWidth>
          <InputLabel id="format-label">Convert To</InputLabel>
          <Select
            labelId="format-label"
            value={targetFormat}
            label="Convert To"
            onChange={handleFormatChange}
          >
            <MenuItem value="jpeg">JPEG</MenuItem>
            <MenuItem value="png">PNG</MenuItem>
            <MenuItem value="webp">WEBP</MenuItem>
            <MenuItem value="gif">GIF</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Convert
        </Button>
      </Box>
    </Box>
  );
};

export default FileConverter;
