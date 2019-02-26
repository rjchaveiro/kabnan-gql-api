import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from "graphql";
import { Card, Column } from "../models";

const ColumnType = new GraphQLObjectType({
  name: "Column",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    cards: {
      type: new GraphQLList(CardType),
      resolve(parent, args) {
        return Card.find({ columnId: parent.id });
      }
    }
  })
});

const CardType = new GraphQLObjectType({
  name: "Card",
  fields: () => ({
    id: { type: GraphQLID },
    client: { type: GraphQLString },
    description: { type: GraphQLString },
    reference: { type: GraphQLString },
    columnId: { type: GraphQLString },
    tier: { type: GraphQLString },
    column: {
      type: ColumnType,
      resolve(parent, args) {
        return Column.find({ id: parent.columnId });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    Column: {
      type: ColumnType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Column.findById(args.id);
      }
    },
    Card: {
      type: CardType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Card.findById(args.id);
      }
    },
    Columns: {
      type: new GraphQLList(ColumnType),
      resolve(parent, args) {
        return Column.find({});
      }
    },
    Cards: {
      type: new GraphQLList(CardType),
      resolve(parent, args) {
        return Card.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCard: {
      type: CardType,
      args: {
        client: { type: GraphQLString },
        description: { type: GraphQLString },
        reference: { type: GraphQLString },
        columnId: { type: GraphQLString },
        tier: { type: GraphQLString }
      },
      resolve(parent, args) {
        const author = new Card({ ...args });
        return author.save();
      }
    },
    addColumn: {
      type: ColumnType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const book = new Column({ ...args });
        return book.save();
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
