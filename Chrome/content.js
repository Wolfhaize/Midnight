chrome.storage.local.get(['enabled'], function(result) {
  var enabled = result.enabled;
  if (enabled === undefined) {
    // Set the default value of enabled to true if it's not stored yet
    enabled = true;
    chrome.storage.local.set({ enabled: enabled });
  }

  applyTheme(enabled);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.enabled !== undefined) {
    applyTheme(request.enabled);
  }
});

function applyTheme(enabled, reload) {
  if (enabled === 'none') {
    removeCSS();
  } else {
    var cssFileName = 'themes/' + enabled + 'theme.css';
    injectCSS(cssFileName);
   
    startCheck();
  }

  if (reload) {
    location.reload();
  }
}



function injectCSS(fileName) {
  var styleElement = document.createElement('link');
  styleElement.rel = 'stylesheet';
  styleElement.type = 'text/css';
  styleElement.href = chrome.runtime.getURL(fileName);
  styleElement.id = 'themeCSS';
  document.head.appendChild(styleElement);

  
}

function startCheck() {

  intervalId = setInterval(() => {

    if(!document.getElementById('themeCSS')) {
      chrome.storage.local.get(['enabled'], function(result) {
        var enabled = result.enabled;
        if (enabled === undefined) {
          // Set the default value of enabled to true if it's not stored yet
          enabled = true;
          chrome.storage.local.set({ enabled: enabled });
        }
      
        applyTheme(enabled);
      });
    } 

  }, 1);

  
}

function removeCheck() {
  clearInterval(intervalId);
  
}

function removeCSS() {
  var styleElement = document.getElementById('themeCSS');
  if (styleElement) {
    styleElement.remove();
    removeCheck();
  }

}




