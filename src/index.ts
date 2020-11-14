import * as express from 'express';
import { getCollectionsData } from './functions/getCollectionsData';
import { outlineCollections } from './functions/outlineCollections';

const app = express();
const port = 8080; // default port to listen

app.get('/outline', async (req, res) => {
  try {
    const uri: string = req.query.uri as string;
    const dbName: string = req.query.dbName as string;
    const collections: string[] = req.query.collections as string[];
    const collectionsData = await getCollectionsData(uri, dbName, collections);
    const outlinedCollections = outlineCollections(collectionsData);
    res.status(200).json({ outlinedCollections });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at http://localhost:${port}`);
});
