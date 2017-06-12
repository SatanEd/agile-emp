import {Meteor} from 'meteor/meteor';
import Rooms from '../imports/api/rooms/rooms';

Meteor.startup(() => {
});

Meteor.methods({
  'new_room': (formData) => {
    let done = {code: 200, message: "Collection successfully added."};
    let cnt = Rooms.find({}).count();

    let oficeMap = (r, c) => {
      let result = new Array(64),
        map = Object.keys(formData.room.map);
      result = result.fill(0);

      for (let i = 0; i <map.length; i++) {
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
      console.log('\x1b[31m%s\x1b[0m', e);
    }

    return done;
  },
  'remove-room': (id) => {
    try {
      Rooms.remove({id: eval(id)});
    } catch (e) {
      return e;
    }

    return "Successfully removed";
  }
});
