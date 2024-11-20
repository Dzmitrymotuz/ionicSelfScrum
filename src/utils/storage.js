import {Drivers, Storage} from "@ionic/storage";

const storage = new Storage({
  name: 'encompass',
  driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
});
storage.create();


export default 
  storage
  // async set(key, value) {
  //   await storage.set(key, value);
  // },

  // async get(key) {
  //   if (!storage) {
  //     await storageInstance.create(); // Ensure storage is initialized before accessing
  //   }
  //   return await storage.get(key);
  // },

  // async remove(key) {
  //   if (!storage) {
  //     await storageInstance.create();
  //   }
  //   await storage.remove(key);
  // },

  // async clear() {
  //   if (!storage) {
  //     await storageInstance.create();
  //   }
  //   await storage.clear();
  // },
