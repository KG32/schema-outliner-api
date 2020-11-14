import * as MongoClient from 'mongodb';

async function getCollectionsData(uri: string, dbName: string, collectionsNames: string[]) {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db(dbName);
  const collections = await Promise.all(collectionsNames.map(async (colName) => {
    const col = db.collection(colName);
    const docs = await col.find({}).toArray();
    return { name: colName, docs };
  }));
  return collections;
}

export { getCollectionsData };
