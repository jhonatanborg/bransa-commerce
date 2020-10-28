import Idb from "@/plugins/indexDb.js";

const idbActions = {
  idb(context, payload) {
    if (payload.method === "post") {
      if (context.state.saleIdb.length > 0) {
        Idb.IndexedDB.indexedDBRequest(
          payload.idb.table,
          payload.idb.data,
          payload.method
        );
      } else {
        Idb.IndexedDB.indexedDBRequest(
          payload.idb.table,
          payload.idb.data,
          payload.method
        ).then(() => {
          Idb.IndexedDB.indexedDBRequest(
            payload.idb.table,
            null,
            "getAll"
          ).then((data) => {
            context.commit("request", [payload.state, data]);
          });
        });
      }
    } else if (payload.method === "getAll") {
      const idb = Idb.IndexedDB.indexedDBRequest(
        payload.idb.table,
        null,
        "getAll"
      );
      idb.then((data) => {
        context.commit("request", [payload.state, data]);
      });
    } else {
      Idb.IndexedDB.indexedDBRequest(
        payload.idb.table,
        payload.idb.data,
        payload.method
      );
    }
  },
};
export default idbActions;
