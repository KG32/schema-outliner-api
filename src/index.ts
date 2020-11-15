import * as express from 'express';
import { getCollectionsData } from './functions/getCollectionsData';
import { outlineCollections } from './functions/outlineCollections';

const app = express();
const port = 8080; // default port to listen

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // todo
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/outline', async (req, res) => {
  try {
    const uri: string = req.query.uri as string;
    if (!uri) throw new Error('noUri');
    const dbName: string = req.query.dbName as string;
    if (!dbName) throw new Error('noDbName');

    const collectionsData = await getCollectionsData(uri, dbName);
    const outlinedCollections = outlineCollections(collectionsData);
    res.status(200).json({ outlinedCollections });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.reason });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at http://localhost:${port}`);
});
