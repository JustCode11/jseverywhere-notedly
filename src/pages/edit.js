import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = () => {
    let navigate = useNavigate();
    let { id } = useParams();
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    // fetch the current user data
    const { data: userdata } = useQuery(GET_ME);

    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            navigate(`/note/${id}`);
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! Note not found</p>

    // if the current user and the author of the note do not match
    if (userdata.me.id !== data.note.author.id) {
        return <p>You do not have access to edit this note</p>;
    }

    return <NoteForm content={data.note.content} action={editNote} />
};

export default EditNote;