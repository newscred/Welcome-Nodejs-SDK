const resultDisplay = document.getElementById("response");

function buildQueryString(obj) {
  let query = "";
  const addQueryParam = (key, value) => {
    query += query ? "&" : "?";
    query += `${key}=${value}`;
  }
  for (let k of Object.keys(obj)) {
    if(Array.isArray(obj[k])) {
      const values = obj[k];
      values.forEach((value) => {
        addQueryParam(k, value)
      });
    } else {
      addQueryParam(k, obj[k])
    }
  }
  return query;
}

const displayJSON = (data) => {
  resultDisplay.innerText = JSON.stringify(data, null, 4);
};

const processFetchPromise = (fetchPromise) => {
  displayJSON("testing ...");
  fetchPromise
    .then((res) => res.json())
    .then((data) => displayJSON(data))
    .catch((err) => displayJSON(err));
};

const getFolders = (event) => {
  event.preventDefault();
  const fp = fetch(`/tests/library/getFolders`);
  processFetchPromise(fp);
};

const getFolderById = (event) => {
  event.preventDefault();
  const folderId = event.target.folderId.value;
  const fp = fetch(`/tests/library/getFolderById/${folderId}`);
  processFetchPromise(fp);
};

const getAssets = (event) => {
  event.preventDefault();
  const query = {};
  const typeOptions = ["image", "video", "raw_file", "article"];
  const types = [];
  const createdAt_From = event.target.createdAt_From.value;
  const createdAt_To = event.target.createdAt_To.value;
  const modifiedAt_From = event.target.modifiedAt_From.value;
  const modifiedAt_To = event.target.modifiedAt_To.value;
  const folderId = event.target.folderId.value;
  const searchText = event.target.searchText.value;
  typeOptions.forEach((t) => {
    if (event.target[t].checked) types.push(t);
  });
  if (types.length) query.type = types;

  if (createdAt_From)
    query.createdAt_From =
      new Date(createdAt_From).toISOString().split(".").shift() + "Z";
  if (createdAt_To)
    query.createdAt_To =
      new Date(createdAt_To).toISOString().split(".").shift() + "Z";
  if (modifiedAt_From)
    query.modifiedAt_From =
      new Date(modifiedAt_From).toISOString().split(".").shift() + "Z";
  if (modifiedAt_To)
    query.modifiedAt_To =
      new Date(modifiedAt_To).toISOString().split(".").shift() + "Z";
  if (folderId) 
    query.folderId = folderId;
  if (searchText)
   query.searchText = searchText;
  query.includeSubfolderAssets = event.target.includeSubfolderAssets.checked;
  const queryString = buildQueryString(query)
  const fp = fetch('/tests/library/getAssets' + queryString);
  processFetchPromise(fp);
};

const addAsset = (event) => {
  event.preventDefault();
  const file = event.target.file.files[0];
  const formData = new FormData();
  formData.append("file", file);
  const fp = fetch("/tests/library/addAsset", {
    method: "POST",
    body: formData,
  });
  processFetchPromise(fp);
};

const addAssetVersion = (event) => {
  event.preventDefault();
  const assetId = event.target.assetId.value;
  const file = event.target.file.files[0];
  const formData = new FormData();
  formData.append("file", file);
  const fp = fetch(`/tests/library/addAssetVersion/${assetId}`, {
    method: "POST",
    body: formData,
  });
  processFetchPromise(fp);
};

const getArticle = (event) => {
  event.preventDefault();
  const articleId = event.target.articleId.value;
  const fp = fetch(`/tests/library/getArticle/${articleId}`);
  processFetchPromise(fp);
};

const getImage = (event) => {
  event.preventDefault();
  const imageId = event.target.imageId.value;
  const fp = fetch(`/tests/library/getImage/${imageId}`);
  processFetchPromise(fp);
};

const updateImage = (event) => {
  event.preventDefault();
  const imageId = event.target.imageId.value;
  const payload = event.target.update.value;
  try {
    JSON.parse(payload);
  } catch (err) {
    alert(
      "Your payload is not a valid JSON object.\n" + "error: " + err.message
    );
    return;
  }
  const fp = fetch(`/tests/library/updateImage/${imageId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
  processFetchPromise(fp);
};

const deleteImage = (event) => {
  event.preventDefault();
  const imageId = event.target.imageId.value;
  const fp = fetch(`/tests/library/deleteImage/${imageId}`, {
    method: "DELETE",
  });
  processFetchPromise(fp);
};

const getVideo = (event) => {
  event.preventDefault();
  const videoId = event.target.videoId.value;
  const fp = fetch(`/tests/library/getVideo/${videoId}`);
  processFetchPromise(fp);
};

const updateVideo = (event) => {
  event.preventDefault();
  const videoId = event.target.videoId.value;
  const payload = event.target.update.value;
  try {
    JSON.parse(payload);
  } catch (err) {
    alert(
      "Your payload is not a valid JSON object.\n" + "error: " + err.message
    );
    return;
  }
  const fp = fetch(`/tests/library/updateVideo/${videoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
  processFetchPromise(fp);
};

const deleteVideo = (event) => {
  event.preventDefault();
  const videoId = event.target.videoId.value;
  const fp = fetch(`/tests/library/deleteVideo/${videoId}`, {
    method: "DELETE",
  });
  processFetchPromise(fp);
};

const getRawFile = (event) => {
  event.preventDefault();
  const rawFileId = event.target.rawFileId.value;
  const fp = fetch(`/tests/library/getRawFile/${rawFileId}`);
  processFetchPromise(fp);
};

const updateRawFile = (event) => {
  event.preventDefault();
  const rawFileId = event.target.rawFileId.value;
  const payload = event.target.update.value;
  try {
    JSON.parse(payload);
  } catch (err) {
    alert(
      "Your payload is not a valid JSON object.\n" + "error: " + err.message
    );
    return;
  }
  const fp = fetch(`/tests/library/updateRawFile/${rawFileId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
  processFetchPromise(fp);
};

const deleteRawFile = (event) => {
  event.preventDefault();
  const rawFileId = event.target.rawFileId.value;
  const fp = fetch(`/tests/library/deleteRawFile/${rawFileId}`, {
    method: "DELETE",
  });
  processFetchPromise(fp);
};
