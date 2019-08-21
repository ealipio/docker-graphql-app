const { graphql, buildSchema } = require('graphql');
// import  { graphql, buildSchema }  from'graphql';

const schema = buildSchema(`
    type Query {
        message: String
    }
`);

const resolvers = () => {
  const message = () => {
    return 'Hello World GraphQL';
  };
  return { message };
};

// query execution

const executeQuery = async () => {
  const result = await graphql(schema, '{message}', resolvers());
  console.log(result.data);
};

executeQuery();
