const { Router } = require("express");
const fs = require('fs');
const path = require('path')
const multer = require("multer");
const { cmpClient } = require("../config");

const upload = multer();
const router = Router();

router.get("/getTask/:taskId", async (req, res) => {
  const userId = req.user.id;
  try {
    const taskId = req.params.taskId;
    const task = await cmpClient.task.getTask(taskId, {
      userId,
    });
    // const readStream = fs.createReadStream(path.join(__dirname, "./myfile.png"));
    // await task.addAsset(await cmpClient.uploader.upload(readStream, undefined, { userId }));

    // const payload = { labels: [{ group: '9b3cbeedf0d4c1f8a18ae445ae041fd2', values: ['742b7c083fbb21ecacd8d245afdc813c']}] };
    // await task.update(payload);

    const [brief, campaign, customFields, assets, attachments] =
      await Promise.all([
        task.getBrief(),
        task.getCampaign(),
        task.getCustomFields(),
        task.getAssets(),
        task.getAttachments(),
      ]);
    return res
      .status(200)
      .json({ task, brief, campaign, customFields, assets, attachments });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ error: err });
  }
});

router.patch("/updateTask/:taskId", async (req, res) => {
  const userId = req.user.id;
  try {
    const taskId = req.params.taskId;
    const payload = req.body;
    const updatedTask = await cmpClient.task.updateTask(taskId, payload, {
      userId,
    });
    return res.status(200).json({ updatedTask });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ error: err });
  }
});

router.get("/getTaskBrief/:taskId", async (req, res) => {
  const userId = req.user.id;
  try {
    const taskId = req.params.taskId;
    const taskBrief = await cmpClient.task.getTaskBrief(taskId, {
      userId,
    });

    return res.status(200).json({ taskBrief });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ error: err });
  }
});

router.get("/getTaskCustomFields/:taskId", async (req, res) => {
  const userId = req.user.id;
  try {
    const taskId = req.params.taskId;
    const taskCustomFieldsBatch1 = await cmpClient.task.getTaskCustomFields(
      taskId,
      {
        pageSize: 2,
        offset: 0,
      },
      {
        userId,
      }
    );
    const taskCustomFieldsBatch2 = await taskCustomFieldsBatch1.getNextBatch();
    let previousBatch = null;
    if (taskCustomFieldsBatch2) {
      previousBatch = await taskCustomFieldsBatch2.getPreviousBatch();
    }
    return res
      .status(200)
      .json({ taskCustomFieldsBatch1, taskCustomFieldsBatch2, previousBatch });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ error: err });
  }
});

router.get("/getTaskCustomField/:taskId/:customFieldId", async (req, res) => {
  const userId = req.user.id;
  try {
    const taskId = req.params.taskId;
    const customFieldId = req.params.customFieldId;
    const taskCustomField = await cmpClient.task.getTaskCustomField(
      taskId,
      customFieldId,
      { userId }
    );
    const choices = await taskCustomField.getChoices({
      pageSize: 2,
      offset: 0,
    });
    return res.status(200).json({ taskCustomField, choices });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ error: err });
  }
});

router.patch(
  "/updateTaskCustomField/:taskId/:customFieldId",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const taskId = req.params.taskId;
      const customFieldId = req.params.customFieldId;
      const payload = req.body;
      const updatedCustomField = await cmpClient.task.updateTaskCustomField(
        taskId,
        customFieldId,
        payload,
        { userId }
      );
      return res.status(200).json({ updatedCustomField });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ error: err });
    }
  }
);

router.get(
  "/getTaskCustomFieldChoices/:taskId/:customFieldId",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const taskId = req.params.taskId;
      const customFieldId = req.params.customFieldId;
      const choices = await cmpClient.task.getTaskCustomFieldChoices(
        taskId,
        customFieldId,
        { pageSize: 6, offset: 0 },
        { userId }
      );
      return res.status(200).json({ choices });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ error: err });
    }
  }
);

router.get("/getTaskSubstep/:taskId/:stepId/:substepId", async (req, res) => {
  const userId = req.user.id;
  try {
    const taskId = req.params.taskId;
    const stepId = req.params.stepId;
    const substepId = req.params.substepId;
    const substep = await cmpClient.task.getTaskSubstep(
      taskId,
      stepId,
      substepId,
      { userId }
    );
  
    const externalWork = await substep.getExternalWork();
    const assignee = await substep.getAssignee();

    // await substep.update({ assigneeId: null });

    return res.status(200).json({ substep, externalWork, assignee });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ error: err });
  }
});

