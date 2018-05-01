import { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from 'graphql';

const MembershipType = new GraphQLObjectType({
  name: 'Membership',
  fields: {
    id: { type: GraphQLID },
  },
});

const AccountType = new GraphQLObjectType({
  name: 'Account',
  fields: {
    id: { type: GraphQLID },
    membership: { type: MembershipType },
  },
});

const UserType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    sharedWithYouAccount: { type: AccountType },
  },
});

const me = {
  id: 'me',
  sharedWithYouAccount: {
    id: 'account',
    membership: {
      id: 'membership',
    },
  },
};

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    me: {
      type: UserType,
      resolve: () => me,
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
