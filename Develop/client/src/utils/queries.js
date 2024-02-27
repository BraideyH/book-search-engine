import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    me {
        username
        email
        _id
        bookCount
        savedBooks {
            authors
            bookId
            title
            description
            link
            image
        }
    }
}`;