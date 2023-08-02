const express = require('express');
const fs = require('fs');
const moment = require('moment');

const app = express();
const PORT = 3000; 
// Create the 'files' folder if it doesn't exist
const filesFolder = './files';
if (!fs.existsSync(filesFolder)) {
  fs.mkdirSync(filesFolder);
}
// API endpoint to create a text file with the current timestamp
app.get('/create', (req, res) => {
  

  fs.writeFile(`./files/sample.txt`, "Hey are you there?", (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create the file' });
    } else {
      res.status(201).json({ message: 'File created successfully' });
    }
  });
});
// API endpoint to create a text file with the current timestamp
app.get('/createFile', (req, res) => {
  const currentDate = moment().format('YYYY-MM-DD');
  const currentTime = moment().format('HH:mm:ss');
  const fileName = `${currentDate}.txt`;
  const content = `Current Timestamp: ${currentDate} ${currentTime}`;

  fs.writeFile(`./files/${fileName}`, content, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create the file' });
    } else {
      res.status(201).json({ message: 'File created successfully' });
    }
  });
});

// API endpoint to retrieve all text files in the particular folder
app.get('/getTextFiles', (req, res) => {
  fs.readdir('./files', (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read the folder' });
    } else {
      const textFiles = files.filter((file) => file.endsWith('.txt'));
      res.status(200).json({ files: textFiles });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
