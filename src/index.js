import express from "express";
import graphqlHTTP from "express-graphql";
import expressPlayground from "graphql-playground-middleware-express";
import schema from "./schema";
import connectToDb from "./db/connect";
import cors from "cors";

const app = express();
const port = 1234;

connectToDb();
app.use(cors());
app.use("/api", graphqlHTTP({ schema }));
app.get("/", expressPlayground({ endpoint: "/api" }));

const server = app.listen(port, () =>
  console.log(`Server running at: http://localhost:${server.address().port}`)
);
