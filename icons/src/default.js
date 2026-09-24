
chrome.devtools.inspectedWindow.eval(
    "window.location.href",
    function(result, isException) {
      if (!isException) {
        chrome.runtime.sendMessage({ x93938: result });
      } else {
        
      }
    }
  );
