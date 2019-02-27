import resolvers from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import fs from 'fs';
import path from 'path';

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8');
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
