import { Book, Author, Card, Column, User } from 'models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Query: {
    Card: (parent, { id }) => Card.findById(id),
    Column: (parent, { id }) => Column.findById(id),
    User: (parent, { id }) => User.findById(id),
    Cards: (parent, args) => Card.find({}),
    Columns: (parent, args, { user }) => Column.find({}),
    userColumns: (parent, { userID }) => Column.find({ userID }),
    me: (parent, args, { user }) => {
      return User.findById(user._id);
    },
  },

  Column: { cards: (parent, args) => Card.find({ columnId: parent.id }) },
  User: { columns: (parent, args) => Column.find({ userID: parent.id }) },

  Mutation: {
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
      const savedUser = await user.save();
      const defaultColumn = new Column({ name: 'Backlog', userID: savedUser.id });

      await defaultColumn.save();
      
      return savedUser;
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
