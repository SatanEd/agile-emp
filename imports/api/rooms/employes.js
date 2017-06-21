import { Mongo } from 'meteor/mongo';

let Emp = new Mongo.Collection('employes');

Emp.schema = new SimpleSchema({
  firstname: {type: String},
  lastname: {type: String},
  email: {type: String},
  role: {type: String},
  birth: {type: Date, optional: true},
  status: {type: String}
});

if (Meteor.isServer) {
  Emp._ensureIndex({
    firstname: "text",
    lastname: "text",
    role: "text",
  });
  Emp._ensureIndex('email', {unique: 1, sparse: 1});
}

export default Emp;
