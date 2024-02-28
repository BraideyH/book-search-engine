const { Book, User } = require('../models');
// const {AuthenticationError} = require('apollo-server-express');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const data = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return data;
            }
            throw new AuthenticationError('Please Login');
        },
    },

    Mutation: {
        login: async (parent, { email, password}) => {
            const user = await User.findOne({email});
            if (!user) {
                throw new AuthenticationError('No User Found! Try creating an account.')
            }

            const validPass = await user.isCorrectPassword(password)
            if(!validPass) {
                throw new AuthenticationError('Invalid Password');
            }

            const token = signToken(user);
            return {token, user};
        },
        addUser: async (parent, {email, username, password}) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, { newBook}, context) => {
            if(context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $push: {savedBooks: newBook}},
                    { new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('Please Login');
        },
        deleteBook: async (parent, {bookId}, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $pull: {savedBooks: {bookId}}},
                    { new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('Login Required');
        }
    }
}

module.exports = resolvers;