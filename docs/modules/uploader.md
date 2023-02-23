# Uploader

The `uploader` module provides way to upload files to _Welcome_ from your app. The uploaded files can be used to save as Library or Task assets or as attachments in comments, tasks etc. The module provides the following method.

## `upload`

**_parameters:_**

- readStream: ReadableStream
- title: string (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise<[UploadedFile](../objects/UploadedFile.md)>

Uploads a file to Welcome. It takes a read stream of the file that is to be uploaded as its first parameter. The second parameter is the title of the file which is optional. If omited, the default title will be "(no title)"

**Example**

```javascript
const readStream = fs.createReadStream("myfile.mp4");
const uploadedFile = await app.uploader.upload(readStream);
uploadedFile.title = "My File";
// do something with the uploaded file
// await uploadedFile.createAsset()
```

Example with express and [multer](https://github.com/expressjs/multer) middleware

```javascript
const welcomeClient = new WelcomeClient(param);
const app = express();
const upload = multer();
app.post("/upload", upload.single("file"), async (req, res) => {
  const uploadedFile = await welcomeClient.uploader.upload(
    req.file.buffer,
    req.file.originalname
  );
  // do something with the uploaded file
  // const asset = await uploadedFile.createAsset();
  return res.json({ success: true });
});
```
