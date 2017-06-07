import { Meteor } from 'meteor/meteor';
import Rooms from '../imports/api/rooms/rooms';

Meteor.startup(() => {
  if (Rooms.find({}).count() === 0) {
    Rooms.insert({roomId: 1, tables: [{id: 1, status: "free"}, {id: 2, status: "used"}, {id: 3, status: "active"}]})
  }
});
