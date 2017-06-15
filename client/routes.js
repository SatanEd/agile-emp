import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import Rooms from '../imports/api/rooms/rooms';
import Tables from '../imports/api/rooms/tables.js';

import './index.html';

FlowRouter.route('/room/:id', {
  name: 'Room',
  action(params, queryParams) {
    BlazeLayout.render("tables", {
      page: 'tables',
      roomId: params.id
    });
  }
});

FlowRouter.route('/rooms', {
  name: 'Tables',
  action(params, queryParams) {
    BlazeLayout.render("roomsList", {
      page: 'roomsList',
    });
  }
});

FlowRouter.route('/emplist', {
  name: 'Employers list',
  action(params, queryParams) {
    BlazeLayout.render("tables", {
      page: 'tables',
      roomId: 1
    });
  }
});
