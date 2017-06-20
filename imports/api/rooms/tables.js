import { Mongo } from 'meteor/mongo';

let Tables = new Mongo.Collection('tables');

Tables.schema = new SimpleSchema({
  roomId: {type: Number},
  position: {type: Number},
  id: {type: String, defaultValue: this.roomId + '-' + eval(Tables.find({}).count()+1)},
  name: {type: String},
  email: {type: String, optional: true},
  role: {type: String},
  age: {type: Number, optional: true},
  status: {type: String}
});

if (Meteor.isServer) {
  Tables._ensureIndex('id', {unique: 1, sparse: 1});
}

export default Tables;
