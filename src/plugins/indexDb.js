import Dexie from "dexie";

class IndexedDB {
  static async indexedDBRequest(table, data, method) {
    const db = new Dexie("saledb");
    db.version(1).stores({
      saledb: "++id",
    });
    let consult;
    switch (method) {
      case "post":
        await db.table(table).add(data);
        break;
      case "get":
        await db.table(table).get(data);
        break;
      case "put":
        await db.table(table).put(data);
        break;
      case "delete":
        await db.table(table).delete(data);
        break;
      case "getAll":
        consult = await db.table(table).toArray();
        break;
      case "deleteAll":
        await db.table(table).clear();
        // localStorage.setItem("saleCompany", "");
        break;
      default:
        break;
    }

    return consult;
  }
}

export default { IndexedDB };
