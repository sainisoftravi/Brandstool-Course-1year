(function () {
    'use strict';
  
    // Extract the base domain (like example.com)
    function extractBaseDomain(url) {
      let host = url.includes("//") ? url.split("/")[2] : url.split("/")[0];
      if (host.length > 2) {
        host = host.split(".").slice(-2).join(".");
      }
      return host;
    }
  
    // Send encoded domain name to Chrome extension (for Envato special handling)
    function notifyExtensionEnvato(domain) {
      const encoded = btoa(domain);
      const message = {
        o: encoded,
        src: "c"
      };
  
      chrome.runtime.sendMessage({ type: "get", data: JSON.stringify(message) }, function (response) {
        if (response && domain === "envato.com" && !sessionStorage.tlz_reload) {
          sessionStorage.tlz_reload = 1;
          location.reload();
        }
      });
    }
    function startPingingBackground() {
      const interval = setInterval(() => {
        try {
          chrome.runtime.sendMessage({ type: 'PING' }, (response) => {
            if (chrome.runtime.lastError || !response?.active) {
              // Clear localStorage
              localStorage.clear();

              // Clear sessionStorage
              sessionStorage.clear();

              
              var cookies = document.cookie.split("; ");
              for (var c = 0; c < cookies.length; c++) {
                  var d = window.location.hostname.split(".");
                  while (d.length > 0) {
                      var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
                      var p = location.pathname.split('/');
                      document.cookie = cookieBase + '/';
                      while (p.length > 0) {
                          document.cookie = cookieBase + p.join('/');
                          p.pop();
                      };
                      d.shift();
                  }
              }
            
              // Clear IndexedDB
              if (window.indexedDB?.databases) {
                indexedDB.databases().then(dbs => {
                  dbs.forEach(db => indexedDB.deleteDatabase(db.name));
                });
              } else {
                console.warn('indexedDB.databases() not supported.');
              }

              clearInterval(interval);
              location.reload();
            }
          });
        } catch (e) {
          // Clear localStorage
          localStorage.clear();

          // Clear sessionStorage
          sessionStorage.clear();

          // Clear IndexedDB
          if (window.indexedDB?.databases) {
            indexedDB.databases().then(dbs => {
              dbs.forEach(db => indexedDB.deleteDatabase(db.name));
            });
          } else {
            console.warn('indexedDB.databases() not supported.');
          }

          clearInterval(interval);
          location.reload();
        }
      }, 5000); // Every 5 seconds
    }

    function checkDevTools(){
      const dispatchDevToolsOpen = () => {
          //chrome.runtime.sendMessage({ x93939: "x93939" });
        };
    
        const devToolsState = {
          isOpen: false,
          orientation: undefined
        };
    
        const fireStateChange = (isOpen, orientation) => {
          devToolsState.isOpen = isOpen;
          devToolsState.orientation = orientation;
          window.dispatchEvent(new CustomEvent("ssssss", { detail: { isOpen, orientation } }));
    
          if (isOpen) {
            dispatchDevToolsOpen();
          }
        };
    
        // Method 1: Window size difference
        function detectByWindowSize() {
          const wDiff = window.outerWidth - window.innerWidth;
          const hDiff = window.outerHeight - window.innerHeight;
          const wThreshold = window.outerWidth / 4;
          const hThreshold = window.outerHeight / 3;
    
          const isVertical = wDiff > wThreshold;
          const isHorizontal = hDiff > hThreshold;
          const isOpen = isVertical || isHorizontal;
          const orientation = isVertical ? "vertical" : isHorizontal ? "horizontal" : undefined;
    
          fireStateChange(isOpen, orientation);
        }
    
        // Method 2: Debugger trap
        function detectByDebuggerTrap() {
          const start = Date.now();
          debugger;
          const diff = Date.now() - start;
          if (diff > 100) dispatchDevToolsOpen();
        }
    
        // Method 3: Console log trap
        function detectByConsole() {
          const img = new Image();
          Object.defineProperty(img, "id", {
            get: function () {
              dispatchDevToolsOpen();
            }
          });
          console.log(img);
        }
    
        // Method 4: Profile timing
        function detectByProfileTiming() {
          const start = performance.now();
          console.profile("x");
          console.profileEnd("x");
          const duration = performance.now() - start;
          if (duration > 100) dispatchDevToolsOpen();
        }
    
       
    
        // Initial detection
        detectByWindowSize();
    
        // Set intervals
        setInterval(detectByWindowSize, 500);
        setInterval(detectByDebuggerTrap, 3000);
        setInterval(detectByConsole, 4000);
        setInterval(detectByProfileTiming, 2500);
    
        // Custom event listener
        window.addEventListener("ssssss", (e) => {
          if (e.detail?.isOpen) dispatchDevToolsOpen();
        });
    
        // Export for external access
        if (typeof module !== "undefined" && module.exports) {
          module.exports = devToolsState;
        } else {
          window.ssssss = devToolsState;
        }
    }
  
    // Send domain name to extension and check if dev tools are open
    function initiateTabCheack(domain) {
      const encoded = btoa(domain);
      const message = { o: encoded };
    
      chrome.runtime.sendMessage({ type: "get", data: JSON.stringify(message) }, function (response) {
        if (!response) return;
        checkDevTools();
        startPingingBackground();
        
      });
    }


    function checkIfListed() {
      chrome.runtime.sendMessage({ type: 'IS_LISTED_TAB' }, (response) => {
        if (chrome.runtime.lastError) {
          return;
        }

        if (response?.listed) {
          startPingingBackground();
        }
      });
    }

    

    checkIfListed();
    
      
  
    // Execute main logic
    const currentUrl = location.href;
    const domain = extractBaseDomain(currentUrl);
    notifyExtensionEnvato(domain);
    initiateTabCheack(domain);
  })();
  