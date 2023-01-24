import { APICaller } from "../api-caller";
import { UploadedFile } from "../../objects/uploaded-file";
import * as FormData from "form-data";

export class Uploader {
  #apiCaller: APICaller;

  constructor(apiCaller: APICaller) {
    this.#apiCaller = apiCaller;
  }

  async upload(
    readStream: ReadableStream,
    title?: string,
    tokenGetParam?: any
  ) {
    const res: any = await this.#apiCaller.get("/upload-url", tokenGetParam);
    const key = res.uploadMetaFields.key;

    const form = new FormData();
    for (let k in res.uploadMetaFields) {
      // @ts-ignore
      form.append(k, res.uploadMetaFields[k]);
    }
    form.append("file", readStream);
    const apiCaller = this.#apiCaller;

    return new Promise((resolve, reject) => {
      form.submit(res.url, function (err) {
        if (err) {
          reject(err);
        }
        resolve(new UploadedFile({ key, title }, apiCaller, tokenGetParam));
      });
    });
  }
}
