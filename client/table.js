import Rooms from '../imports/api/rooms/rooms';

Template.table.events({
  'submit .new_table'(e) {
    e.preventDefault();

    Meteor.call('insert-table', $(e.target).serializeJSON(), this, function (err, res) {
      if (err)
        console.error(err.message);

      console.log(res);
    });
  },
  'submit .update_table'(e) {
    e.preventDefault();

    $form = $(e.target),
      $this = $form.find('button.active').eq(0),
      $inputs = $form.find('.table__popup_form').eq(0);

    if (!$inputs.hasClass('active')) {
      $inputs.addClass('active');
      $form.find('.table__btn_cancel').eq(0).addClass('active');
      $form.find('.table__popup_info').eq(0).addClass('hide');
    } else {
      Meteor.call('update-table', $form.serializeJSON(), this, function (err, res) {
        if (err)
          console.error(err.message);

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

Template.table.helpers({
  roomsCount() {
    let rooms = Rooms.find(),
      result = [];

    if (rooms) {
      rooms.forEach((itm, i) => {
        result[i] = {id: itm.id};
      });

      return result;
    }
  }
});
