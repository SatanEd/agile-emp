import Tables from '../imports/api/rooms/tables.js';
import Rooms from '../imports/api/rooms/rooms';

Template.tables.helpers({
  tables() {
    let tables = Tables.findOne({id: eval(Session.get('roomId'))});

    if (tables) {
        return [].concat(tables);
    } else {
      return false;
    }
  },
  rows() {
    // let room = Rooms.findOne({id: eval(this.roomId())});

    if (true) {
      return [1,1,1,1];
    }
  },
});
