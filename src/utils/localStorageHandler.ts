const localStorageHandler = (action: any, state: any) => {
  localStorage.setItem(action.payload.city, action.payload.city);
  let citiesFromStorage: Array<string> = [];
  let keys = Object.keys(localStorage);
  for (let key of keys) {
    citiesFromStorage.push(key);
  }
  state.recentCities = citiesFromStorage;
};

export default localStorageHandler;
