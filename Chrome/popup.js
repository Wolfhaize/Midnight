 document.addEventListener('DOMContentLoaded', function () {
  var themeRadios = document.getElementsByName('theme');
  var selectedTheme;
  

  function saveEnabledTheme(themeID) {
    chrome.storage.local.set({ enabled: themeID });
  }

  function updateSelectedTheme() {
    themeRadios.forEach(function (radio) {
      if (radio.checked) {
        selectedTheme = radio;
        var themeID = selectedTheme.id; // ID of the selected radio button
        saveEnabledTheme(themeID); // Save the selected theme ID in local storage
        console.log('new theme is', themeID);
      }
    });
  }

  // Retrieving the enabled theme from local storage and selecting the corresponding radio button
  chrome.storage.local.get(['enabled'], function (result) {
    var enabledThemeID = result.enabled;
    if (enabledThemeID) {
      var enabledThemeRadio = document.getElementById(enabledThemeID);
      if (enabledThemeRadio) {
        enabledThemeRadio.checked = true;
        selectedTheme = enabledThemeRadio;
      }
    }
  });

  

  // Adding event listeners to the radio buttons to update the selected theme
  themeRadios.forEach(function (radio) {
    radio.addEventListener('change', updateSelectedTheme);
  });
});