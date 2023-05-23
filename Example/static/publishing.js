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

const getPublishingEventById = (event) => {
  event.preventDefault();
  const eventId = event.target.eventId.value;
  const fp = fetch(`/tests/publishing/getPublishingEventById/${eventId}`);
  processFetchPromise(fp);
};

const AddPublishingMetadata = (event) => {
  event.preventDefault();
  const eventId = event.target.eventId.value;
  const payload = event.target.payload.value;
  try {
    JSON.parse(payload);
  } catch (err) {
    alert(
      "Your payload is not a valid JSON object.\n" + "error: " + err.message
    );
    return;
  }
  const fp = fetch(`/tests/publishing/AddPublishingMetadata/${eventId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
  processFetchPromise(fp);
};

const getPublishingMetadata = (event) => {
  event.preventDefault();
  const eventId = event.target.eventId.value;
  const fp = fetch(`/tests/publishing/getPublishingMetadata/${eventId}`);
  processFetchPromise(fp);
};

const getPublishingMetadataForAsset = (event) => {
  event.preventDefault();
  const eventId = event.target.eventId.value;
  const assetId = event.target.assetId.value;
  const metadataId = event.target.metadataId.value;
  const fp = fetch(
    `/tests/publishing/getPublishingMetadataForAsset/${eventId}/${assetId}/${metadataId}`
  );
  processFetchPromise(fp);
};
