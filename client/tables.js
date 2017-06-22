import Tables from '../imports/api/rooms/tables.js';
import Rooms from '../imports/api/rooms/rooms';
import Emp from '../imports/api/rooms/employes';

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

function extracted(itms, tables) {
  itms[tables[table].position].roomId = Session.get('roomId') || 1;
}

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
        let empOne = Emp.findOne({id: tables[table].userId});

        if (tables[table].id.toString().search('-') !== -1) {
          tables[table].id = tables[table].id.toString().split('-')[1];
        }

        itms[tables[table].position] = tables[table];
        extracted(itms, tables);

        console.log(empOne.status);
        tables[table] = Object.assign(tables[table], {firstname: empOne.firstname, lastname: empOne.lastname, email: empOne.email, role: empOne.role, status: empOne.status});
      }

      if (tables) {
        return itms.separateArray(8);
      } else {
        return false;
      }
    }
  }
});

Template.tables.events({
  'click .table__itm'(e, i) {
    if ($(e.target).hasClass('table__itm') && !$(e.target).hasClass('none')) {
      $('.popup').removeClass('popup');

      $(e.target).addClass('popup');
      console.log(i);
    }
  },
  'click li'(e, i) {
    /*
     @TODO room info
     */
  }
});
