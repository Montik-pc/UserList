const ids = require('short-id');
const fs = require('file-system');
const { promisify } = require('util');
const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

class UserRepository {
  constructor() {
    this.dbPath = 'db/db.json';
  }

  async getUsers() {
    const data = await readFilePromise(this.dbPath, 'utf8');

    return JSON.parse(data);
  }

  async addUser(dataUser) {
    const data = await this.getUsers();

    dataUser.id = ids.generate();
    data.push(dataUser);
    await writeFilePromise(this.dbPath, JSON.stringify(data));

    return dataUser;
  }

  async editUser(id, dataUser) {
    const data = await this.getUsers();
    const index = data.findIndex(user => (user.id === id));

    data[index] = dataUser;
    await writeFilePromise(this.dbPath, JSON.stringify(data));

    return dataUser;
  }

  async deleteUser(id) {
    let data = await this.getUsers();

    data = data.filter(user => !(user.id === id));
    await writeFilePromise(this.dbPath, JSON.stringify(data));
  }
}

module.exports = new UserRepository();