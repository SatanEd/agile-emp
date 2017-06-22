import {Meteor} from 'meteor/meteor';
import Rooms from '../imports/api/rooms/rooms';
import Tables from '../imports/api/rooms/tables';
import Emp from '../imports/api/rooms/employes';
import Groups from '../imports/api/rooms/groups';

Meteor.startup(() => {
  // let newDoc = {
  //   id: Emp.find({}).count() + 1,
  //   firstname: "Eduard",
  //   lastname: "Iliasenco",
  //   email: "eduard@agilepartners.eu",
  //   role: "Frontend",
  //   birth: new Date('3/Mar/1989'),
  //   status: "active"
  // };
  //
  // try {
  //   Emp.schema.validate(newDoc);
  //   Emp.insert(newDoc);
  // } catch (e) {
  //   console.log(e.message);
  // }

  // let newDoc = {
  //   name: "Backend",
  //   id: eval(Groups.find({}).count() + 1)
  // };
  //
  // Groups.insert(newDoc);
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
    let user = Emp.findOne({email: formData.table.name});

    let newDoc = {
      roomId: parseInt($this.roomId),
      id: parseInt($this.roomId) + '-' + $this.id,
      position: parseInt($this.position),
      userId: user.id
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
    try {
      /*
      @TODO add validateOne
       */
      Tables.update({
        id: ($this.roomId + '-' + $this.id)
      }, {$set: {roomId: parseInt(formData.table.roomId), id: parseInt(formData.table.roomId) + '-' + $this.id}});
    } catch (e) {
      return e.message;
    }

    return "Table information was changed.";
  },
  'insert-employe': (formData) => {
    let newDoc = {
      firstname: formData.employe.firstname ,
      lastname: $this.roomId + '-' + $this.id,
      email: parseInt(formData.employe.position || $this.position),
      role: formData.employe.name || $this.name,
      birth: formData.employe.role || $this.role,
      group: formData.employe.group,
      status: 'active'
    };

    if (formData) {
    }
  }
});
