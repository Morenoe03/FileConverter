import React,  {useState} from 'react'
import { Typography, Box, Button,  } from '@mui/material'

export const FileConverter = () => {

    cosnt [file, setFile] = useState(null);

    const handedleFileChange = (event) => {
        setFile(event.target.files[0]);
    };



  return (
    <Containter maxWidth="sm" sx= {{ mt: 5}}>
        <Typography variant="h4" gutterBottom>
            File Buddy: The easy way to convert files
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
            <Button variant="outlined" component="label">
                Upload File
                <Input type="file" onChange={handedleFileChange} sx={{display: 'none'}}
                />
            </Button>
            {file && <Typography>Selected: {file.name}</Typography>}

        </Box>
    </Containter>
  )
}

export default FileConverter;