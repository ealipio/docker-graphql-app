const { buildSchema } = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

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
    enum CarTypes {
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
        carsByType(type:CarTypes!): [Car]
        carsById(id: ID!): Car
    }
    type Mutation {
      insertCar(brand: String!, color: String!, doors: Int!, type: CarTypes!): [Car]!

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
  const insertCar = ({ brand, color, doors, type }) => {
    db.cars.push({
      id: Math.random().toString(),
      brand: brand,
      color: color,
      doors: doors,
      type: type
    });
    return db.cars;
  };

  return { carsByType, carsById, insertCar };
};

app.use(
  '/graphql',
  graphqlHTTP({ schema: schema, rootValue: resolvers(), graphiql: true })
);

app.listen(3000);
console.log('server running on port 3000');