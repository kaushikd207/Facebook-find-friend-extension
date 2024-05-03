function scrapFriendList() {
  const parentDiv = document.querySelector("div");
  const textContent = parentDiv.textContent.trim();

  let names = [];
  let regex = /([A-Z][a-z]+)\s([A-Z][a-z]+)/g;

  let matches = textContent.match(regex);

  if (matches) {
    names = Array.from(new Set(matches));
  }
  if (names.length > 0) {
    alert("Friend List:\n" + names.join("\n"));
  } else {
    alert("No Friends Found");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const friendButton = document.getElementById("friendBtn");

  friendButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapFriendList,
    });
  });
});
