interface CollectionData {
  name: string;
  docs: {
    [key: string]: any;
  }
}

interface OutlinedCollection {
  name: string;
  keys: OutlinedKey[];
}

interface OutlinedKey {
  keyName: string;
  count: number;
  percentage: number;
}

function outlineCollections(collectionsData: CollectionData[]): OutlinedCollection[] {
  const outlinedCollections: OutlinedCollection[] = [];
  for (let i = 0; i < collectionsData.length; i++) {
    const collection = collectionsData[i];
    const outlinedCollection = {
      name: collection.name,
      keys: [],
      docsCount: collection.docs.length,
    };
    const schemaKeys = {};
    const { docs } = collection;
    const docsCount = docs.length;
    for (let d = 0; d < docsCount; d++) {
      const doc = docs[d];
      for (const key in doc) {
        if ({}.hasOwnProperty.call(doc, key)) {
          const existingKeyLog = schemaKeys[key];
          if (existingKeyLog) {
            schemaKeys[key] = existingKeyLog + 1;
          } else {
            schemaKeys[key] = 1;
          }
        }
      }
    }
    for (const schemaKey in schemaKeys) {
      if ({}.hasOwnProperty.call(schemaKeys, schemaKey)) {
        const count = schemaKeys[schemaKey];
        const percentage = (count / docsCount) * 100;
        const outlinedKey = { keyName: schemaKey, count, percentage: percentage.toFixed(2) };
        outlinedCollection.keys.push(outlinedKey);
      }
    }
    outlinedCollection.keys.sort((x, y) => x.percentage - y.percentage);
    outlinedCollections.push(outlinedCollection);
  }

  return outlinedCollections;
}

export { outlineCollections };
