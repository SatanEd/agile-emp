import Tables from '../imports/api/rooms/tables.js';
import Rooms from '../imports/api/rooms/rooms';

Object.defineProperty(Array.prototype, 'separateArray', {
  value: function(chunkSize) {
    var array=this;
    return [].concat.apply([],
      array.map(function(elem,i) {
        return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
      })
    );
  }
});

Template.tables.helpers({
  tables() {
    let tables = Tables.find({roomId: eval(Session.get('roomId') || 1)}).fetch();
    let room = Rooms.findOne({id: eval(Session.get('roomId') || 1)});

    if (tables) {
      console.log(tables);
    }

    if (room) {
      let itms = room.map;

      for (table in tables) {
        itms[tables[table].position] = tables[table];
      }

      console.log(itms);

      if (tables) {
        return [].concat(itms);
      } else {
        return false;
      }
    }
  }
});
