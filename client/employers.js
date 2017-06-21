import Emp from '../imports/api/rooms/employers';

Template.employers.onCreated(function () {
  Session.setDefault('empSearch', '');
});

Template.employers.helpers({
  empList() {
    let req = Session.get('empSearch').toString().trim(),
      result;

    if (req !== '') {
      result = Emp.find({$or: [
          {firstname: {$regex: req, $options: 'im'}},
          {lastname: {$regex: req, $options: 'im'}},
          {role: {$regex: req, $options: 'im'}}
        ]}).fetch() || [];
    }

    return result;
  }
});

Template.employers.events({
  'keyup #emp_serach'(e) {
    Session.set('empSearch', $(e.target).val())
  }
});
