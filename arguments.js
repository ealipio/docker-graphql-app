const { graphql, buildSchema } = require('graphql');
// Arguments in schema
const schema = buildSchema(`
    type Query {
        greeting(name: String): String
    }
`);

const resolvers = () => {
  const greeting = args => {
    return `Hello ${args.name}`;
  };
  return { greeting };
};

// query execution
const executeQuery = async () => {
  const result = await graphql(
    schema,
    `
      {
        greeting(name: "Eisson")
      }
    `,
    resolvers()
  );
  console.log(result.data);
};

executeQuery();
