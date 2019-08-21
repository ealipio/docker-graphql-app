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

// query execution

const executeQuery = async () => {
  const mutation = `
  mutation {
    insertCar(brand: "Nissan", color:"black", doors: 4, type: SUV) {
      brand
      id
    }
  }`;
  const resultOne = await graphql(schema, mutation, resolvers());
  
  const mutationWithVars = `
  mutation insertCar($brand: String!, $color: String!, $doors: Int!, $type: CarTypes!){
    insertCar(brand: $brand, color: $color, doors: $doors, type: $type){
      brand
      color
    }
  }`;
  const resultTwo = await graphql(schema, mutationWithVars, resolvers(), null, {
    brand: 'Nissan',
    color: 'black',
    doors: 4,
    type: 'SUV'
  });
  console.log(resultOne.data, resultTwo.data)  ;
};

executeQuery();
