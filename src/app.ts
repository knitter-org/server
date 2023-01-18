import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import PouchDB from 'pouchdb';

import * as corsProxy from './cors-proxy';

const db = new PouchDB('knitter');
console.log('Database ready...');

const app = express();
app.use(morgan('combined'));

const corsOptions = {
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/proxy', corsProxy.router)
app.use('/db/', require('express-pouchdb')(PouchDB));

console.log('Listening on port 3000...');
app.listen(3000);
