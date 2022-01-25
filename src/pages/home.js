import React from 'react';
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from 'react-markdown';

import NoteFeed from '../components/NoteFeed';
import Button from "../components/Button";
import { GET_NOTES } from '../gql/query';

function Home() {
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error!</p>

    return (
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {/* Only display the Load More button if hasNextPage is true */}
            {data.noteFeed.hasNextPage && (
                // onClick perform a query, passing the current cursor as a variable
                <Button
                    onClick={() =>
                        fetchMore({
                            variables: {
                                cursor: data.noteFeed.cursor
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {
                                return {
                                    noteFeed: {
                                        cursor: fetchMoreResult.noteFeed.cursor,
                                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                        // combine the new results and the old
                                        notes: [
                                            ...previousResult.noteFeed.notes,
                                            ...fetchMoreResult.noteFeed.notes
                                        ],
                                        __typename: 'noteFeed'
                                    }
                                };
                            }
                        })}
                >
                    Load more
                </Button>
            )}
        </React.Fragment>
    );
};

export default Home;