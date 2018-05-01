import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withState } from 'recompose';

class App extends Component {
  render() {
    const {
      data: { loading, me },
      setStage,
    } = this.props;
    console.log({ loading, me });
    return (
      <main>
        <code>loading</code>
        <pre>{loading}</pre>

        <code>me</code>
        <pre>{JSON.stringify(me)}</pre>

        <button onClick={() => setStage(2)}>Stage 2</button>
      </main>
    );
  }
}

const SmallFragment = gql`
  fragment SmallFragment on User {
    id
    sharedWithYouAccount {
      id
    }
  }
`;

const BigFragment = gql`
  fragment BigFragment on Account {
    id
    membership {
      id
    }
  }
`;

export default compose(
  withState('stage', 'setStage', 1),
  graphql(
    gql`
      query($useBig: Boolean!) {
        me {
          ...SmallFragment
          sharedWithYouAccount @include(if: $useBig) {
            ...BigFragment
          }
        }
      }
      ${SmallFragment}
      ${BigFragment}
    `,
    {
      options: ({ stage }) => ({
        variables: {
          useBig: stage === 2,
        },
      }),
    }
  )
)(App);
