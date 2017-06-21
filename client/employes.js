import Emp from '../imports/api/rooms/employes';

Template.employes.onCreated(function () {
  Session.setDefault('empSearch', '');
});

Template.employes.helpers({
  empList() {
    let req = Session.get('empSearch').toString().trim(),
      result;

    if (req !== '') {
      result = Emp.find({$or: [
          {firstname: {$regex: req, $options: 'im'}},
          {lastname: {$regex: req, $options: 'im'}},
          {role: {$regex: req, $options: 'im'}}
        ]}).fetch() || [];
    } else {
      result = Emp.find({}).fetch();
    }

    return result;
  }
});

Template.employes.events({
  'keyup #emp_serach'(e) {
    Session.set('empSearch', $(e.target).val())
  },
  'click .emp__new_emp'(e) {
    $('.form__wrapper').eq(0).removeClass('hide');
  }
});
