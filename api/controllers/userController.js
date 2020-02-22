const routeUtils = require('../utils/routeUtils');
const userService = require('../services/userService');

function getUsers() {
  return userService.getUsers();
}

function addUser(req) {
  return userService.addUser(req.body);
}

function editUser(req) {
  return userService.editUser(req.params.id, req.body);
}

function deleteUser(req) {
  return userService.deleteUser(req.params.id);
}

module.exports = {
  getUsers: routeUtils.handleResponse(getUsers),
  addUser: routeUtils.handleResponse(addUser),
  editUser: routeUtils.handleResponse(editUser),
  deleteUser: routeUtils.handleResponse(deleteUser)
};