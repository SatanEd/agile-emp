import { Mongo } from 'meteor/mongo';

let Rooms = new Mongo.Collection('rooms');

Rooms.schema = new SimpleSchema({
  id: {type: Number},
  name: {type: String, defaultValue: `Room ${this.id}`},
  rows: {type: Number},
  cols: {type: Number},
  length: {type: Number, defaultValue: 0},
  map: {type: [Number]},
  tables: {
    type: [Object],
    optional: true
  },
  "tables.$.position": {type: Object},
  "tables.$.position.x": {type: Number},
  "tables.$.position.y": {type: Number},
  "tables.$.id": {type: Number},
  "tables.$.name": {type: String},
  "tables.$.role": {type: String},
  "tables.$.age": {type: Number, optional: true},
  "tables.$.status": {type: String}
});

if (Meteor.isServer) {
  Rooms._ensureIndex('id', {unique: 1, sparse: 1});
}

export default Rooms;
