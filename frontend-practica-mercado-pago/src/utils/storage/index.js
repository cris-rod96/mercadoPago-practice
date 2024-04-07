const saveStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getStorage = (key) => {
  const dataStorage = localStorage.getItem(key);
  return dataStorage ? JSON.parse(dataStorage) : [];
};

const deleteAllStorage = (key) => {
  localStorage.removeItem(key);
};

const removeProductShoppingCart = (key, id) => {
  const dataStorage = getStorage(key);
  const dataFilterStorage = dataStorage.filter((data) => data.id !== id);
  saveStorage(key, dataFilterStorage);
};

export default {
  saveStorage,
  getStorage,
  deleteAllStorage,
  removeProductShoppingCart,
};
