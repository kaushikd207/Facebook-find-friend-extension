let friendButton = document.getElementById("friendBtn");
let container = document.getElementsByClassName("container");
friendButton.addEventListener("click", async () => {
  //get the current active tab
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  // Execute script to parse friendList
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: scrapFriendList,
  });
});

// Function to scrap friendList

function scrapFriendList() {
  let PARSEDLIST = document.getElementsByClassName("xzsf02u");
  let data = [];
  for (let i = 23; i < PARSEDLIST.length; i++) {
    data.push(PARSEDLIST[i].innerText);
  }
  if (data == null || data.length == 0) {
    alert("No Friend Found");
  } else {
    alert(data);
  }
}
