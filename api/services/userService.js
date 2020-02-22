const userRepository = require('../repositories/userRepository');

class UserService {
  constructor({userRepository}) {
    this.userRepository = userRepository;
  }

  async getUsers() {
    return this.userRepository.getUsers();
  }

  async addUser(dataUser) {
    return this.userRepository.addUser(dataUser);
  }

  async editUser(id, dataUser) {
    return this.userRepository.editUser(id, dataUser);
  }

  async deleteUser(id) {
    return this.userRepository.deleteUser(id);
  }
}

module.exports = new UserService({userRepository});