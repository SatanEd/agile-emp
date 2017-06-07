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

    Template.room.helpers({
      roomId: params.id,

      tables() {
        let room = Rooms.findOne({roomId: eval(params.id)});

        if (room) {
          return room.tables;
        } else {
          return;
        }
      }
    });
  }
});
