import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                username
                _id
            }
            token
        }
    }`

export const ADD_USER = gql`
mutation addUser($email: String!, $username: String!, $password: String!) {
    addUser(email: $email, username: $username, password: $password) {
        user {
            _id
            username
        }
        token
    }
}`

export const SAVE_BOOK = gql`
mutation saveBook($book: SavedBookInput!) {
    saveBook(book: $book) {
        email
        username
        bookCount
        savedBooks {
            title
            description
            image
            authors
            bookId
            link
        }
    }
}`

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        email
        username
        bookCount
        savedBooks {
            title 
            description
            image
            authors
            bookId
            link
        }
    }
}`