const objectName = 'lastFiveDays';

// this is the min function for cache, Ideally it should update record
// if there is already exist record with this country, as well as should have delete function

class Cache {
  constructor(dbName = 'COVID', version = 1) {
    if (window.indexedDB) {
      const indexDb = window.indexedDB;
      this.request = indexDb.open(dbName, version);
      this.request.onsuccess = event => {
        this.db = event.target.result;
      };
      this.createDbObject();
    } else {
      console.error('Browser is not supporting IndexedDb');
    }
  }

  createDbObject() {
    this.request.onupgradeneeded = event => {
      this.db = event.target.result;
      this.db.createObjectStore(objectName, {
        keyPath: 'date',
      });
    };
  }

  insert(data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(objectName, 'readwrite');
      const objectStore = transaction.objectStore(objectName);
      const request = objectStore.add(data);
      request.onsuccess = function (event) {
        resolve();
      };
      request.onerror = function (event) {
        reject(event);
      };
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([objectName]);
      const objectStore = transaction.objectStore(objectName);
      const request = objectStore.get(key);
      request.onerror = function (event) {
        reject(event);
      };
      request.onsuccess = function (event) {
        resolve(request.result);
      };
    });
  }
}

export default new Cache();
