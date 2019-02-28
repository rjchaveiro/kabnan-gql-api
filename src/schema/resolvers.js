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
    Columns: (parent, args, { user }) => Column.find({}),
    me: (parent, args, { user }) => {
      if (!user) throw new Error('You are not authorized to access.');
      return User.findById(user.id);
    },
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

      const user = new User({ email, password: await bcrypt.hash(password, 10) });

      user.jwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1y' });

      return user.save();
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) throw new Error('Could not find an user with this email.');

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) throw new Error('Wrong password.');

      user.jwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

      return user;
    },
  },
};