router.patch(
  "/updateTaskSubstep/:taskId/:stepId/:substepId",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const taskId = req.params.taskId;
      const stepId = req.params.stepId;
      const substepId = req.params.substepId;
      const payload = req.body;
      const updatedSubstep = await cmpClient.task.updateTaskSubstep(
        taskId,
        stepId,
        substepId,
        payload,
        { userId }
      );
      return res.status(200).json({ updatedSubstep });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ error: err });
    }
  }
);

router.get(
  "/getTaskSubstepExternalWork/:taskId/:stepId/:substepId",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const taskId = req.params.taskId;
      const stepId = req.params.stepId;
      const substepId = req.params.substepId;
      const externalWork = await cmpClient.task.getTaskSubstepExternalWork(
        taskId,
        stepId,
        substepId,
        { userId }
      );

      // await externalWork.update({ title: "what should it be?" });

      return res.status(200).json({ externalWork });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ error: err });
    }
  }
);

router.patch(
  "/updateTaskSubStepExternalWork/:taskId/:stepId/:substepId",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const taskId = req.params.taskId;
      const stepId = req.params.stepId;
      const substepId = req.params.substepId;
      const payload = req.body;
      const updatedExternalWork =
        await cmpClient.task.updateTaskSubStepExternalWork(
          taskId,
          stepId,
          substepId,
          payload,
          { userId }
        );
      return res.status(200).json({ updatedExternalWork });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ error: err });
    }
  }
);

router.get(
  "/getTaskSubstepComments/:taskId/:stepId/:substepId",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const taskId = req.params.taskId;
      const stepId = req.params.stepId;
      const substepId = req.params.substepId;
      const comments = await cmpClient.task.getTaskSubstepComments(
        taskId,
        stepId,
        substepId,
        { pageSize: 3 },
        { userId }
      );
      return res.status(200).json({ comments });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ error: err });
    }
  }
);

router.post(
  "/addTaskSubstepComment/:taskId/:stepId/:substepId",
  upload.array("file"),
  async (req, res) => {
    const userId = req.user.id;
    try {
      const taskId = req.params.taskId;
      const stepId = req.params.stepId;
      const substepId = req.params.substepId;

      const uploadedFilesPromise = [];
      req.files.forEach((file) => {
        uploadedFilesPromise.push(
          cmpClient.uploader.upload(file.buffer, file.originalname, {
            userId,
          })
        );
      });
      const uploadedFiles = await Promise.all(uploadedFilesPromise);
      const payload = {
        value: req.body.value,
        attachments: uploadedFiles,
      };

      const newComment = await cmpClient.task.addTaskSubstepComment(
        taskId,
        stepId,
        substepId,
        payload,
        { userId }
      );
      return res.status(200).json({ newComment });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ error: err });
    }
  }
);

router.get(
  "/getTaskSubstepComment/:taskId/:stepId/:substepId/:commentId",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const taskId = req.params.taskId;
      const stepId = req.params.stepId;
      const substepId = req.params.substepId;
      const commentId = req.params.commentId;
      const comment = await cmpClient.task.getTaskSubstepComment(
        taskId,
        stepId,
        substepId,
        commentId,
        { userId }
      );
      return res.status(200).json({ comment });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ error: err });
    }
  }
);

router.patch(
  "/updateTaskSubstepComment/:taskId/:stepId/:substepId/:commentId",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const taskId = req.params.taskId;
      const stepId = req.params.stepId;
      const substepId = req.params.substepId;
      const commentId = req.params.commentId;
      const payload = req.body;
      const updatedComment = await cmpClient.task.updateTaskSubstepComment(
        taskId,
        stepId,
        substepId,
        commentId,
        payload,
        { userId }
      );
      return res.status(200).json({ updatedComment });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ error: err });
    }
  }
);

router.delete(
  "/deleteTaskSubstepComment/:taskId/:stepId/:substepId/:commentId",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const taskId = req.params.taskId;
      const stepId = req.params.stepId;
      const substepId = req.params.substepId;
      const commentId = req.params.commentId;
      await cmpClient.task.deleteTaskSubstepComment(
        taskId,
        stepId,
        substepId,
        commentId,
        { userId }
      );
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ error: err });
    }
  }
);

router.get("/getTaskAssets/:taskId", async (req, res) => {
  const userId = req.user.id;
  try {
    const taskId = req.params.taskId;
    const taskAssetsBatch1 = await cmpClient.task.getTaskAssets(
      taskId,
      { pageSize: 3 },
      { userId }
    );
    const taskAssetsBatch2 = await taskAssetsBatch1.getNextBatch();
    return res.status(200).json({ taskAssetsBatch1, taskAssetsBatch2 });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ error: err });
  }
});

