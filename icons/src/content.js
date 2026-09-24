(async function () {
    'use strict';
  
    chrome.runtime.sendMessage("verify-bg-hash", (response) => {
      let expectedHash = "35a2ed40402d4e7c78f6b9ca38614bf6fe7fec18b99715390285fb97e8449d25";
      if (response.hash !== expectedHash) {
        chrome.runtime.sendMessage({ x93937: "x93937" });
      }
    });
    async function decryptFromOnline(encryptedBase64) {
      try {
        const formData = new URLSearchParams();
        formData.append("action", "decryptFromPHP");
        formData.append("encryptedBase64", encryptedBase64);
        const response = await fetch("https://tools.brandseotool.com/action", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formData.toString()
        });
        const json = await response.json();

        return json;
      } catch (err) {
        return null;
      }
    }
    async function decryptFromPHP(encryptedBase64) {
      try {
          const key = 'aZ9fG3kLpQ8rT5vN2sW4yH1uX0cB7eMx';
  
          // Decode base64 to get raw bytes
          const decoded = atob(encryptedBase64);
          const rawData = new Uint8Array([...decoded].map(c => c.charCodeAt(0)));
  
          // Extract IV (first 12 bytes)
          const iv = rawData.slice(0, 12);
  
          // Extract ciphertext (excluding IV and Tag)
          const ciphertext = rawData.slice(12, rawData.length - 16);
  
          // Extract Auth Tag (last 16 bytes)
          const tag = rawData.slice(rawData.length - 16);
  
          // Combine ciphertext + tag (as expected by Web Crypto API)
          const encryptedData = new Uint8Array([...ciphertext, ...tag]);
  
          // Import key
          const cryptoKey = await crypto.subtle.importKey(
              'raw',
              new TextEncoder().encode(key.padEnd(32, '\0')), // match PHP zero-padded key
              { name: 'AES-GCM' },
              false,
              ['decrypt']
          );
  
          // Decrypt
          const decrypted = await crypto.subtle.decrypt(
              { name: 'AES-GCM', iv },
              cryptoKey,
              encryptedData
          );
          let decryptedData = new TextDecoder().decode(decrypted);
          return JSON.parse(decryptedData);
      } catch (err) {
          let onlineDecryptedData = await decryptFromOnline(encryptedBase64);
          return onlineDecryptedData;
      }
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    document.querySelector("body").setAttribute("data-extension-version", "3.0.1");
    document.querySelector("body").setAttribute("data-extension", "active");
  
    if (
      urlParams.get("access") &&
      urlParams.get("request") &&
      urlParams.get("data") &&
      document.getElementById("username") &&
      document.getElementById("username").value !== "" &&
      document.getElementById("userid") &&
      document.getElementById("userid").value !== "" &&
      document.getElementById("status")
    ) {
      let hostname = new URL(window.location.href).hostname;
      let matchedDomain = "";
  
      hostname.split(".").forEach(part => {
        if (part === "brandseotool") {
          matchedDomain = part;
        }
      });
  
      let domainChars = matchedDomain.split("");
  
      if (
        matchedDomain === "brandseotool" &&
        matchedDomain.length === 12
      ) {
        if (
          document.querySelector("textarea.user_data_base64") &&
          document.querySelector("textarea.user_data_base64").value !== "" &&
          document.getElementById("username").value !== "" &&
          document.getElementById("userid").value !== ""
        ) {
          if (
            domainChars[5] === "s" &&
            domainChars[9] === "o" &&
            domainChars[0] === "b" &&
            domainChars[3] === "n" &&
            matchedDomain.split("")[2] === "a"
          ) {
            let encryptedData = document.querySelector("textarea.user_data_base64").value;

            const decryptedData = await decryptFromPHP(encryptedData);



            //let userData = JSON.parse(decryptedData);
            let userData = decryptedData;
  
            let username = document.getElementById("username").value;
            let userid = document.getElementById("userid").value;
  
            document.querySelector("textarea.user_data_base64").value = "";
            document.querySelector("textarea.user_data_base64").remove();
  
            const compressed = userData.c;
            const diffLength = compressed.length - "abcdefghijklmnopqrstuvwxyz".length;
            const insertInterval = Math.floor(diffLength / "abcdefghijklmnopqrstuvwxyz".length) + 1;
  
            let cleanedData = "";
            let skipIndex = 0;
  
            for (let i = 0; i < compressed.length; i++) {
              if ((i + 1) % insertInterval === 0 && skipIndex < "abcdefghijklmnopqrstuvwxyz".length) {
                skipIndex++;
                continue;
              }
              cleanedData += compressed[i];
            }
  
            userData.type = atob(userData.type);
            userData.stype = atob(userData.stype);
            userData.s = atob(userData.s);
            userData.c = atob(atob(atob(atob(cleanedData))));
            userData.d = hostname;
            userData.t = userData.token;
  
            if (userData.l !== "") {
              userData.l = atob(userData.l).split(",");
            }
  
            userData.userid = userid;
            userData.username = username;
  
            if (userData.type === "login" && userData.stype === "ls") {
              function objectToArray(obj) {
                let result = [];
                Object.keys(obj).forEach(key => {
                  result.push({ key: key, value: obj[key] });
                });
                return result;
              }
  
              userData.c = objectToArray(JSON.parse(userData.c));
            }
  
            if (matchedDomain.split("")[5] === "s") {
              document.getElementById("status").value = "success";
              chrome.runtime.sendMessage({
                type: userData.type,
                data: JSON.stringify(userData),
                redirect: userData.url
              });
            }
          }
        }
      }
    }
  })();
  