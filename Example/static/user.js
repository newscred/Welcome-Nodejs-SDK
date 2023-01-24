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

const getUserById = (event) => {
  event.preventDefault();
  const userId = event.target.userId.value;
  const fp = fetch(`/tests/user/getUserById/${userId}`);
  processFetchPromise(fp);
};

const getUserByEmail = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const fp = fetch(`/tests/user/getUserByEmail/${email}`);
    processFetchPromise(fp);
  };
  