const displayJSON = (data) => {
    const resultDisplay = document.getElementById("response");
    resultDisplay.innerText = JSON.stringify(data, null, 4);
  };

const initiateOAuth = () => {
    window.location.href = '/tests/oauth/initiateOAuth'
}

const get = (url) => {
    displayJSON("testing ...");
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayJSON(data))
        .catch(err => displayJSON(err))
}
