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

const getLabelGroups = (event) => {
  event.preventDefault();
  const fp = fetch("/tests/label/getLabelGroups");
  processFetchPromise(fp);
};
