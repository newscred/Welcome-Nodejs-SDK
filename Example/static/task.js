const resultDisplay = document.getElementById("response");

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

const getTask = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const fp = fetch(`/tests/task/getTask/${taskId}`);
  processFetchPromise(fp);
};

const updateTask = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const payload = event.target.taskUpdatePayload.value;
  try {
    JSON.parse(payload);
  } catch (err) {
    alert(
      "Your payload is not a valid JSON object.\n" + "error: " + err.message
    );
    return;
  }
  const fp = fetch(`/tests/task/updateTask/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
  processFetchPromise(fp);
};

const getTaskBrief = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const fp = fetch(`/tests/task/getTaskBrief/${taskId}`);
  processFetchPromise(fp);
};

const getTaskCustomFields = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const fp = fetch(`/tests/task/getTaskCustomFields/${taskId}`);
  processFetchPromise(fp);
};

const getTaskCustomField = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const customFieldId = event.target.customFieldId.value;
  const fp = fetch(`/tests/task/getTaskCustomField/${taskId}/${customFieldId}`);
  processFetchPromise(fp);
};

const updateTaskCustomField = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const customFieldId = event.target.customFieldId.value;
  const payload = event.target.customFieldIdUpdate.value;
  try {
    JSON.parse(payload);
  } catch (err) {
    alert(
      "Your payload is not a valid JSON object.\n" + "error: " + err.message
    );
    return;
  }
  const fp = fetch(
    `/tests/task/updateTaskCustomField/${taskId}/${customFieldId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    }
  );
  processFetchPromise(fp);
};

const getTaskCustomFieldChoices = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const customFieldId = event.target.customFieldId.value;
  const fp = fetch(
    `/tests/task/getTaskCustomFieldChoices/${taskId}/${customFieldId}`
  );
  processFetchPromise(fp);
};

const getTaskSubstep = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const stepId = event.target.stepId.value;
  const subStepId = event.target.subStepId.value;
  const fp = fetch(
    `/tests/task/getTaskSubstep/${taskId}/${stepId}/${subStepId}`
  );
  processFetchPromise(fp);
};

const updateTaskSubstep = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const stepId = event.target.stepId.value;
  const subStepId = event.target.subStepId.value;
  const payload = event.target.update.value;
  try {
    JSON.parse(payload);
  } catch (err) {
    alert(
      "Your payload is not a valid JSON object.\n" + "error: " + err.message
    );
    return;
  }
  const fp = fetch(
    `/tests/task/updateTaskSubstep/${taskId}/${stepId}/${subStepId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    }
  );
  processFetchPromise(fp);
};

const getTaskSubstepExternalWork = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const stepId = event.target.stepId.value;
  const subStepId = event.target.subStepId.value;
  const fp = fetch(
    `/tests/task/getTaskSubstepExternalWork/${taskId}/${stepId}/${subStepId}`
  );
  processFetchPromise(fp);
};

const updateTaskSubStepExternalWork = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const stepId = event.target.stepId.value;
  const subStepId = event.target.subStepId.value;
  const payload = event.target.update.value;
  try {
    JSON.parse(payload);
  } catch (err) {
    alert(
      "Your payload is not a valid JSON object.\n" + "error: " + err.message
    );
    return;
  }
  const fp = fetch(
    `/tests/task/updateTaskSubStepExternalWork/${taskId}/${stepId}/${subStepId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    }
  );
  processFetchPromise(fp);
};

const getTaskSubstepComments = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const stepId = event.target.stepId.value;
  const subStepId = event.target.subStepId.value;
  const fp = fetch(
    `/tests/task/getTaskSubstepComments/${taskId}/${stepId}/${subStepId}`
  );
  processFetchPromise(fp);
};

const addTaskSubstepComment = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const stepId = event.target.stepId.value;
  const subStepId = event.target.subStepId.value;
  const files = event.target.file.files;
  const formData = new FormData();
  for (let file of files) {
    formData.append("file", file);
  };
  formData.append('value', event.target.comment.value)
  const fp = fetch(`/tests/task/addTaskSubstepComment/${taskId}/${stepId}/${subStepId}`, {
    method: "POST",
    body: formData,
  });
  processFetchPromise(fp);
};

