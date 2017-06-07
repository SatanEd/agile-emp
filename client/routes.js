import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import Rooms from '../imports/api/rooms/rooms';

FlowRouter.route('/rooms', {
  name: 'Rooms',
  action(params, queryParams) {
    console.log("Looking at a list?");
  }
});

FlowRouter.route('/room/:id', {
  name: 'Room',
  action(params, queryParams) {
    import './room.html';

    let roomId = typeof(params.id) === 'number' ? params.id : 1;

    Template.room.helpers({
      roomId: roomId,

      tables() {
        let room = Rooms.findOne({roomId: eval(roomId)});

        if (room) {
          return room.tables;
        } else {
          return;
        }
      }
    });
  }
});
