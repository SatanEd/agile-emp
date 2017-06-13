import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.index.onCreated( function() {
  // Session.set('currentPage', 'roomsList');
});

Template.index.helpers({
  page: function() {
    // return Session.get('currentPage');
  },
  pageData: function() {
    var page = Session.get('currentPage');

    // return page;
  }
});
