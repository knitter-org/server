import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import PouchDB from 'pouchdb';

import * as corsProxy from './cors-proxy';

const pouchdb = PouchDB.defaults({ prefix: './database/' });
po
console.log('Database ready...');

const app = express();
app.use(morgan('combined'));

const corsOptions = {
    origin: true,
    credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/proxy', corsProxy.router)
app.use('/db/', require('express-pouchdb')(pouchdb));

console.log('Listening on port 3000...');
app.listen(3000);
