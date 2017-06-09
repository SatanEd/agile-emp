import { Mongo } from 'meteor/mongo';

let Rooms = new Mongo.Collection('rooms');

Rooms.schema = new SimpleSchema({
  id: {type: Number, optional: true},
  name: {type: String, defaultValue: `Room ${this.id}`},
  rows: {type: Number, defaultValue: 8},
  cols: {type: Number, defaultValue: 8},
  length: {type: Number, defaultValue: 31},
  map: {type: [Number]},
});

if (Meteor.isServer) {
  Rooms._ensureIndex('id', {unique: 1, sparse: 1});
  Rooms._ensureIndex('name', {unique: 1, sparse: 1});
}

export default Rooms;
