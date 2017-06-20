import {Meteor} from 'meteor/meteor';
import Rooms from '../imports/api/rooms/rooms';
import Tables from '../imports/api/rooms/tables';
import Emp from '../imports/api/rooms/employers';

Meteor.startup(() => {
  /*
  @TODO create method 'insert-table'
   */
  // let newDoc = {
  //   firstname: "Edward",
  //   lastname: "Rembrant",
  //   email: "fd@gmail.com",
  //   role: "Frontend",
  //   birth: new Date(),
  //   status: "active"
  // };
  //
  // try {
  //   Emp.schema.validate(newDoc);
  //   Emp.insert(newDoc);
  // } catch (e) {
  //   console.log(e.message);
  // }
});

Meteor.methods({
  'new_room': (formData) => {
    let done = {code: 200, message: "Collection successfully added."};
    let cnt = Rooms.find({}).count();

    let oficeMap = (r, c) => {
      let result = new Array(64),
        map = Object.keys(formData.room.map);
      result = result.fill(0);

      for (let i = 0; i < map.length; i++) {
        result[map[i]] = 1;
      }

      return result
    };

    let document = {
      id: (cnt === 0 ? 1 : cnt + 1),
      name: formData.room.title || "",
      rows: 8,
      cols: 8,
      length: formData.room.length || 31,
      map: oficeMap(this.rows, this.cols)
    };

    try {
      Rooms.schema.validate(document);
      Rooms.insert(document);
    } catch (e) {
      done = {code: 500, message: e.code};
      throw new Error(e.message);
    }

    return done;
  },
  'remove-room': (id) => {
    try {
      Rooms.remove({id: eval(id)});
    } catch (e) {
      throw new Error(e.message);
    }

    return "Successfully removed";
  },
  'insert-table': (formData, $this) => {
    let newDoc = {
      roomId: parseInt($this.roomId),
      id: parseInt($this.roomId) + '-' + $this.id,
      position: parseInt($this.position),
      name: formData.table.name,
      role: formData.table.role,
      status: 'active'
    };

    try {
      Tables.schema.validate(newDoc);
      Tables.insert(newDoc);
    } catch (e) {
      throw new Error(e.message);
    }

    return "New table successfully added.";
  },
  'update-table': (formData, $this) => {
    let newDoc = {
      roomId: parseInt(formData.table.roomId || $this.roomId),
      id: $this.roomId + '-' + $this.id,
      position: parseInt(formData.table.position || $this.position),
      name: formData.table.name || $this.name,
      role: formData.table.role || $this.role,
      status: 'active'
    };

    console.log(newDoc);

    try {
      Tables.schema.validate(newDoc);
      Tables.update({
        roomId: parseInt($this.roomId),
        id: newDoc.id
      }, newDoc);
    } catch (e) {
      return e.message;
    }

    return "Table information was changed.";
  },
  'emp-search': (req) => {
    let res = Emp.find({
      $text: {
        $search: req ,
        $caseSensitive: false
      }
    }).fetch();

    if (res) {
      return res;
    }
  }
});
