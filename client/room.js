import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import Rooms from '../imports/api/rooms/rooms';
import {Session} from 'meteor/session'

Template.registerHelper('equals', function (a, b) {
  return a === b;
});

Template.roomsList.onCreated(() => {
  Session.setDefault('roomRmvId', 0);
  Session.setDefault('answerMessage', '');
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
    $this = $(e.target),
      $wrapper = $this.parents('.room_remove__wrapper'),
      $answer = $wrapper.find('.room_remove__answer').eq(0),
      $inner = $wrapper.find('.room_remove__inner').eq(0);

    if ($this.hasClass('cancel')) {
      $wrapper.removeClass('active');
    } else if ($this.hasClass('remove')) {
      Meteor.call('remove-room', Session.get('roomRmvId'), (err, res) => {
        if (err) {
          Session.set('answerMessage', err);
          return;
        }
        Session.set('answerMessage', res);
        $answer.addClass('active');
        $inner.addClass('hide');

        setTimeout(function () {
          $wrapper.animate({
            opacity: 0
          }, function () {
            $wrapper.removeClass('active').removeAttr('style');

            Session.set('answerMessage', '');
            $answer.removeClass('active');
            $inner.removeClass('hide');
          });
        }, 1000);
      });
    }
  }
});

Template.roomsList.helpers({
  answerMessage() {
    return Session.get('answerMessage');
  },
  rooms() {
    let rooms = Rooms.find({}, {$sort: {id: 1}}).fetch();
    return rooms;
  },
  roomRmvId() {
    return Session.get('roomRmvId');
  }
});

Template.room.events({
  'click .room_info__remove'(e, i) {
    Session.set('roomRmvId', i.data.id);

    $('.room_remove__wrapper').eq(0).addClass('active');
  }
});
