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

    if (room) {
      let itms = room.map,
        tableCnt = 1;

      itms.forEach(function (itm, i) {
        if (itm === 1) {
          itms[i] = {roomId: Session.get('roomId') || 1, id: tableCnt, status: "free", position: i};

          tableCnt++;
        } else if (itm === 0) {
          itms[i] = {status: "none"};
        }
      });

      for (table in tables) {
        itms[tables[table].position] = tables[table];
        itms[tables[table].position].roomId = Session.get('roomId') || 1;
      }

      if (tables) {
        return itms.separateArray(8);
      } else {
        return false;
      }
    }
  }
});
