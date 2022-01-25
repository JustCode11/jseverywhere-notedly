import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Note from '../components/Note';
import { GET_NOTE } from '../gql/query';

const NotePage = () => {
    let { id } = useParams();
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! Note not found</p>

    return (
        <Note note={data.note} />
    );
};

export default NotePage;