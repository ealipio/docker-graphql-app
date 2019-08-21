const { graphql, buildSchema } = require('graphql');
const db = {
  cars: [
    {
      id: 'a',
      brand: 'Ford',
      color: 'Blue',
      doors: 4,
      type: 'Sedan'
    },
    {
      id: 'b',
      brand: 'Tesla',
      color: 'Red',
      doors: 4,
      type: 'SUV'
    },
    {
      id: 'c',
      brand: 'Toyota',
      color: 'White',
      doors: 4,
      type: 'Coupe'
    },
    {
      id: 'd',
      brand: 'Toyota',
      color: 'Red',
      doors: 4,
      type: 'Coupe'
    }
  ]
};

// Arguments in schema
const schema = buildSchema(`
    enum CartTypes {
        Sedan
        SUV
        Coupe
    }
    type Car {
      id: ID!
      brand: String!
      color: String!
      doors: Int!
      type: String!
    }
    type Query {
        carsByType(type:CartTypes!): [Car]
        carsById(id: ID!): Car
    }
`);

// create resolvers
const resolvers = () => {
  const carsByType = args => {
    return db.cars.filter(car => car.type === args.type);
  };
  const carsById = args => {
    return db.cars.filter(car => car.id === args.id)[0];
  };

  return { carsByType, carsById };
};

// query execution
const queryByType = `
{
    carsByType(type:Coupe) {
        brand 
        color
        type
        id
    }
}
`
const queryByID = `
{
    carsById(id:"a") {
        brand 
        type
        color
        id
    }
}
`;

const executeQuery = async () => {
  const resultOne = await graphql(
    schema,
    queryByType,
    resolvers()
  );
  const resultTwo = await graphql(schema, queryByID, resolvers());  

  console.log(resultOne.data, resultTwo.data);
};

executeQuery();
