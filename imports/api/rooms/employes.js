import { Mongo } from 'meteor/mongo';

let Emp = new Mongo.Collection('employes');

Emp.schema = new SimpleSchema({
  id: {type: Number},
  firstname: {type: String},
  lastname: {type: String},
  email: {type: String},
  role: {type: String},
  birth: {type: Date, optional: true},
  group: {type: Number, optional: true},
  status: {type: String}
});

if (Meteor.isServer) {
  Emp._ensureIndex('email', {unique: 1, sparse: 1});
  Emp._ensureIndex('email', {unique: 1, sparse: 1});
}

export default Emp;
