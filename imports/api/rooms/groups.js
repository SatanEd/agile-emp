import { Mongo } from 'meteor/mongo';

let Groups = new Mongo.Collection('groups');

Groups.schema = new SimpleSchema({
  id: {type: Number},
  name: {type: String}
});

if (Meteor.isServer) {
  Groups._ensureIndex('name', {unique: 1, sparse: 1});
  Groups._ensureIndex('id', {unique: 1, sparse: 1});
}

export default Groups;