const getTaskSubstepComment = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const stepId = event.target.stepId.value;
  const subStepId = event.target.subStepId.value;
  const commentId = event.target.commentId.value;
  const fp = fetch(
    `/tests/task/getTaskSubstepComment/${taskId}/${stepId}/${subStepId}/${commentId}`
  );
  processFetchPromise(fp);
};

const updateTaskSubstepComment = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const stepId = event.target.stepId.value;
  const subStepId = event.target.subStepId.value;
  const commentId = event.target.commentId.value;
  const payload = event.target.update.value;
  try {
    JSON.parse(payload);
  } catch (err) {
    alert(
      "Your payload is not a valid JSON object.\n" + "error: " + err.message
    );
    return;
  }
  const fp = fetch(
    `/tests/task/updateTaskSubstepComment/${taskId}/${stepId}/${subStepId}/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    }
  );
  processFetchPromise(fp);
};

const deleteTaskSubstepComment = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const stepId = event.target.stepId.value;
  const subStepId = event.target.subStepId.value;
  const commentId = event.target.commentId.value;
  const fp = fetch(
    `/tests/task/deleteTaskSubstepComment/${taskId}/${stepId}/${subStepId}/${commentId}`,
    {
      method: "DELETE",
    }
  );
  processFetchPromise(fp);
};

const getTaskAssets = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const fp = fetch(`/tests/task/getTaskAssets/${taskId}`);
  processFetchPromise(fp);
};

const addTaskAsset = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const file = event.target.file.files[0];
  const formData = new FormData();
  formData.append("file", file);
  const fp = fetch(`/tests/task/addTaskAsset/${taskId}`, {
    method: "POST",
    body: formData,
  });
  processFetchPromise(fp);
};

const addTaskAssetDraft = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const assetId = event.target.assetId.value;
  const file = event.target.file.files[0];
  const formData = new FormData();
  formData.append("file", file);
  const fp = fetch(`/tests/task/addTaskAssetDraft/${taskId}/${assetId}`, {
    method: "POST",
    body: formData,
  });
  processFetchPromise(fp);

};

const getTaskAssetComments = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const assetId = event.target.assetId.value;
  const fp = fetch(`/tests/task/getTaskAssetComments/${taskId}/${assetId}`);
  processFetchPromise(fp);
};

const addTaskAssetComment = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const assetId = event.target.assetId.value;
  const files = event.target.file.files;
  const formData = new FormData();
  for (let file of files) {
    formData.append("file", file);
  };
  formData.append('value', event.target.comment.value)
  const fp = fetch(`/tests/task/addTaskAssetComment/${taskId}/${assetId}`, {
    method: "POST",
    body: formData,
  });
  processFetchPromise(fp);
};

const getTaskAttachments = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const fp = fetch(`/tests/task/getTaskAttachments/${taskId}`);
  processFetchPromise(fp);
};

const getTaskArticle = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const articleId = event.target.articleId.value;
  const fp = fetch(`/tests/task/getTaskArticle/${taskId}/${articleId}`);
  processFetchPromise(fp);
};

const getTaskImage = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const imageId = event.target.imageId.value;
  const fp = fetch(`/tests/task/getTaskImage/${taskId}/${imageId}`);
  processFetchPromise(fp);
};

const getTaskVideo = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const videoId = event.target.videoId.value;
  const fp = fetch(`/tests/task/getTaskVideo/${taskId}/${videoId}`);
  processFetchPromise(fp);
};

const getTaskRawFile = (event) => {
  event.preventDefault();
  const taskId = event.target.taskId.value;
  const rawFileId = event.target.rawFileId.value;
  const fp = fetch(`/tests/task/getTaskRawFile/${taskId}/${rawFileId}`);
  processFetchPromise(fp);
};
