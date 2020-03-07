import auth from "solid-auth-client";

async function getWebId() {
  /* 1. Check if we've already got the user's WebID and access to their Pod: */
  let session = await auth.currentSession();
  if (session) {
    return session.webId;
  }

  /* 2. User has not logged in; ask for their Identity Provider: */
  // Implement `getIdentityProvider` to get a string with the user's Identity Provider (e.g.
  // `https://inrupt.net` or `https://solid.community`) using a method of your choice.
  const identityProvider = await getIdentityProvider();
  /* 3. Initialise the login process - this will redirect the user to their Identity Provider: */
  auth.login(identityProvider);
}

function getIdentityProvider() {
  const loading = document.getElementById("loading");
  loading.style.display = "none";
  const form = document.forms.idpForm;
  form.style.display = "initial";

  const idpPromise = new Promise((resolve, _reject) => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      resolve(form.elements.identity_provider.value);
    });
  });

  return idpPromise;
}

getWebId().then(webId => {
  const loading = document.getElementById("loading");
  loading.style.display = "none";
  const webIdElement = document.getElementById("webId");
  webIdElement.textContent = webId;
  const webIdDisplay = document.getElementById("webIdDisplay");
  webIdDisplay.style.display = "initial";
});
