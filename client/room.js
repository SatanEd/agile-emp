import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import Rooms from '../imports/api/rooms/rooms';
import {Session} from 'meteor/session'

Template.registerHelper('equals', function (a, b) {
  return a === b;
});

Template.tables.events({
  'click .table__itm'(e, i) {
    if ($(e.target).hasClass('table__itm') && !$(e.target).hasClass('none')) {
      $('.popup').removeClass('popup');

      $(e.target).addClass('popup');
    }
  },
  'click li'(e, i) {
    /*
     @TODO room info
     */
  },
  'click .room_info__remove'(e, i) {
    Session.set('roomRmvId', i.data.id);

    $('.room_remove__wrapper').eq(0).addClass('active');
  }
});

Template.roomsList.onCreated(() => {
  Session.setDefault('roomRmvId', 0);
});

Template.roomsList.events({
  'submit #newRoom'(e) {
    e.preventDefault();

    $this = $(e.target);

    Meteor.call('new_room', $(e.target).serializeJSON(), function (err, i) {
      if (err) {
        console.error(err);

        $this.addClass('form-message').find('.form__answer').eq(0).addClass('form__answer-error active');
      }

      $this.addClass('form-message').find('.form__answer').eq(0).addClass('active');
      console.log(i);
    });
  },
  'click .form__close'(e) {
    $inputs = $(e.target).parents('.form__wrapper').eq(0);
    $inputs.addClass('hide');
    $inputs.find('form')[0].reset();
  },
  'click #addNewRoom'() {
    $inputs = $('.form__wrapper').eq(0);

    if ($inputs.hasClass('hide')) {
      $inputs.removeClass('hide');
    }
  },
  'click .room_remove_btn'(e) {
    $this = $(e.target);

    if ($this.hasClass('cancel')) {
      $this.parents('.room_remove__wrapper').removeClass('active');
    } else if ($this.hasClass('remove')) {
      Meteor.call('remove-room', Session.get('roomRmvId'), (err, res) => {
        if (err) {
          /*
           @TODO error popup
           */
          return;
        }

        $this.parents('.room_remove__wrapper').removeClass('active');
        console.log(res);
      });
    }
  }
});

Template.roomsList.helpers({
  rooms() {
    let rooms = Rooms.find({}, {$sort: {id: 1}}).fetch();
    // console.log(rooms);
    return rooms;
  },
  roomRmvId() {
    return Session.get('roomRmvId');
  }
});

Template.table.events({
  'submit .new_table'(e) {
    e.preventDefault();

    Meteor.call('insert-table', $(e.target).serializeJSON(), function (err, res) {
      if (err) {
        console.error(err.message);
      }

      console.log(res);
    });
  },
  'click .table__btn_edit'(e) {
    e.preventDefault();
    $this = $(e.target).is('button') ? $(e.target) : $(e.target).parent(),
      $form = $this.parents('form'),
      $inputs = $form.find('.table__popup_form').eq(0);

    if (!$inputs.hasClass('active')) {
      $inputs.addClass('active');
      $this.parents('form').find('.table__popup_info').eq(0).addClass('hide');
      $this.parents('form').find('.table__btn_cancel').eq(0).addClass('active');
    } else {
      Meteor.call('update-table', $form.serializeJSON(), function (err, res) {
        if (err) {
          console.error(err.message);
        }

        console.log(res);
      });
    }
  },
  'click .table__btn_cancel'(e) {
    e.preventDefault();
    $this = $(e.target).is('button') ? $(e.target) : $(e.target).parent();

    $this.parents('form').find('.table__popup_form').eq(0).removeClass('active');
    $this.parents('form').find('.table__popup_info').eq(0).removeClass('hide');
    $this.removeClass('active');
  }
});
