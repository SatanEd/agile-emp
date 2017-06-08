import {Meteor} from 'meteor/meteor';
import Rooms from '../imports/api/rooms/rooms';

Meteor.startup(() => {
  let i = Rooms.find({}).count();
  let room = Rooms.find({id: 1}),
    newId = room.tables ? room.tables.length : 1;

  if (i === 0) {
    let document = {
      id: eval(i === 0 ? 1 : i),
      name: "1",
      rows: 8,
      cols: 8,
      length: 31,
      map: [
        0, 0, 0, 1, 1, 1, 1, 1,
        0, 0, 0, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1,
        0, 0, 0, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1,
        1, 0, 0, 1, 1, 1, 1, 1
      ],
      tables: [{
        position: {
          x: 3,
          y: 1
        },
        id: eval(newId),
        name: 'Ed',
        role: 'Frontend',
        age: 28,
        status: 'active'
      }]
    };

    try {
      Rooms.schema.validate(document);
      Rooms.insert(document);
    } catch (e) {
      console.log(e);
    }
  }
});
