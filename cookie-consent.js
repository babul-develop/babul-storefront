(() => {
  const storageKey = "babul.analytics-consent";
  const containerId = "GTM-KH2CH6DF";
  const loaderFlag = "__babulGtmLoaded";
  const banner = document.querySelector("[data-cookie-consent]");

  const loadTagManager = () => {
    if (window[loaderFlag]) return;

    window[loaderFlag] = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
    document.head.appendChild(script);
  };

  if (!banner) {
    try {
      if (window.localStorage.getItem(storageKey) === "accepted") loadTagManager();
    } catch (error) {
      console.error("Could not read the saved analytics preference.", error);
    }
    return;
  }

  const status = banner.querySelector("[data-cookie-consent-status]");
  const showStorageError = (message) => {
    status.textContent = message;
    status.hidden = false;
  };
  let savedChoice;

  try {
    savedChoice = window.localStorage.getItem(storageKey);
  } catch (error) {
    console.error("Could not read the saved analytics preference.", error);
    showStorageError("We couldn’t read your saved choice. Optional analytics remain off.");
  }

  if (savedChoice === "accepted" || savedChoice === "rejected") {
    banner.hidden = true;
    if (savedChoice === "accepted") loadTagManager();
    return;
  }

  banner.querySelectorAll("[data-cookie-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.cookieChoice;

      if (choice !== "accepted" && choice !== "rejected") {
        showStorageError("That cookie choice is unavailable.");
        return;
      }

      try {
        window.localStorage.setItem(storageKey, choice);
      } catch (error) {
        console.error("Could not save the analytics preference.", error);
        showStorageError("We couldn’t save your choice. Optional analytics remain off.");
        return;
      }

      if (choice === "accepted") loadTagManager();
      banner.hidden = true;
    });
  });
})();
