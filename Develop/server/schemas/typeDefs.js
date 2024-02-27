const {gql} =require('apollo-server-express');

const typeDefs = gql`
    type User{
        username: String
        email: String
        _id: ID
        bookCount: Int
        savedBooks: [Book]
    }
    
    type Books {
        bookId: ID
        authors: String
        description: String
        title: String
        image: String
        link: String
    }
    
    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: SavedBookInput): User
        removeBook(bookId: String!): User
}`;

module.exports = typeDefs;