export function storageFactory(getStorage) {
  let inMemoryStorage = {};

  function isSupported() {
    try {
      const testKey = "__local_test_key__";
      getStorage().setItem(testKey, testKey);
      getStorage().removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  function clear() {
    if (isSupported()) {
      getStorage().clear();
    } else {
      inMemoryStorage = {};
    }
  }

  function getItem(name) {
    if (isSupported()) {
      return getStorage().getItem(name);
    }
    if ("name" in inMemoryStorage) {
      return inMemoryStorage[name];
    }
    return null;
  }

  function key(index) {
    if (isSupported()) {
      return getStorage().key(index);
    } else {
      return Object.keys(inMemoryStorage)[index] || null;
    }
  }

  function removeItem(name) {
    if (isSupported()) {
      getStorage().removeItem(name);
    } else {
      delete inMemoryStorage[name];
    }
  }

  function setItem(name, value) {
    if (isSupported()) {
      getStorage().setItem(name, value);
    } else {
      inMemoryStorage[name] = String(value); // not everyone uses TypeScript
    }
  }

  function length() {
    if (isSupported()) {
      return getStorage().length;
    } else {
      return Object.keys(inMemoryStorage).length;
    }
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    key,
    get length() {
      return length();
    },
  };
}

export const local = storageFactory(() => localStorage);
export const session = storageFactory(() => sessionStorage);
