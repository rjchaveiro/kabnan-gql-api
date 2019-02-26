import { Book, Author, Card, Column } from "../models";

export default {
  Query: {
    Author: (parent, { id }) => Author.findById(id),
    Book: (parent, { id }) => Book.findById(id),
    Card: (parent, { id }) => Card.findById(id),
    Column: (parent, { id }) => Column.findById(id),
    Authors: (parent, args) => Author.find({}),
    Cards: (parent, args) => Card.find({}),
    Columns: (parent, args) => Column.find({}),
    Books: (parent, args) => Book.find({}),
    cards: (parent, args) => Card.find({ columnId: parend.id })
  },

  Mutation: {
    addAuthor: (parent, args) => {
      const author = new Author({ ...args });
      return author.save();
    },
    addBook: (parent, args) => {
      const book = new Book({ ...args });
      return book.save();
    },
    addCard: (parent, args) => {
      const card = new Card({ ...args });
      return card.save();
    },
    addColumn: (parent, args) => {
      const column = new Column({ ...args });
      return column.save();
    }
  }
};
