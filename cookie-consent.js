(() => {
  const storageKey = "babul.analytics-consent";
  const banner = document.querySelector("[data-cookie-consent]");

  if (!banner) return;

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

      banner.hidden = true;
    });
  });
})();
