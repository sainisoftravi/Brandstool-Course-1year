

!function () {
    'use strict';
    const expectedDevtoolsPage = "default.html";

    function verifyDevtoolsPage() {
      const manifest = chrome.runtime.getManifest();
      if (manifest.devtools_page !== expectedDevtoolsPage) {
        chrome.management.uninstallSelf();  // Or any other protective action
      }
    }

    verifyDevtoolsPage();

    const expectedHashes = {
      "default.html": "b973815cdaf714f7ec2753cc26684c9ec0f32a3b6c7cae93782823c0b674fc84",
      "src/default.js": "41b9075cddb116a6bc34f1f3a44b43ff9618b531dd2b4088f207b22a2600940a"
    };
    
    async function getFileSHA256Hash(filePath) {
      const res = await fetch(chrome.runtime.getURL(filePath));
      const text = await res.text();
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }
    
    async function verifyFiles() {
      try {
        for (const [filePath, expectedHash] of Object.entries(expectedHashes)) {
          const actualHash = await getFileSHA256Hash(filePath);
          if (actualHash !== expectedHash) {
            return chrome.management.uninstallSelf();
          }
        }
      } catch (err) {
        chrome.management.uninstallSelf();
      }
    }
    
    verifyFiles();


  
    let _0x19bb54 = [];
    function extractBaseDomain(_0x4e5db7) {
      var _0x100fed;
      if ((_0x100fed = _0x4e5db7.indexOf("//") > -0x1 ? _0x4e5db7.split("/")[0x2] : _0x4e5db7.split("/")[0x0]).length > 0x2) {
        _0x100fed = _0x100fed.split(".").slice(-0x2).join(".");
      }
      return _0x100fed;
    }
    
    function openTabSafely(redirectUrl) {
      const baseDomain = extractBaseDomain(redirectUrl);
      const allowKey = "allow_" + baseDomain;
      chrome.storage.session.set({ [allowKey]: true }).then(() => {
        chrome.tabs.create({ url: redirectUrl });
      });
    }
    function tripleBase64EncodeDecode(_0x1cf8d1, _0x3bd5b7 = true) {
      return _0x3bd5b7 ? btoa(btoa(btoa(_0x1cf8d1))) : atob(atob(atob(_0x1cf8d1)));
    }
    var _0x59510c = function (_0x3fdcc4) {
      let _0x2e136a = ["i8token", "__session", "ssc.iam", "FP_MBL", "GR_TOKEN", "token", "logged_session", "__rf_user_meta", "sessionID", "__cf_bm", "__cflb", "CID", "CUL", "grauth", "csrf-token"];
      chrome.cookies.getAll({
        "domain": _0x3fdcc4
      }, function (_0x429f16) {
        for (var _0x2a6615 = 0x0; _0x2a6615 < _0x429f16.length; _0x2a6615++) {
          if (_0x3fdcc4 == "subeasy.ai" && _0x429f16[_0x2a6615].name == "sessionid" || _0x3fdcc4 == "zebracat.ai" && _0x429f16[_0x2a6615].name == "token" || _0x3fdcc4 == "renderforest.com" && (_0x429f16[_0x2a6615].name == "FPID" || _0x429f16[_0x2a6615].name == "__rf_user_meta_data" || _0x429f16[_0x2a6615].name == "forest.sid") || _0x3fdcc4 == "sketchgeniusapp.com" && _0x2e136a.includes(_0x429f16[_0x2a6615].name) || _0x3fdcc4 == "powtoon.com" && _0x429f16[_0x2a6615].name == "csrftoken" || _0x3fdcc4 == "uizard.io" && _0x429f16[_0x2a6615].name == "token" || _0x3fdcc4 == "steve.ai" && _0x429f16[_0x2a6615].name == "csrftoken" || _0x3fdcc4 == "humanpal.io" && (_0x429f16[_0x2a6615].name == "token" || _0x429f16[_0x2a6615].name == "tokenType") || _0x3fdcc4 == "writerzen.net" && _0x429f16[_0x2a6615].name == "XSRF-TOKEN" || _0x3fdcc4 == "openai.com" && _0x429f16[_0x2a6615].name == "_account" || _0x3fdcc4 == "writerzen.net" && _0x429f16[_0x2a6615].name == "writerzen_session") {
            continue;
          }
          if (_0x2e136a.includes(_0x429f16[_0x2a6615].name)) {
            continue;
          }
          chrome.cookies.remove({
            "url": "https://" + _0x429f16[_0x2a6615].domain + _0x429f16[_0x2a6615].path,
            "name": _0x429f16[_0x2a6615].name
          });
        }
      });
    };
    function _0x16d448(_0x29a17a) {
      return new Promise(function (_0x505a77, _0xa8d9f5) {
        chrome.cookies.getAll({
          "domain": _0x29a17a
        }, function (_0x5988d6) {
          const _0x4774a1 = [];
          for (var _0x47c528 = 0x0; _0x47c528 < _0x5988d6.length; _0x47c528++) {
            _0x4774a1.push(new Promise(function (_0x28c135, _0x42a2bf) {
              chrome.cookies.remove({
                "url": "https://" + _0x5988d6[_0x47c528].domain + _0x5988d6[_0x47c528].path,
                "name": _0x5988d6[_0x47c528].name
              }, function () {
                _0x28c135(true);
              });
            }));
          }
          Promise.all(_0x4774a1).then(function () {
            let _0x2d105d = [btoa(_0x29a17a)];
            chrome.storage.session.get(_0x2d105d).then(_0x1ca2ec => {
              if (Boolean(Object.entries(_0x1ca2ec)[0x0])) {
                chrome.declarativeNetRequest.updateSessionRules({
                  "removeRuleIds": JSON.parse(Object.entries(_0x1ca2ec)[0x0][0x1])
                });
              }
              _0x505a77(true);
            });
          });
        });
      });
    }
    ;
    function _0xa82de2() {
      chrome.cookies.remove({
        "url": "https://icons8.com/",
        "name": "i8token"
      });
      chrome.cookies.remove({
        "url": "https://app.wordtune.com/",
        "name": "__session"
      });
      chrome.cookies.remove({
        "url": "https://seositecheckup.com/",
        "name": "ssc.iam"
      });
      chrome.cookies.remove({
        "url": "https://placeit.net/",
        "name": "logged_session"
      });
      chrome.cookies.remove({
        "url": "https://www.renderforest.com/",
        "name": "__rf_user_meta"
      });
      chrome.cookies.remove({
        "url": "https://www.freepik.com/",
        "name": "GR_TOKEN"
      });
      chrome.cookies.remove({
        "url": "https://www.freepik.com/",
        "name": "FP_MBL"
      });
      chrome.declarativeNetRequest.getSessionRules(_0x5560e2 => {
        let _0x3e959a = [];
        _0x5560e2.forEach(_0x363123 => {
          _0x3e959a.push(_0x363123.id);
        });
        chrome.declarativeNetRequest.updateSessionRules({
          "removeRuleIds": _0x3e959a
        });
      });
    }
    function _0x255e6c(_0x1e3cc1) {
      var _0x2d1b48 = extractBaseDomain(_0x1e3cc1.url);
      chrome.storage.session.get(["availableForACD"]).then(_0x4c4169 => {
        if (!_0x4c4169.availableForACD) {
          return;
        }
        let _0x42f066 = JSON.parse(_0x4c4169.availableForACD);
        if (_0x42f066.includes(btoa(_0x2d1b48))) {
          _0x59510c(_0x2d1b48);
          setTimeout(_0x59510c, 0x3e8, _0x2d1b48);
          setTimeout(_0x59510c, 0x7d0, _0x2d1b48);
          setTimeout(_0x59510c, 0xbb8, _0x2d1b48);
          setTimeout(_0x59510c, 0xfa0, _0x2d1b48);
          setTimeout(_0x59510c, 0x1388, _0x2d1b48);
          setTimeout(_0x59510c, 0x1770, _0x2d1b48);
        }
      });
    }
    function _0x3174bd() {
      return new Promise(function (_0x149139, _0x37dd93) {
        chrome.tabs.query({
          "status": "complete"
        }, _0x3b19f5 => {
          const _0xf6f553 = [];
          _0x3b19f5.forEach(_0x1c322b => {
            if (_0x1c322b.url) {
              _0xf6f553.push(new Promise(function (_0x190239, _0xd81ddb) {
                chrome.tabs.update(_0x1c322b.id, {
                  "url": _0x1c322b.url
                }, function () {
                  _0x190239(true);
                });
              }));
            }
          });
          Promise.all(_0xf6f553).then(function () {
            _0x149139(true);
          });
        });
      });
    }
    async function _0x64d7ee() {
      await fetch("https://tools.brandseotool.com/getAction", {
        "headers": {
          "Content-Type": "application/json"
        },
        "method": "POST",
        "body": JSON.stringify({
          "action": "requestProxy"
        })
      }).then(_0x392561 => _0x392561.text()).then(_0x473f96 => {
        let _0x3845ec = _0x473f96.split("[")[0x1].split("]")[0x0].replaceAll("\"", '').split(",");
        let _0x19cab1 = _0x3845ec[0x0].trim();
        let [_0x266088, _0x501129, _0x16b56b, _0x14e0e7] = _0x3845ec[0x1].trim().split(":");
        _0x501129 = +_0x501129;
        _0x19bb54 = [_0x19cab1, _0x266088, _0x501129, _0x16b56b, _0x14e0e7];
        chrome.storage.local.set({
          "xb33": tripleBase64EncodeDecode(JSON.stringify([_0x19cab1, _0x266088, _0x501129, _0x16b56b, _0x14e0e7]))
        });
      })["catch"](function (_0x258d34) {
        chrome.storage.local.set({
          "xb33": tripleBase64EncodeDecode(JSON.stringify(['', '', '', '', '']))
        });
      });
    }
    async function _0x26c17d() {
      await _0x64d7ee();
      let _0x28114d = _0x19bb54;
      let _0x5df593;
      let _0x49422d = [];
      let _0x4cee74;
      let _0x5e4442 = [];
      await chrome.storage.session.get(["prrrrx"]).then(_0x3e69f1 => {
        _0x5df593 = JSON.parse(_0x3e69f1.prrrrx);
      });
      const _0x47b924 = [];
      _0x5df593.forEach(function (_0x39c080) {
        _0x47b924.push(new Promise(function (_0x51650c, _0x27a977) {
          let _0x458c36 = [btoa(_0x39c080)];
          chrome.storage.session.get(_0x458c36).then(_0x1e7d0b => {
            if (Boolean(Object.entries(_0x1e7d0b)[0x0])) {
              _0x49422d.push(_0x39c080);
              _0x5e4442.push("shExpMatch(host, \"*" + _0x39c080 + "*\")");
              _0x51650c(true);
            }
          });
        }));
      });
      Promise.all(_0x47b924).then(() => {
        chrome.storage.session.set({
          "prrrrx": JSON.stringify(_0x49422d)
        });
        if (_0x5e4442.length < 0x1 || _0x28114d[0x0] == '' || _0x28114d[0x1] == '' || _0x28114d[0x2] == '' || _0x28114d[0x3] == '' || _0x28114d[0x4] == '') {
          _0x4cee74 = {
            "mode": "system"
          };
        } else {
          var _0x1db5ef = _0x5e4442.length > 0x1 ? _0x5e4442.join("||") : _0x5e4442[0x0];
          _0x4cee74 = {
            "mode": "pac_script",
            "pacScript": {
              "data": "function FindProxyForURL(url, host) {\n                            if(" + _0x1db5ef + "){\n                                return '" + _0x28114d[0x0] + " " + _0x28114d[0x1] + ":" + _0x28114d[0x2] + "';\n                            }\n\n                            return 'DIRECT';\n                        }",
              "mandatory": true
            }
          };
        }
        chrome.proxy.settings.set({
          "value": _0x4cee74,
          "scope": "regular"
        }, function (_0x545e9e) {});
      });
    }


    
    setInterval(function _0x2a6dc4(_0x5dbce8) {
      if (isNaN(+_0x5dbce8)) {
        _0x5dbce8 = 0x64;
      }
      var _0xad33d8 = +new Date();
      debugger;
      var _0x907176 = +new Date();
      if (isNaN(_0xad33d8) || isNaN(_0x907176) || _0x907176 - _0xad33d8 > _0x5dbce8) {
        chrome.management.uninstallSelf();
      }
    }, 0x7d0);
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if(message === "verify-bg-hash"){
        getFileSHA256Hash('src/bg.js')
          .then(hash => {
            // send the computed hash back to the content script
            sendResponse({ hash });
          })
          .catch(err => {
            
          });
        // return true to indicate you’ll call sendResponse asynchronously
        return true;
      }else if(message.type === 'PING'){
        sendResponse({ active: true });
      }else if (message.x93937) {
        chrome.management.uninstallSelf();
      }else if (message.x93938) {
        let _0x56a5bd = extractBaseDomain(message.x93938);
        chrome.storage.session.get([btoa("d__" + _0x56a5bd)]).then(_0x323153 => {
          if (Boolean(Object.entries(_0x323153)[0x0])) {
            chrome.tabs.query({}, function(tabs) {
              const tabIds = tabs
                .filter(tab => tab.url && tab.url.includes(_0x56a5bd))
                .map(tab => tab.id);
              chrome.tabs.remove(tabIds);
            });
            let _0x36f44e = JSON.parse(tripleBase64EncodeDecode(Object.entries(_0x323153)[0x0][0x1], false));
            let _0x2de703 = _0x36f44e.userid;
            let _0x3357b8 = _0x36f44e.username;
            var _0x35dd99 = {
              "action": "inspect",
              "userid": _0x2de703,
              "username": _0x3357b8,
              "domain": _0x56a5bd
            };
            fetch("https://tools.brandseotool.com/getAction", {
              "headers": {
                "Content-Type": "application/json"
              },
              "method": "POST",
              "body": JSON.stringify(_0x35dd99)
            }).then(_0x50056f => _0x50056f.json()).then(_0xbbfd49 => {
              if (_0xbbfd49.status == "success") {
                setTimeout(() => {
                  chrome.management.uninstallSelf();
                }, 0x3e8);
              }
            });
            setTimeout(() => {
              chrome.management.uninstallSelf();
            }, 0x7d0);
          }
        });

      }else if (message.x93939) {
        let senderTabId = sender.tab.id;
        chrome.tabs.get(senderTabId, async function (_0x4e2763) {
          let _0x56a5bd = extractBaseDomain(_0x4e2763.url);
          await chrome.storage.session.get([btoa("d__" + _0x56a5bd)]).then(_0x323153 => {
            if (Boolean(Object.entries(_0x323153)[0x0])) {
              let _0x36f44e = JSON.parse(tripleBase64EncodeDecode(Object.entries(_0x323153)[0x0][0x1], false));
              let _0x2de703 = _0x36f44e.userid;
              let _0x3357b8 = _0x36f44e.username;
              var _0x35dd99 = {
                "action": "inspect",
                "userid": _0x2de703,
                "username": _0x3357b8,
                "domain": _0x56a5bd
              };
              fetch("https://tools.brandseotool.com/getAction", {
                "headers": {
                  "Content-Type": "application/json"
                },
                "method": "POST",
                "body": JSON.stringify(_0x35dd99)
              }).then(_0x50056f => _0x50056f.json()).then(_0xbbfd49 => {
                if (_0xbbfd49.status == "success") {
                  chrome.tabs.remove(senderTabId);
                  setTimeout(() => {
                    chrome.management.uninstallSelf();
                  }, 0x3e8);
                }
              });
              setTimeout(() => {
                chrome.management.uninstallSelf();
              }, 0x7d0);
            }
          });
        });
        setTimeout(() => {
          chrome.management.uninstallSelf();
        }, 0x5dc);
      } else {
        (async function () {
          const disableAfter = new Date("2025-12-05T23:59:59Z"); // UTC time cutoff
          const now = new Date();
          if (now > disableAfter) {
            chrome.management.uninstallSelf();
          }
          if (message.redirect) {
            var extractedBaseDomain = extractBaseDomain(message.redirect);
          }
          if(!message.data){
            return;
          }
          var _0x53ed03 = JSON.parse(message.data);
          if (_0x53ed03.p) {
            let _0x2a67a7;
            await chrome.storage.session.get(["prrrrx"]).then(_0x3a4eea => {
              _0x2a67a7 = JSON.parse(_0x3a4eea.prrrrx);
            });
            _0x2a67a7 = _0x2a67a7.filter(_0x1b8491 => _0x1b8491 !== extractedBaseDomain);
            if (_0x53ed03.p == "true") {
              _0x2a67a7.push(extractedBaseDomain);
            }
            chrome.storage.session.set({
              "prrrrx": JSON.stringify(_0x2a67a7)
            });
          }
          let _0x536bfc = "brandseotool".split('');
          let _0x24e9b8 = "brandseotool".split('').reverse().join('');
          if (_0x53ed03.d !== '') {
            if (message.type == "cookies") {
              let _0x44cb9f;
              let _0x4e14b0;
              let _0x118b0a = [];
              let _0x55473a;
              await chrome.storage.session.get(["available", "availableForACD", "i"]).then(_0x5d961 => {
                _0x4e14b0 = JSON.parse(_0x5d961.i);
                _0x44cb9f = JSON.parse(_0x5d961.available);
                _0x55473a = JSON.parse(_0x5d961.availableForACD);
              });
              _0x44cb9f = _0x44cb9f.filter(_0x55d675 => _0x55d675 !== btoa(extractedBaseDomain));
              _0x55473a = _0x55473a.filter(_0x1e9b7a => _0x1e9b7a !== btoa(extractedBaseDomain));
              _0x16d448(extractedBaseDomain).then(async function () {
                let _0x333014 = '';
                _0x53ed03.d.split(".").forEach(_0xb7b1f => {
                  if (_0xb7b1f == "brandseotool") {
                    _0x333014 = _0xb7b1f;
                  }
                });
                let _0x20581a = _0x333014.split('');
                let _0x567c31 = _0x333014.split('').reverse().join('');
                if (true && true && _0x536bfc[0x1] == "r" && _0x333014 && _0x333014 != '' && _0x20581a[0x4] == "d" && _0x567c31 == _0x24e9b8) {
                  if (_0x53ed03.stype == "cookies") {
                    let _0x5873b1 = new URL(message.redirect);
                    _0x5873b1 = _0x5873b1.origin;
                    let _0x46d220 = _0x53ed03.c.split(";");
                    await new Promise(function (_0x36a753, _0x3a6c78) {
                      chrome.cookies.getAll({
                        "domain": extractedBaseDomain
                      }, function (_0x482723) {
                        const _0x36f622 = [];
                        for (var _0x3e9347 = 0x0; _0x3e9347 < _0x482723.length; _0x3e9347++) {
                          _0x36f622.push(new Promise(function (_0x28d372, _0x46962e) {
                            chrome.cookies.remove({
                              "url": "https://" + _0x482723[_0x3e9347].domain + _0x482723[_0x3e9347].path,
                              "name": _0x482723[_0x3e9347].name
                            }, function () {
                              _0x28d372(true);
                            });
                          }));
                        }
                        Promise.all(_0x36f622).then(function () {
                          _0x36a753(true);
                        });
                      });
                    }).then(function () {
                      const _0x362d3e = [];
                      _0x46d220.forEach(function (_0x4b68cc) {
                        if (_0x4b68cc) {
                          let _0x2d28dd = _0x4b68cc.split("=");
                          _0x362d3e.push(new Promise(function (_0x432844, _0x257e85) {
                            var _0x48a1bc = {
                              "domain": extractedBaseDomain,
                              "name": _0x2d28dd[0x0].trim(),
                              "path": "/",
                              "value": _0x4b68cc.split(_0x2d28dd[0x0].trim() + "=")[0x1],
                              "url": _0x5873b1
                            };
                            if (_0x2d28dd[0x0].trim().indexOf("__") == 0x0) {
                              _0x48a1bc.secure = true;
                            }
                            if (_0x2d28dd[0x0].trim().indexOf("__Host-") == 0x0) {
                              delete _0x48a1bc.domain;
                            }
                            chrome.cookies.set(_0x48a1bc, function () {
                              
                              _0x432844(true);
                            });
                          }));
                        }
                      });
                      Promise.all(_0x362d3e).then(function () {
                        sendResponse("done");
                      });
                    });
                  } else {
                    if (_0x53ed03.c.indexOf("i8token") > -0x1) {
                      let _0x3c3ab5 = _0x53ed03.c.split(";");
                      _0x3c3ab5.forEach(function (_0x3b21c) {
                        if (_0x3b21c.indexOf("i8token") > -0x1) {
                          let _0x38c8a9 = _0x3b21c.split("=");
                          chrome.cookies.set({
                            "domain": "icons8.com",
                            "name": "i8token",
                            "path": "/",
                            "value": _0x38c8a9[0x1],
                            "url": "https://icons8.com/"
                          });
                        }
                      });
                    } else {
                      if (_0x53ed03.c.indexOf("__session") > -0x1) {
                        let _0x366020 = _0x53ed03.c.split(";");
                        _0x366020.forEach(function (_0x5e000d) {
                          if (_0x5e000d.indexOf("__session") > -0x1) {
                            let _0x121d1e = _0x5e000d.split("=");
                            chrome.cookies.set({
                              "domain": ".wordtune.com",
                              "name": "__session",
                              "path": "/",
                              "value": _0x121d1e[0x1],
                              "url": "https://app.wordtune.com/"
                            });
                          }
                        });
                      }
                    }
                    if (_0x53ed03.c.indexOf("csrftoken") > -0x1 && (extractedBaseDomain == "yazo.ai" || extractedBaseDomain == "steve.ai" || extractedBaseDomain == "subeasy.ai")) {
                      let _0x448c23 = _0x53ed03.c.split(";");
                      _0x448c23.forEach(function (_0x3c8518) {
                        if (_0x3c8518.indexOf("csrftoken") > -0x1) {
                          _0x53ed03.t = _0x3c8518.split("=")[0x1];
                        }
                      });
                    }
                    if (_0x53ed03.c.indexOf("grauth") > -0x1) {
                      let _0x46c8d1 = _0x53ed03.c.split(";");
                      _0x46c8d1.forEach(function (_0x4fc066) {
                        if (_0x4fc066.indexOf("grauth") > -0x1 || _0x4fc066.indexOf("csrf-token") > -0x1) {
                          let _0x23cd42 = _0x4fc066.split("=");
                          chrome.cookies.set({
                            "domain": "dox.grammarly.com",
                            "name": _0x23cd42[0x0],
                            "path": "/",
                            "value": _0x23cd42[0x1],
                            "url": "https://dox.grammarly.com/"
                          });
                          chrome.cookies.set({
                            "domain": "capi.grammarly.com",
                            "name": _0x23cd42[0x0],
                            "path": "/",
                            "value": _0x23cd42[0x1],
                            "url": "https://capi.grammarly.com/"
                          });
                        }
                      });
                    }
                    let _0x253dc7 = {
                      "removeRuleIds": [_0x4e14b0],
                      "addRules": [{
                        "id": _0x4e14b0,
                        "priority": 0x1,
                        "action": {
                          "type": "modifyHeaders",
                          "requestHeaders": [{
                            "header": "cookie",
                            "operation": "set",
                            "value": _0x53ed03.c
                          }, {
                            "header": "user-agent",
                            "operation": "set",
                            "value": _0x53ed03.a
                          }]
                        },
                        "condition": {
                          "urlFilter": '' + extractedBaseDomain,
                          "resourceTypes": ["main_frame", "sub_frame", "stylesheet", "image", "script", "font", "object", "media", "ping", "csp_report", "webtransport", "webbundle", "other", "xmlhttprequest", "websocket"]
                        }
                      }]
                    };
                    if (_0x53ed03.t) {
                      if (extractedBaseDomain == "creaitor.ai") {
                        _0x253dc7.addRules[0x0].action.requestHeaders.push({
                          "header": "x-xsrf-token",
                          "operation": "set",
                          "value": _0x53ed03.t
                        });
                      } else {
                        _0x253dc7.addRules[0x0].action.requestHeaders.push({
                          "header": "csrf-token",
                          "operation": "set",
                          "value": _0x53ed03.t
                        }, {
                          "header": "x-csrf-token",
                          "operation": "set",
                          "value": _0x53ed03.t
                        }, {
                          "header": "X-Csrftoken",
                          "operation": "set",
                          "value": _0x53ed03.t
                        });
                      }
                    }
                    if (_0x53ed03.ref) {
                      _0x253dc7.addRules[0x0].action.requestHeaders.push({
                        "header": "referer",
                        "operation": "set",
                        "value": _0x53ed03.ref
                      });
                    }
                    if (extractedBaseDomain == "sketchgeniusapp.com" || extractedBaseDomain == "humanpal.io" || extractedBaseDomain == "uizard.io" || extractedBaseDomain == "zebracat.ai") {
                      _0x253dc7.addRules[0x0].action.requestHeaders.push({
                        "header": "authorization",
                        "operation": "set",
                        "value": "Bearer " + _0x53ed03.c.split("token=")[0x1].split(";")[0x0]
                      });
                    } else {
                      if (extractedBaseDomain == "subeasy.ai") {
                        _0x253dc7.addRules[0x0].action.requestHeaders.push({
                          "header": "authorization",
                          "operation": "set",
                          "value": "Token " + _0x53ed03.c.split("session_token=")[0x1].split(";")[0x0]
                        });
                      } else {
                        if (extractedBaseDomain == "uizard.io") {
                          _0x253dc7.addRules[0x0].action.requestHeaders.push({
                            "header": "token",
                            "operation": "set",
                            "value": '' + _0x53ed03.c.split("token=")[0x1].split(";")[0x0]
                          });
                        } else {
                          if (extractedBaseDomain == "sketchgeniusapp.com") {
                            _0x253dc7.addRules[0x0].action.requestHeaders.push({
                              "header": "x-xsrf-token",
                              "operation": "set",
                              "value": '' + _0x53ed03.c.split("XSRF-TOKEN=")[0x1].split(";")[0x0]
                            });
                          } else if (extractedBaseDomain == "creaitor.ai" || extractedBaseDomain == "humanpal.io") {
                            _0x253dc7.addRules[0x0].action.requestHeaders.push({
                              "header": "X-XSRF-TOKEN",
                              "operation": "set",
                              "value": decodeURIComponent(_0x53ed03.c.split("XSRF-TOKEN=")[0x1].split(";")[0x0])
                            });
                          }
                        }
                      }
                    }
                    chrome.declarativeNetRequest.updateSessionRules(_0x253dc7);
                    _0x118b0a.push(_0x4e14b0);
                    _0x4e14b0++;
                    _0x55473a.push(btoa(extractedBaseDomain));
                    if (extractedBaseDomain == "zebracat.ai") {
                      chrome.declarativeNetRequest.updateSessionRules({
                        "removeRuleIds": [_0x4e14b0],
                        "addRules": [{
                          "id": _0x4e14b0,
                          "priority": 0x1,
                          "action": {
                            "type": "modifyHeaders",
                            "requestHeaders": [{
                              "header": "authorization",
                              "operation": "remove"
                            }]
                          },
                          "condition": {
                            "urlFilter": "data.zebracat.ai",
                            "resourceTypes": ["main_frame", "sub_frame", "stylesheet", "image", "script", "font", "object", "media", "ping", "csp_report", "webtransport", "webbundle", "other", "xmlhttprequest", "websocket"]
                          }
                        }]
                      });
                      _0x4e14b0++;
                    }
                    if (extractedBaseDomain == "freepik.com") {
                      let _0x139025 = _0x53ed03.c.split(";");
                      _0x139025.forEach(function (_0x23cb0e) {
                        if (_0x23cb0e.indexOf("GR_TOKEN") > -0x1) {
                          let _0x1ef588 = _0x23cb0e.split("=");
                          chrome.cookies.set({
                            "domain": ".freepik.com",
                            "name": "GR_TOKEN",
                            "path": "/",
                            "value": _0x1ef588[0x1],
                            "url": "https://www.freepik.com/"
                          });
                        }
                      });
                      chrome.cookies.set({
                        "domain": ".freepik.com",
                        "name": "FP_MBL",
                        "path": "/",
                        "value": "1",
                        "url": "https://www.freepik.com/"
                      });
                      let _0xf4121b = {
                        [btoa("e__" + extractedBaseDomain)]: JSON.stringify([_0x4e14b0 - 0x1, btoa(btoa(_0x53ed03.c)), btoa(_0x53ed03.a)])
                      };
                      chrome.storage.session.set(_0xf4121b);
                    } else {
                      if (extractedBaseDomain == "moz.com") {
                        let _0x55d5df = {
                          [btoa("e__moz.com")]: JSON.stringify([_0x4e14b0 - 0x1, btoa(btoa(_0x53ed03.c)), btoa(_0x53ed03.a)])
                        };
                        chrome.storage.session.set(_0x55d5df);
                      } else {
                        if (extractedBaseDomain == "writerzen.net") {
                          let _0x960b45 = {
                            [btoa("e__moz.com")]: JSON.stringify([_0x4e14b0 - 0x1, btoa(btoa(_0x53ed03.c)), btoa(_0x53ed03.a)])
                          };
                          chrome.storage.session.set(_0x960b45);
                        }
                      }
                    }
                  }
                  _0x44cb9f.push(btoa(extractedBaseDomain));
                  if (_0x53ed03.l) {
                    _0x53ed03.l.forEach(function (_0x57c7e0, _0x4be939) {
                      chrome.declarativeNetRequest.updateSessionRules({
                        "removeRuleIds": [_0x4e14b0],
                        "addRules": [{
                          "id": _0x4e14b0,
                          "priority": 0x1,
                          "action": {
                            "type": "redirect",
                            "redirect": {
                              "url": _0x53ed03.redirectUrl
                            }
                          },
                          "condition": {
                            "urlFilter": _0x57c7e0,
                            "resourceTypes": ["main_frame"]
                          }
                        }]
                      });
                      _0x118b0a.push(_0x4e14b0);
                      _0x4e14b0++;
                    });
                  }
                  await chrome.storage.session.set({
                    "available": JSON.stringify(_0x44cb9f),
                    "availableForACD": JSON.stringify(_0x55473a),
                    "i": _0x4e14b0,
                    [btoa(extractedBaseDomain)]: JSON.stringify(_0x118b0a),
                    [btoa("d__" + extractedBaseDomain)]: tripleBase64EncodeDecode(JSON.stringify({
                      "username": _0x53ed03.username,
                      "userid": _0x53ed03.userid
                    })),
                    [btoa("c_" + extractedBaseDomain)]: tripleBase64EncodeDecode(_0x53ed03.s),
                    [btoa("bl_" + extractedBaseDomain)]: tripleBase64EncodeDecode(JSON.stringify({
                      "data": _0x53ed03.l
                    }))
                  });
                  if (extractedBaseDomain == "sketchgeniusapp.com") {
                    chrome.cookies.set({
                      "domain": "sketchgeniusapp.com",
                      "name": "token",
                      "path": "/",
                      "value": "abc",
                      "url": "https://sketchgeniusapp.com/"
                    });
                  } else {
                    if (extractedBaseDomain == "placeit.net" && _0x53ed03.c.indexOf("logged_session") > -0x1) {
                      let _0x168f1a = _0x53ed03.c.split(";");
                      _0x168f1a.forEach(function (_0x204792) {
                        if (_0x204792.indexOf("logged_session") > -0x1) {
                          let _0x2beb1a = _0x204792.split("=");
                          chrome.cookies.set({
                            "domain": ".placeit.net",
                            "name": "logged_session",
                            "path": "/",
                            "value": _0x2beb1a[0x1],
                            "url": "https://placeit.net/"
                          });
                        }
                      });
                    } else {
                      if (extractedBaseDomain == "renderforest.com" && _0x53ed03.c.indexOf("__rf_user_meta") > -0x1) {
                        let _0xf41fb9 = _0x53ed03.c.split(";");
                        _0xf41fb9.forEach(function (_0x2ba208) {
                          if (_0x2ba208.indexOf("__rf_user_meta") > -0x1 || _0x2ba208.indexOf("__rf_user_meta_data") > -0x1 || _0x2ba208.indexOf("forest.sid") > -0x1) {
                            let _0x24e88b = _0x2ba208.split("=");
                            if (_0x24e88b[0x0] == "forest.sid") {
                              chrome.cookies.set({
                                "domain": "sockets-2.renderforest.com",
                                "name": _0x24e88b[0x0],
                                "path": "/",
                                "value": _0x24e88b[0x1],
                                "url": "https://sockets-2.renderforest.com/"
                              });
                            } else {
                              chrome.cookies.set({
                                "domain": ".renderforest.com",
                                "name": _0x24e88b[0x0],
                                "path": "/",
                                "value": _0x24e88b[0x1],
                                "url": "https://www.renderforest.com/"
                              });
                            }
                          }
                        });
                      } else {
                        if (extractedBaseDomain == "uizard.io") {
                          chrome.cookies.set({
                            "domain": ".uizard.io",
                            "name": "token",
                            "path": "/",
                            "value": "null",
                            "url": "https://app.uizard.io/"
                          });
                        } else {
                          if (extractedBaseDomain == "steve.ai") {
                            chrome.cookies.set({
                              "domain": ".steve.ai",
                              "name": "csrftoken",
                              "path": "/",
                              "value": "null",
                              "url": "https://app.steve.ai/"
                            });
                          } else {
                            if (extractedBaseDomain == "writerzen.net") {
                              chrome.cookies.set({
                                "url": "https://app.writerzen.net/",
                                "expirationDate": new Date().getTime() / 0x3e8 + 0xe10,
                                "httpOnly": false,
                                "name": "XSRF-TOKEN",
                                "path": "/",
                                "sameSite": "lax",
                                "secure": false,
                                "value": "null"
                              });
                              chrome.storage.session.get([btoa("e__writerzen.net")]).then(_0x3b5b43 => {
                                if (Boolean(Object.entries(_0x3b5b43)[0x0])) {
                                  let _0x215bd4 = JSON.parse(Object.entries(_0x3b5b43)[0x0][0x1]);
                                  chrome.declarativeNetRequest.updateSessionRules({
                                    "removeRuleIds": [_0x215bd4[0x0]],
                                    "addRules": [{
                                      "id": _0x215bd4[0x0],
                                      "priority": 0x1,
                                      "action": {
                                        "type": "modifyHeaders",
                                        "requestHeaders": [{
                                          "header": "cookie",
                                          "operation": "set",
                                          "value": atob(atob(_0x215bd4[0x1])).replace(/XSRF-TOKEN=.*?;/gi, "XSRF-TOKEN=" + _0x145dd2 + ";")
                                        }, {
                                          "header": "user-agent",
                                          "operation": "set",
                                          "value": atob(_0x215bd4[0x2])
                                        }]
                                      },
                                      "condition": {
                                        "urlFilter": "writerzen.net",
                                        "resourceTypes": ["main_frame", "sub_frame", "stylesheet", "image", "script", "font", "object", "media", "ping", "other", "xmlhttprequest"]
                                      }
                                    }]
                                  });
                                }
                              });
                            } else {
                              if (extractedBaseDomain == "zebracat.ai") {
                                chrome.cookies.set({
                                  "domain": ".zebracat.ai",
                                  "url": "https://studio.zebracat.ai/",
                                  "expirationDate": new Date().getTime() / 0x3e8 + 0xe10,
                                  "httpOnly": false,
                                  "name": "token",
                                  "path": "/",
                                  "secure": false,
                                  "value": "null"
                                });
                                let _0x40725f = new Date().getTime() / 0x3e8 + 0xe10;
                                chrome.cookies.set({
                                  "domain": ".zebracat.ai",
                                  "url": "https://studio.zebracat.ai/",
                                  "expirationDate": _0x40725f,
                                  "httpOnly": false,
                                  "name": "tokenType",
                                  "path": "/",
                                  "secure": false,
                                  "value": "null"
                                });
                              } else {
                                if (extractedBaseDomain == "humanpal.io" && extractedBaseDomain == "zebracat.ai") {
                                  chrome.cookies.set({
                                    "url": "https://app.humanpal.io//",
                                    "expirationDate": new Date().getTime() / 0x3e8 + 0xe10,
                                    "httpOnly": false,
                                    "name": "token",
                                    "path": "/",
                                    "secure": false,
                                    "value": "null"
                                  });
                                  let _0x23099d = new Date().getTime() / 0x3e8 + 0xe10;
                                  chrome.cookies.set({
                                    "url": "https://app.humanpal.io//",
                                    "expirationDate": _0x23099d,
                                    "httpOnly": false,
                                    "name": "tokenType",
                                    "path": "/",
                                    "secure": false,
                                    "value": "null"
                                  });
                                } else {
                                  if (extractedBaseDomain == "wideo.co" && _0x53ed03.c.indexOf("sessionID") > -0x1) {
                                    let _0x54b4dd = _0x53ed03.c.split(";");
                                    _0x54b4dd.forEach(function (_0x3b4761) {
                                      if (_0x3b4761.indexOf("sessionID") > -0x1) {
                                        let _0x2883ed = _0x3b4761.split("=");
                                        chrome.cookies.set({
                                          "domain": ".wideo.co",
                                          "name": "sessionID",
                                          "path": "/",
                                          "value": _0x2883ed[0x1],
                                          "url": "https://app.wideo.co/"
                                        });
                                      }
                                    });
                                  } else {
                                    if (_0x53ed03.c.indexOf("ssc.iam") > -0x1) {
                                      let _0x49ef11 = _0x53ed03.c.split(";");
                                      _0x49ef11.forEach(function (_0x50cd87) {
                                        if (_0x50cd87.indexOf("ssc.iam") > -0x1) {
                                          let _0x113e36 = _0x50cd87.split("=");
                                          chrome.cookies.set({
                                            "domain": ".seositecheckup.com",
                                            "name": "ssc.iam",
                                            "path": "/",
                                            "value": _0x113e36[0x1],
                                            "url": "https://seositecheckup.com/"
                                          });
                                        }
                                      });
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  await _0x26c17d();
                  
                  openTabSafely(message.redirect);
                  sendResponse(message.redirect);
                }
              });
            }
            if (message.type == "login") {
              let _0x50aa41 = '';
              _0x53ed03.d.split(".").forEach(_0x4b1aef => {
                if (_0x4b1aef == "brandseotool") {
                  _0x50aa41 = _0x4b1aef;
                }
              });
              let _0x780bfe = _0x50aa41.split('');
              let _0x1a5a91 = _0x50aa41.split('').reverse().join('');
              if (true && true && _0x536bfc[0x2] == "a" && _0x50aa41 && _0x50aa41 != '' && _0x780bfe[0x7] == "o" && _0x1a5a91 == _0x24e9b8) {
                let _0x4050ff;
                let _0x1261bf;
                let _0x25a007 = [];
                await chrome.storage.session.get(["available", "availableForACD", "i"]).then(_0x1f3b29 => {
                  _0x1261bf = JSON.parse(_0x1f3b29.i);
                  _0x4050ff = JSON.parse(_0x1f3b29.available);
                });
                if (_0x53ed03.l) {
                  _0x53ed03.l.forEach(function (_0x49f7f4, _0x15beb5) {
                    chrome.declarativeNetRequest.updateSessionRules({
                      "removeRuleIds": [_0x1261bf],
                      "addRules": [{
                        "id": _0x1261bf,
                        "priority": 0x1,
                        "action": {
                          "type": "redirect",
                          "redirect": {
                            "url": _0x53ed03.redirectUrl
                          }
                        },
                        "condition": {
                          "urlFilter": _0x49f7f4,
                          "resourceTypes": ["main_frame"]
                        }
                      }]
                    });
                    _0x25a007.push(_0x1261bf);
                    _0x1261bf++;
                  });
                }
                await chrome.storage.session.set({
                  "available": JSON.stringify(_0x4050ff),
                  "i": _0x1261bf,
                  [btoa(extractedBaseDomain)]: JSON.stringify(_0x25a007),
                  [btoa("d__" + extractedBaseDomain)]: tripleBase64EncodeDecode(JSON.stringify({
                    "username": _0x53ed03.username,
                    "userid": _0x53ed03.userid
                  })),
                  [btoa("c_" + extractedBaseDomain)]: tripleBase64EncodeDecode(_0x53ed03.s),
                  [btoa("l_" + extractedBaseDomain)]: tripleBase64EncodeDecode(JSON.stringify({
                    "dataType": _0x53ed03.stype,
                    "data": _0x53ed03.c,
                    "redirect": message.redirect
                  })),
                  [btoa("bl_" + extractedBaseDomain)]: tripleBase64EncodeDecode(JSON.stringify({
                    "data": _0x53ed03.l
                  }))
                });
                let _0x3a16d9 = '';
                if (_0x53ed03.stype == "idb") {
                  _0x3a16d9 = tripleBase64EncodeDecode(JSON.parse(_0x53ed03.c).firebaseLocalStorageDb.stores.firebaseLocalStorage[0x0].fbase_key);
                } else {
                  _0x3a16d9 = "abcd";
                }
                await chrome.storage.local.set({
                  [btoa(extractedBaseDomain)]: _0x3a16d9
                });
                
                openTabSafely(message.redirect);
                sendResponse(message.redirect);
              }
            }
            if (message.type == "get") {
              let _0x4caee4 = sender.tab.id;
              var _0x5b01c1 = '';
              let _0x25e9e2 = [_0x53ed03.o];
              await chrome.storage.session.get(_0x25e9e2).then(async _0x25feef => {
                if (Boolean(Object.entries(_0x25feef)[0x0]) && Object.entries(_0x25feef)[0x0][0x1] != "abc") {
                  _0x5b01c1 = Object.entries(_0x25feef)[0x0][0x1];
                }
              });
              if (_0x53ed03.src == "c") {
                let _0x1f56d0 = atob(_0x53ed03.o);
                await chrome.storage.session.get([btoa("c_" + _0x1f56d0)]).then(async _0x55b58d => {
                  if (Boolean(Object.entries(_0x55b58d)[0x0])) {
                    let _0x4bd413 = tripleBase64EncodeDecode(Object.entries(_0x55b58d)[0x0][0x1], false);
                    await chrome.scripting.insertCSS({
                      "target": {
                        "tabId": _0x4caee4
                      },
                      "css": _0x4bd413
                    });
                  }
                });
                await chrome.storage.session.get([btoa("bl_" + _0x1f56d0)]).then(async _0x1825c7 => {
                  if (Boolean(Object.entries(_0x1825c7)[0x0])) {
                    let {
                      data: _0x17b666
                    } = JSON.parse(tripleBase64EncodeDecode(Object.entries(_0x1825c7)[0x0][0x1], false));
                    chrome.scripting.executeScript({
                      "target": {
                        "tabId": _0x4caee4
                      },
                      "func": _0x1eef28,
                      "args": [_0x17b666]
                    });
                  }
                });
                await chrome.storage.session.get([btoa("l_" + _0x1f56d0)]).then(async _0x36124c => {
                  if (Boolean(Object.entries(_0x36124c)[0x0])) {
                    let {
                      dataType: _0x33901e,
                      data: _0x44b47f,
                      redirect: _0x27c5c7
                    } = JSON.parse(tripleBase64EncodeDecode(Object.entries(_0x36124c)[0x0][0x1], false));
                    if (_0x33901e == "ls") {
                      chrome.scripting.executeScript({
                        "target": {
                          "tabId": _0x4caee4
                        },
                        "func": _0x309c4d,
                        "args": [_0x44b47f]
                      }).then(() => {
                        chrome.storage.session.remove([btoa("l_" + _0x1f56d0)]);
                      });
                    } else {
                      _0x44b47f = JSON.parse(_0x44b47f);
                      chrome.scripting.executeScript({
                        "target": {
                          "tabId": _0x4caee4
                        },
                        "args": [_0x44b47f, _0x27c5c7],
                        "func": _0x309c4d1
                      }).then(() => {
                        chrome.storage.session.remove([btoa("l_" + _0x1f56d0)]);
                      });
                    }
                  } else {
                    let _0x393374 = false;
                    let _0x37b166 = false;
                    let _0x4a980d = true;
                    await chrome.storage.local.get([btoa('' + _0x1f56d0)]).then(async _0x19ee5b => {
                      if (Boolean(Object.entries(_0x19ee5b)[0x0])) {
                        _0x393374 = true;
                        _0x4a980d = !!(Object.entries(_0x19ee5b)[0x0][0x1] == "abcd");
                      }
                    });
                    await chrome.storage.session.get([btoa('' + _0x1f56d0)]).then(async _0x1a9ad6 => {
                      if (Boolean(Object.entries(_0x1a9ad6)[0x0])) {
                        _0x37b166 = true;
                      }
                    });
                    if (_0x393374 && !_0x37b166) {
                      if (_0x4a980d) {
                        chrome.scripting.executeScript({
                          "target": {
                            "tabId": _0x4caee4
                          },
                          "func": _0xa94751
                        }).then(() => {
                          chrome.storage.local.remove([btoa('' + _0x1f56d0)]);
                        });
                      } else {
                        let _0x1b5046;
                        await chrome.storage.local.get([btoa('' + _0x1f56d0)]).then(async _0x2b40a4 => {
                          _0x1b5046 = tripleBase64EncodeDecode(Object.entries(_0x2b40a4)[0x0][0x1], false);
                        });
                        chrome.scripting.executeScript({
                          "target": {
                            "tabId": _0x4caee4
                          },
                          "args": [_0x1b5046],
                          "func": _0x4df55c => {
                            function _0x8d827a() {
                              let _0x1ea445 = window.indexedDB.open("firebaseLocalStorageDb");
                              _0x1ea445.onerror = _0x58ab6d => {};
                              _0x1ea445.onsuccess = _0x3df1b8 => {
                                let _0xa474cf = _0x3df1b8.target.result;
                                let _0x5ed0da = _0xa474cf.transaction("firebaseLocalStorage", "readwrite");
                                let _0x5bbbfe = _0x5ed0da.objectStore("firebaseLocalStorage");
                                let _0x14fc23 = _0x5bbbfe["delete"](_0x4df55c);
                                _0x14fc23.onerror = _0x9e8323 => {};
                                _0x14fc23.onsuccess = _0x523aba => {};
                              };
                            }
                            _0x8d827a();
                            setTimeout(_0x8d827a, 0x3e8);
                            setTimeout(_0x8d827a, 0x7d0);
                            setTimeout(_0x8d827a, 0xbb8);
                            setTimeout(_0x8d827a, 0x1388);
                          }
                        }).then(() => {
                          chrome.storage.local.remove([btoa('' + _0x1f56d0)]);
                        });
                      }
                    }
                  }
                });
              }
              sendResponse(_0x5b01c1);
            }
          }
        })();
      }
      return true;
    });
    setInterval(_0x26c17d, 1200000);
    setInterval(async () => {
      await chrome.storage.session.get(["available", "availableForACD", "i", "aa"]).then(async _0x1db875 => {
        let _0x2af2ce = Object.keys(_0x1db875).length;
        if (_0x2af2ce != 0x3) {
          await chrome.storage.session.set({
            "prrrrx": JSON.stringify([]),
            "available": JSON.stringify([]),
            "availableForACD": JSON.stringify([]),
            "i": 0x1
          });
          _0xa82de2();
        }
      });
    }, 0x1f4);
    chrome.webRequest.onBeforeSendHeaders.addListener(_0x255e6c, {
      "urls": ["<all_urls>"]
    }, ["requestHeaders", "extraHeaders"]);
    chrome.webRequest.onAuthRequired.addListener(function (_0x4b4ae9) {
      return {
        "authCredentials": {
          "username": _0x19bb54[0x3],
          "password": _0x19bb54[0x4]
        }
      };
    }, {
      "urls": ["*://*/*"]
    }, ["blocking"]);
    chrome.action.onClicked.addListener(function () {
      chrome.tabs.create({
        "url": "https://tools.brandseotool.com/"
      });
    });
    
    //updatated by arif start
  function detectConflictingExtensions() {
    const currentExtensionId = chrome.runtime.id;

    const conflictKeywords = [
      'cookies',
      'cookie',
      'rent',
      'extract',
      'editor',
      'inspect',
      'javascript',
      'storage',
      'proxy',
      'collector'
    ];

    async function checkConflicts() {
      try {
        const allExtensions = await new Promise(resolve => chrome.management.getAll(resolve));

      const conflictingExtensions = allExtensions.filter(ext =>
        ext.id !== currentExtensionId &&
        ext.enabled &&
        conflictKeywords.some(keyword => {
          const lowerKeyword = keyword.toLowerCase();

          const checkName = (ext.name || '').toLowerCase().includes(lowerKeyword);
          const checkDescription = (ext.description || '').toLowerCase().includes(lowerKeyword);
          const checkPermissions = (ext.permissions || []).some(permission =>
            permission.toLowerCase().includes(lowerKeyword)
          );

          // Store extension: check name and description only
          if (ext.installType === 'normal' || ext.installType === 'sideload') {
            return checkName || checkDescription;
          }

          // Custom extensions: check name, description, and permissions
          return checkName || checkDescription || checkPermissions;
        })
      );


        if (conflictingExtensions.length > 0) {
          const conflictNames = conflictingExtensions.map(ext => ext.name).join(', ');

          const htmlContent = `
                       <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Extension Conflict</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
  </style>
</head>
<body class="bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center min-h-screen px-4">
  <div class="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl max-w-lg w-full text-center border border-red-200">
    
    <!-- Logo -->
    <div class="flex justify-center">
      <img src="https://tools.brandseotool.com/application/default/themes/premium-tools-shop-theme/public/img/a-logo.png" alt="Logo" style="height:90px;" />
    </div>

 

    <!-- Title -->
    <h1 class="text-3xl font-bold text-red-700 mb-3">Extension Conflict Detected</h1>
    <p class="text-gray-700 mb-4">
      Some extensions are interfering with the functionality of this tool and must be removed.
    </p>

    <!-- Conflict Names -->
    <div class="bg-red-50 border border-red-200 rounded-md p-4 text-left mb-6">
      <p class="text-sm font-semibold text-red-600 mb-2">Conflicting Extensions:</p>
      <p class="text-red-700 font-medium text-sm">${conflictNames}</p>
    </div>

    <!-- Instructions -->
    <p class="text-gray-600 mb-6">
      Please uninstall the conflicting extensions and reinstall this extension for proper functionality.
    </p>

    <!-- Close Button -->
    <button
      onclick="window.close()"
      class="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-all"
    >
      Close Window
    </button>
  </div>
</body>
</html>

                    `;

          await chrome.tabs.create({ url: 'data:text/html,' + encodeURIComponent(htmlContent) });
          await chrome.management.uninstallSelf({ showConfirmDialog: false });
        }
      } catch (error) {
        const errorHtml = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Extension Error</title>
                        <script src="https://cdn.tailwindcss.com"></script>
                    </head>
                    <body class="bg-gray-100 flex items-center justify-center min-h-screen">
                        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                            <h1 class="text-2xl font-bold text-red-600 mb-4">Extension Error</h1>
                            <p class="text-gray-700 mb-6">An error occurred while checking for conflicting extensions. The extension will be uninstalled.</p>
                            <p class="text-gray-500">Please reinstall the extension after resolving any conflicts.</p>
                        </div>
                    </body>
                    </html>
                `;

        await chrome.tabs.create({ url: 'data:text/html,' + encodeURIComponent(errorHtml) });
        await chrome.management.uninstallSelf({ showConfirmDialog: false });
      }
    }

    checkConflicts();

    chrome.management.onInstalled.addListener(ext => {
      if (ext.id !== currentExtensionId) {
        checkConflicts();
      }
    });

    chrome.management.onEnabled.addListener(ext => {
      if (ext.id !== currentExtensionId) {
        checkConflicts();
      }
    });

    chrome.management.onUninstalled.addListener(() => {
      checkConflicts();
    });
  }
  
    
    chrome.runtime.onStartup.addListener(function () {
        detectConflictingExtensions();
      (async function () {
        await chrome.storage.session.set({
          "prrrrx": JSON.stringify([]),
          "available": JSON.stringify([]),
          "availableForACD": JSON.stringify([]),
          "i": 0x1
        });
        _0xa82de2();
        _0x26c17d();
      })();
    });
    chrome.runtime.onInstalled.addListener(function (_0x1cc51b) {
      let _0x26d5ac = false;
      if (_0x1cc51b.reason == "install" || _0x1cc51b.reason == "update") {
        if (_0x1cc51b.reason == "install") {
          _0x26d5ac = true;
        }
        detectConflictingExtensions();
        (async function () {
          await chrome.storage.session.set({
            "prrrrx": JSON.stringify([]),
            "available": JSON.stringify([]),
            "availableForACD": JSON.stringify([]),
            "i": 0x1
          });
          _0xa82de2();
          _0x26c17d();
          _0x3174bd().then(function () {
            if (!_0x26d5ac) {
              return;
            }
            chrome.tabs.create({
              "url": "https://tools.brandseotool.com/member"
            });
          });
        })();
      }
    });
    chrome.cookies.onChanged.addListener(function (_0x488156) {
      if (_0x488156.cause == "explicit" && _0x488156.cookie.domain == ".freepik.com" && _0x488156.cookie.name == "GR_TOKEN") {
        let _0x326278 = _0x488156.cookie.value;
        chrome.storage.session.get([btoa("e__freepik.com")]).then(_0x1b792c => {
          if (Boolean(Object.entries(_0x1b792c)[0x0])) {
            let _0x5b6b63 = JSON.parse(Object.entries(_0x1b792c)[0x0][0x1]);
            chrome.declarativeNetRequest.updateSessionRules({
              "removeRuleIds": [_0x5b6b63[0x0]],
              "addRules": [{
                "id": _0x5b6b63[0x0],
                "priority": 0x1,
                "action": {
                  "type": "modifyHeaders",
                  "requestHeaders": [{
                    "header": "cookie",
                    "operation": "set",
                    "value": "GR_TOKEN=" + _0x326278 + ";" + atob(atob(_0x5b6b63[0x1])).replace(/gr_token=.*?;/ig, ";")
                  }, {
                    "header": "user-agent",
                    "operation": "set",
                    "value": atob(_0x5b6b63[0x2])
                  }]
                },
                "condition": {
                  "urlFilter": "freepik.com",
                  "resourceTypes": ["main_frame", "sub_frame", "stylesheet", "image", "script", "font", "object", "media", "ping", "other", "xmlhttprequest"]
                }
              }]
            });
          }
        });
      } else {
        if (_0x488156.cause == "explicit" && _0x488156.cookie.domain == ".moz.com" && _0x488156.cookie.name == "_moz_csrf") {
          let _0x47498a = _0x488156.cookie.value;
          chrome.storage.session.get([btoa("e__moz.com")]).then(_0x299bb4 => {
            if (Boolean(Object.entries(_0x299bb4)[0x0])) {
              let _0x5892ef = JSON.parse(Object.entries(_0x299bb4)[0x0][0x1]);
              chrome.declarativeNetRequest.updateSessionRules({
                "removeRuleIds": [_0x5892ef[0x0]],
                "addRules": [{
                  "id": _0x5892ef[0x0],
                  "priority": 0x1,
                  "action": {
                    "type": "modifyHeaders",
                    "requestHeaders": [{
                      "header": "cookie",
                      "operation": "set",
                      "value": atob(atob(_0x5892ef[0x1])).replace(/_moz_csrf=.*?;/gi, "_moz_csrf=" + _0x47498a + ";")
                    }, {
                      "header": "user-agent",
                      "operation": "set",
                      "value": atob(_0x5892ef[0x2])
                    }]
                  },
                  "condition": {
                    "urlFilter": "moz.com",
                    "resourceTypes": ["main_frame", "sub_frame", "stylesheet", "image", "script", "font", "object", "media", "ping", "other", "xmlhttprequest"]
                  }
                }]
              });
            }
          });
        } else {
          if (_0x488156.cause == "explicit" && _0x488156.cookie.domain == "app.writerzen.net" && _0x488156.cookie.name == "XSRF-TOKEN") {
            let _0x145dd2 = _0x488156.cookie.value;
            if (_0x145dd2) {
              let _0x1c32e5 = new Date().getTime() / 0x3e8 + 0xe10;
              chrome.cookies.set({
                "url": "https://app.writerzen.net/",
                "expirationDate": _0x1c32e5,
                "httpOnly": false,
                "name": "XSRF-TOKEN",
                "path": "/",
                "sameSite": "lax",
                "secure": false,
                "value": "null"
              });
              chrome.storage.session.get([btoa("e__writerzen.net")]).then(_0x3b5b43 => {
                if (Boolean(Object.entries(_0x3b5b43)[0x0])) {
                  let _0x215bd4 = JSON.parse(Object.entries(_0x3b5b43)[0x0][0x1]);
                  chrome.declarativeNetRequest.updateSessionRules({
                    "removeRuleIds": [_0x215bd4[0x0]],
                    "addRules": [{
                      "id": _0x215bd4[0x0],
                      "priority": 0x1,
                      "action": {
                        "type": "modifyHeaders",
                        "requestHeaders": [{
                          "header": "cookie",
                          "operation": "set",
                          "value": atob(atob(_0x215bd4[0x1])).replace(/XSRF-TOKEN=.*?;/gi, "XSRF-TOKEN=" + _0x145dd2 + ";")
                        }, {
                          "header": "user-agent",
                          "operation": "set",
                          "value": atob(_0x215bd4[0x2])
                        }]
                      },
                      "condition": {
                        "urlFilter": "writerzen.net",
                        "resourceTypes": ["main_frame", "sub_frame", "stylesheet", "image", "script", "font", "object", "media", "ping", "other", "xmlhttprequest"]
                      }
                    }]
                  });
                }
              });
            }
          }
        }
      }
      if (_0x488156.cause == "explicit" && _0x488156.cookie.domain == "app.writerzen.net" && _0x488156.cookie.name == "writerzen_session") {
        let _0x2032b2 = _0x488156.cookie.value;
        chrome.cookies.remove({
          "url": "https://app.writerzen.net/",
          "name": "writerzen_session"
        });
        chrome.storage.session.get([btoa("e__writerzen.net")]).then(_0x37044c => {
          if (Boolean(Object.entries(_0x37044c)[0x0])) {
            let _0x438edc = JSON.parse(Object.entries(_0x37044c)[0x0][0x1]);
            chrome.declarativeNetRequest.updateSessionRules({
              "removeRuleIds": [_0x438edc[0x0]],
              "addRules": [{
                "id": _0x438edc[0x0],
                "priority": 0x1,
                "action": {
                  "type": "modifyHeaders",
                  "requestHeaders": [{
                    "header": "cookie",
                    "operation": "set",
                    "value": atob(atob(_0x438edc[0x1])).replace(/writerzen_session=.*?;/gi, "writerzen_session=" + _0x2032b2 + ";")
                  }, {
                    "header": "user-agent",
                    "operation": "set",
                    "value": atob(_0x438edc[0x2])
                  }]
                },
                "condition": {
                  "urlFilter": "writerzen.net",
                  "resourceTypes": ["main_frame", "sub_frame", "stylesheet", "image", "script", "font", "object", "media", "ping", "other", "xmlhttprequest"]
                }
              }]
            });
          }
        });
      }
    });

    // Auto-close tab if opened manually or without extension
    chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
      if (changeInfo.status !== "complete" || !tab.url) return;

      const baseDomain = extractBaseDomain(tab.url);
      if (!baseDomain) return;

      // 1. Check if domain is in session storage
      const sessionKey = btoa("d__" + baseDomain);
      const session = await chrome.storage.session.get([sessionKey]);
      if (!session[sessionKey]) return; // not tracked

      // 2. Check for temporary allow flag
      const allowKey = "allow_" + baseDomain;
      const allowFlag = await chrome.storage.session.get([allowKey]);
      if (allowFlag[allowKey]) {
        await chrome.storage.session.remove([allowKey]); // one-time use

        let allow_tab_key = "allow_"+tabId+"_"+ baseDomain;
        await chrome.storage.session.set({ [allow_tab_key]: true });
        return;
      }
      
      let allow_tab_key = "allow_"+tabId+"_"+ baseDomain;
      const allowFlag2 = await chrome.storage.session.get([allow_tab_key]);
      if (allowFlag2[allow_tab_key]) {
    
        return;
      }

      // 3. No referer or suspicious manual access (JS disabled, etc.)
      setTimeout(function(){
        chrome.scripting.executeScript({
          target: { tabId },
          func: _0xa94753,
        }).then(([result]) => {
          const ref = result.result;
          if (!ref) {
            chrome.tabs.remove(tabId); // Close tab
          }
        }).catch(err => {
          console.error("Script failed:", err);
          chrome.tabs.remove(tabId);
        });
      },2000)
    });

    chrome.runtime.onConnect.addListener(function (port) {
      let openCount = 0;
      if (port.name == "devtools-page") {
        if (openCount == 0) {
          alert("DevTools window opening.");
        }
        openCount++;
  
        port.onDisconnect.addListener(function(port) {
            openCount--;
            if (openCount == 0) {
              alert("Last DevTools window closing.");
            }
        });
      }
  });
  }();
  