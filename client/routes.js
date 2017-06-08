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
      id: roomId,

      tables() {
        let room = Rooms.findOne({id: eval(roomId)});

        if (room) {
          let roomMap = room.map;
          let tablesPosition = getTablePosition(roomMap);

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

function getTablePosition(map) {
  let result = [];

  map.filter(function(itm, indx) {
    if (itm === 1) {
      result.push(indx);

      return;
    }
  });

  return result;
}
