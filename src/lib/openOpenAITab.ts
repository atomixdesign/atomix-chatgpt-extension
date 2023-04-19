export const openChatTab = () => {
  chrome.tabs.query({url: "https://chat.openai.com/*" }, function(tabs) {
    if (tabs.length > 0 && tabs[0].id) {
      // If there is at least one tab with the specified URL, activate it
      chrome.tabs.update(tabs[0].id, {active: true});
    } else {
      // If there are no tabs with the specified URL, create a new one
      chrome.tabs.create({ url: "https://chat.openai.com/" })
    }
  });
}
