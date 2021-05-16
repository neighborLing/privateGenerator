const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 3009;
const mammoth = require("mammoth");
const upload = multer({
  dest: path.join(__dirname, '../file')
})
const fs = require('fs');
const { tablehandle } = require('./utils/htmlTransform.js');

app.use(express.static(path.join(__dirname, '../file')));
app.use(upload.any())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", ["X-Requested-With", "Content-Type"]);
  res.header("Access-Control-Allow-Methods","*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.post('/docxUpload', async (req, res) => {
  const { files } = req;
  const { path } = files[0];
  let { value, messages } = await mammoth.convertToHtml({path});
  console.log('value: ', value);
  value = tablehandle({
    value
  })


  res.json({
    value,
    messages
  })
})

app.post('/fileGenerator', async (req, res) => {
  const body = req.body;
  const { content, type, fileName } = body;
  const timestamp = new Date().getTime();

  switch (type) {
    case 'js':
      break;
    case 'html':
      break;
  }

  const filePath = `${fileName || timestamp}.${type}`;
  
  await fs.writeFileSync(path.join(__dirname, `../file/${filePath}`), `"${content}"`);

  res.json({
    filePath
  });
})

app.get(`/:filePath/download`, (req, res) => {
  const { filePath } = req.params;
  res.download(path.join(__dirname, `../file/${filePath}`));
})

app.listen(port, () => {
  console.log(`listen at ${port}`);
})