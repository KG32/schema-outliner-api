import * as MongoClient from 'mongodb';
import { CollectionData } from './outlineCollections';

async function getCollectionsData(uri: string, dbName: string): Promise<CollectionData[]> {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db(dbName);
  const dbCollections = await db.listCollections().toArray();
  if (!dbCollections.length) throw new Error('dbEmptyOrNotFound');
  const collections: CollectionData[] = [];
  for (let i = 0; i < dbCollections.length; i++) {
    const colName = dbCollections[i].name;
    const collection = db.collection(colName);
    const docs = await collection.find({}).toArray();
    collections.push({ name: colName, docs });
  }

  return collections;
}

export { getCollectionsData };
