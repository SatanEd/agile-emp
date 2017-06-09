import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import Rooms from '../imports/api/rooms/rooms';

import './index.html';

FlowRouter.route('/room/:id', {
  name: 'Room',
  action(params, queryParams) {
    let roomId = typeof(params.id) === 'number' ? params.id : 1;

    Template.room.helpers({
      id: roomId,

      tables() {
        let room = Rooms.findOne({id: eval(roomId)});

        if (room) {
          let roomMap = room.map;

          if (room.tables.length !== 0) {
            return [].concat(room.tables);
          }
        } else {
          return false;
        }
      }
    });
  }
});

FlowRouter.route('/rooms', {
  name: 'Tables',
  action(params, queryParams) {
  }
});
