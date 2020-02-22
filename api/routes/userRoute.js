const express = require('express');
const router = express.Router();
const exspressJoi = require('express-joi-validator');
const usersSchema = require('../validators/usersValidator');
const userController = require('../controllers/userController');

router.get(
  '/api/users',
  userController.getUsers
);

router.post(
  '/api/user',
  exspressJoi(usersSchema),
  userController.addUser
);

router.put(
  '/api/user/:id',
  exspressJoi(usersSchema),
  userController.editUser
);

router.delete(
  '/api/user/:id',
  exspressJoi(usersSchema.params),
  userController.deleteUser
)

module.exports = router;