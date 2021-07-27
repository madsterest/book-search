const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No profile found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("No profile found");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (
      parent,
      { authors, description, title, bookId, image, link },
      context
    ) => {
      if (context.user) {
          return User.findOneAndUpdate({_id: context.user._id},
            {$addToSet: {savedBooks: }})
      }
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updateUser = await  User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        return updateUser
      }
      throw new AuthenticationError("You need to be signed in");
    },
  },
};
module.exports = resolvers;
