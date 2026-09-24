function _0x309c4d(_0x163205) {
      localStorage.clear();
      setTimeout(() => {
        _0x163205.forEach(_0x2ae00a => {
          localStorage.setItem(_0x2ae00a.key, _0x2ae00a.value);
        });
        location.reload();
      }, 1000);
}
function _0x309c4d1(_0x22422f, _0x5f1502) {
  const dbName = "firebaseLocalStorageDb";

  
  if (_0x22422f.firebaseLocalStorageDb) {
    const openRequest = window.indexedDB.open(dbName);


    openRequest.onupgradeneeded = (event) => {
      const db = event.target.result;
      for (const store in _0x22422f.firebaseLocalStorageDb.stores) {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, { keyPath: "fbase_key" });
        }
      }
    };

    openRequest.onsuccess = (event) => {
      const db = event.target.result;
      for (const store in _0x22422f.firebaseLocalStorageDb.stores) {
        const transaction = db.transaction(store, "readwrite");
        const objectStore = transaction.objectStore(store);
        const promises = [];
        objectStore.clear();
        _0x22422f.firebaseLocalStorageDb.stores[store].forEach(item => {
          promises.push(new Promise((resolve, reject) => {
            const putRequest = objectStore.put(item);
            putRequest.onsuccess = () => resolve(true);
            putRequest.onerror = () => reject(false);
          }));
        });

        Promise.all(promises).then(() => {
          db.close();
          setTimeout(() => {
            location.href = _0x5f1502;
          }, 1000);
        });
      }
    };
  }
}

function _0x1eef28(_0x72c8db) {
  setInterval(() => {
    if (_0x72c8db.includes(location.href)) {
      document.body.innerHTML = '';
    }
  }, 0x1f4);
}
function _0xa94751() {
  localStorage.clear();
  location.reload();
}
function _0xa94753() {
  return document.referrer;
}