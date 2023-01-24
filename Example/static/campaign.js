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

const getCampaignById = (event) => {
  event.preventDefault();
  const campaignId = event.target.campaignId.value;
  const fp = fetch(`/tests/campaign/getCampaignById/${campaignId}`);
  processFetchPromise(fp);
};

const getCampaignBrief = (event) => {
    event.preventDefault();
    const campaignId = event.target.campaignId.value;
    const fp = fetch(`/tests/campaign/getCampaignBrief/${campaignId}`);
    processFetchPromise(fp);
  };
  