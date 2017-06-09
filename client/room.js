import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import Rooms from '../imports/api/rooms/rooms';

Template.room.events({
  'click .table__itm'(e) {
    $(e.target).addClass('popup');
  },
});

Template.body.events({
  'click *'(e) {
    if (!$(e.target).hasClass('popup')) {
      $('.popup').removeClass('popup');
    }
  },
});

Template.roomsList.events({
  'submit #newRoom'(e) {
    e.preventDefault();

    Meteor.call('new_room', $(e.target).serializeJSON(), function (err, i) {
      if (err) {
        console.error(err);
      }

      console.log(i);
    });
  }
});

Template.roomsList.helpers({
  rooms() {
    let rooms = Rooms.find({}, {$sort: {id: 1}}).fetch();
    console.log(rooms);
    return rooms;
  }
});
