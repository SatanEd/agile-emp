import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import Rooms from '../imports/api/rooms/rooms';
import { Session } from 'meteor/session'

Template.room.events({
  'click .table__itm'(e) {
    $(e.target).addClass('popup');
  },
  'click li'(e, i) {
    // console.log(i.data.id);
  },
  'click .room_info__remove'(e, i) {
    Session.set('roomRmvId', i.data.id);

    $('.room_remove__wrapper').eq(0).addClass('active');
  }
});

Template.body.events({
  'click *'(e) {
    if (!$(e.target).hasClass('popup')) {
      $('.popup').removeClass('popup');
    }
  },
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
    $form = $(e.target).parents('.form__wrapper').eq(0);
    $form.addClass('hide');
    $form[0].reset();
  },
  'click #addNewRoom'() {
    $form = $('.form__wrapper').eq(0);

    if ($form.hasClass('hide')) {
      $form.removeClass('hide');
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
          @TODO popup answer
           */
          console.log(err);
          return;
        }

        console.log(res);
      });
    }
  }
});

Template.roomsList.helpers({
  rooms() {
    let rooms = Rooms.find({}, {$sort: {id: 1}}).fetch();
    console.log(rooms);
    return rooms;
  },
  roomRmvId() {
    return Session.get('roomRmvId');
  }
});