router.post(
  "/addTaskAsset/:taskId",
  upload.single("file"),
  async (req, res) => {
    const userId = req.user.id;
    try {
      const taskId = req.params.taskId;
      const uploadedFile = await cmpClient.uploader.upload(
        req.file.buffer,
        req.file.originalname,
        { userId }
      );
      const taskAsset = await cmpClient.task.addTaskAsset(
        taskId,
        uploadedFile,
        { userId }
      );
      return res.status(200).json({ taskAsset });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ error: err });
    }
  }
);

router.post(
  "/addTaskAssetDraft/:taskId/:assetId",
  upload.single("file"),
  async (req, res) => {
    const userId = req.user.id;
    try {
      const taskId = req.params.taskId;
      const assetId = req.params.assetId;
      const uploadedFile = await cmpClient.uploader.upload(
        req.file.buffer,
        req.file.originalname,
        { userId }
      );
      const taskAssetDraft = await cmpClient.task.addTaskAssetDraft(
        taskId,
        assetId,
        uploadedFile,
        { userId }
      );
      return res.status(200).json({ taskAssetDraft });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ error: err });
    }
  }
);

router.get("/getTaskAssetComments/:taskId/:assetId", async (req, res) => {
  const userId = req.user.id;
  try {
    const taskId = req.params.taskId;
    const assetId = req.params.assetId;
    const taskAssetComments = await cmpClient.task.getTaskAssetComments(
      taskId,
      assetId,
      {},
      { userId }
    );
    return res.status(200).json({ taskAssetComments });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ error: err });
  }
});

router.post(
  "/addTaskAssetComment/:taskId/:assetId",
  upload.array("file"),
  async (req, res) => {
    const userId = req.user.id;
    try {
      const taskId = req.params.taskId;
      const assetId = req.params.assetId;

      const uploadedFilesPromise = [];
      req.files.forEach((file) => {
        uploadedFilesPromise.push(
          cmpClient.uploader.upload(file.buffer, file.originalname, {
            userId,
          })
        );
      });
      const uploadedFiles = await Promise.all(uploadedFilesPromise);
      const payload = {
        value: req.body.value,
        attachments: uploadedFiles,
      };

      const newComment = await cmpClient.task.addTaskAssetComment(
        taskId,
        assetId,
        payload,
        { userId }
      );
      return res.status(200).json({ newComment });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({ error: err });
    }
  }
);

router.get("/getTaskAttachments/:taskId", async (req, res) => {
  const userId = req.user.id;
  try {
    const taskId = req.params.taskId;
    const taskAttachmentsBatch1 = await cmpClient.task.getTaskAttachments(
      taskId,
      { pageSize: 3 },
      { userId }
    );
    const taskAttachmentsBatch2 = await taskAttachmentsBatch1.getNextBatch();
    return res
      .status(200)
      .json({ taskAttachmentsBatch1, taskAttachmentsBatch2 });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ error: err });
  }
});

router.get("/getTaskArticle/:taskId/:articleId", async (req, res) => {
  const userId = req.user.id;
  try {
    const taskId = req.params.taskId;
    const articleId = req.params.articleId;
    const taskArticle = await cmpClient.task.getTaskArticle(
      taskId,
      articleId,
      { userId }
    );
    return res.status(200).json({ taskArticle });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ error: err });
  }
});

router.get("/getTaskImage/:taskId/:imageId", async (req, res) => {
  const userId = req.user.id;
  try {
    const taskId = req.params.taskId;
    const imageId = req.params.imageId;
    const taskImage = await cmpClient.task.getTaskImage(taskId, imageId, {
      userId,
    });
    return res.status(200).json({ taskImage });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ error: err });
  }
});

router.get("/getTaskVideo/:taskId/:videoId", async (req, res) => {
  const userId = req.user.id;
  try {
    const taskId = req.params.taskId;
    const videoId = req.params.videoId;
    const taskVideo = await cmpClient.task.getTaskVideo(taskId, videoId, {
      userId,
    });
    return res.status(200).json({ taskVideo });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ error: err });
  }
});

router.get("/getTaskRawFile/:taskId/:rawFileId", async (req, res) => {
  const userId = req.user.id;
  try {
    const taskId = req.params.taskId;
    const rawFileId = req.params.rawFileId;
    const taskRawFile = await cmpClient.task.getTaskRawFile(
      taskId,
      rawFileId,
      { userId }
    );
    return res.status(200).json({ taskRawFile });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ error: err });
  }
});

module.exports = router;
