import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.room.events({
  'click .table__itm'(e) {
    $(e.target).addClass('popup');
  },
});

Template.body.events({
  'click *'(e) {
    if (!$(e.target).hasClass('popup')) {
      $('.popup').removeClass('popup');
    }
  },
});
