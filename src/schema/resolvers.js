import { Book, Author, Card, Column, User } from 'models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Query: {
    Author: (parent, { id }) => Author.findById(id),
    Book: (parent, { id }) => Book.findById(id),
    Card: (parent, { id }) => Card.findById(id),
    Column: (parent, { id }) => Column.findById(id),
    User: (parent, { id }) => User.findById(id),
    Authors: (parent, args) => Author.find({}),
    Cards: (parent, args) => Card.find({}),
    Columns: (parent, args) => Column.find({}),
  },

  Column: { cards: (parent, args) => Card.find({ columnId: parent.id }) },

  Author: { books: (parent, args) => Book.find({ authorId: parent.id }) },

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
    },
    signup: async (parent, { email, password }) => {
      const existingUser = await User.findOne({ email });
      
      if (existingUser) throw new Error('Email already registered!');

      const hash = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hash });
      user.jwt = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

      return user.save();
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) throw new Error('Could not find an user with this email.');

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) throw new Error('Wrong password.');

      user.jwt = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

      return user;
    },
  },
};
