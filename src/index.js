import express from 'express';
import graphqlHTTP from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';

import schema from 'schema';
import connectToDb from 'db';

dotenv.config();

const app = express();
const port = 1234;

connectToDb();
app.use(cors());

app.use('/api', graphqlHTTP({ schema }));
app.get('/', expressPlayground({ endpoint: '/api' }));

const server = app.listen(port, () => console.log(`Server running at: http://localhost:${server.address().port}`));
