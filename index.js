function scrapFriendList() {
  const targetDivs = document.querySelectorAll(
    'div[data-visualcompletion="ignore-dynamic"]'
  );

  let friendName = [];


  targetDivs.forEach((div) => {
    const anchorElements = document.querySelectorAll("a");
    anchorElements.forEach((anchor) => {
      const svgWithAriaLabel = anchor.querySelector("svg[aria-label]");
      if (svgWithAriaLabel) {
        const name = svgWithAriaLabel.getAttribute("aria-label").trim();
        const profileLink = anchor.getAttribute("href");
        friendName.push(name);
        console.log("Name:", name);
        console.log("Profile Link:", profileLink);
      }
    });
  });
  alert(friendName);
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
