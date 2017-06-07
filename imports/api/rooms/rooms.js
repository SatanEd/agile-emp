import { Mongo } from 'meteor/mongo';

let Rooms = new Mongo.Collection('rooms');

Rooms.schema = new SimpleSchema({
  id: {type: Number},
  name: {type: String, defaultValue: `Room ${this.id}`},
  tables: {
    type: [Object],
    optional: true
  },
  "tables.$.length": {type: Number, defaultValue: 0},
  "tables.$.map": {type: [Number]},
  "tables.$.position": {type: [Object]},
  "tables.$.position.$.x": {type: Number},
  "tables.$.position.$.y": {type: Number},
  "tables.$.name": {type: String},
  "tables.$.role": {type: String},
  "tables.$.age": {type: Number, optional: true},
  "tables.$.status": {type: String}
});

if (Meteor.isServer) {
  Rooms._ensureIndex('roomId', {unique: 1, sparse: 1});
}

export default Rooms;
