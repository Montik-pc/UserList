import { required, minValue, maxValue, maxLength } from 'vuelidate/lib/validators';
import { addModalWindow } from '../const/addModalWindow.js';
import { editModalWindow } from '../const/editModalWindow.js';
import { BASE_URL, Country_URL, getUsers, addUser, editUser, deleteUser } from '../const/urlAddress.js';
import {successType, errorType, errorGet, errorAdd, errorEdit, errorDelete, errorgetAllCountry, emptyList } from '../const/message.js';

export default {
  name: 'ListOfUsers',

  data() {
    return {
      message: ``,
      isSuccess: false,
      isError: false,
      listIsEmpty: ``,
      showAddEditModalWindow: false,
      showDeleteModalWindow: false,
      addModalWindow: addModalWindow,
      editModalWindow: editModalWindow,
      currentModalWindow: {},
      countries: [],
      users: [],
      currentUser: {
        name: ``,
        gender: ``,
        age: ``,
        country: ``
      },
      index: ``
    };
  },

  mounted() {
    this.getUsers();
    this.getAllCountry();
  },

  validations: {
    currentUser: {
      name: {
        required,
        maxLength: maxLength(100)
      },
      gender: {
        required
      },
      age: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(150),
        validFormat: val => /^\d+$/.test(val)
      }
    }
  },

  methods: {
    getUsers() {
      this.$http
      .get(`${BASE_URL}${getUsers}`)
      .then(res => {
        this.checkUsers(res.data);
      })
      .catch(res => {
        this.showMessage(errorType, `${errorGet}Error:${res.status} ${res.statusText}`);
      })
      .catch(res => {
        alert(res);
      })
    },

    addUser() {
      event.preventDefault();
      const userName = this.currentUser.name.slice(0, 50);
      delete this.currentUser.index;
      this.currentUser.country = (this.currentUser.country) ? this.currentUser.country : `—`;
      this.$http
      .post(`${BASE_URL}${addUser}`, this.currentUser)
      .then(res => {
        this.showAddEditModalWindow = false;
        this.users.push(res.data);``
        this.showMessage(successType, `User ${userName} added successfully.`);
        this.listIsEmpty = false;
      })
      .catch(res => {
        this.showAddEditModalWindow = false;
        this.showMessage(errorType, `${errorAdd}Error:${res.status} ${res.statusText}`);
      })
    },

    editUser() {
      event.preventDefault();
      const id = this.currentUser.id;
      const index = this.currentUser.index;
      const userName = this.currentUser.name.slice(0, 50);
      delete this.currentUser.index;
      this.$http
      .put(`${BASE_URL}${editUser}${id}`, this.currentUser)
      .then(res => {
        this.showAddEditModalWindow = false;
        this.users.splice(index, 1, res.data);
        this.showMessage(successType, `User ${userName} added successfully.`);
        this.listIsEmpty = false;
      })
      .catch(res => {
        this.showAddEditModalWindow = false;
        this.showMessage(errorType, `${errorEdit}Error:${res.status} ${res.statusText}`);
      })
    },

    deleteUser() {
      const id = this.currentUser.id;
      const index = this.currentUser.index;
      const userName = this.currentUser.name.slice(0, 50);
      this.$http
      .delete( `${BASE_URL}${deleteUser}${id}`)
      .then(() => {
        this.showDeleteModalWindow = false;
        this.users.splice(index, 1);
        this.showMessage(successType, `User ${userName} successfully deleted.`);
        this.checkUsers(this.users);
      })
      .catch(res => {
        this.showDeleteModalWindow = false;
        this.showMessage(errorType, `${errorDelete}Error:${res.status} ${res.statusText}`);
      })
    },

    getAllCountry() {
      this.$http
      .get(Country_URL)
      .then(function(res) {
        this.countries = res.data.map(country => country.name);
      })
      .catch(function(res) {
        this.showMessage(errorType, `${errorgetAllCountry}Error:${res.status} ${res.statusText}`);
      })
    },

    showModalWindow(typeModalWindow, currentUser, index) {
      this.resetAddEditModalWindow();

      switch(typeModalWindow) {
        case `add`:
          this.currentModalWindow = {...this.addModalWindow};
          this.currentModalWindow.onSubmit = this.addUser;
          this.showAddEditModalWindow = true;
          break;
        case `edit`:
          this.currentModalWindow = {...this.editModalWindow};
          this.currentModalWindow.onSubmit = this.editUser;
          this.setCurrentUser(currentUser, index);
          this.showAddEditModalWindow = true;
          break;
        case `delete`:
          this.setCurrentUser(currentUser, index);
          this.showDeleteModalWindow = true
          break;
      }
    },

    resetAddEditModalWindow() {
      Object.keys(this.currentUser).forEach(dataField => this.currentUser[dataField] = ``);
      this.$v.$reset();
    },

    setCurrentUser(currentUser, index) {
      this.currentUser = {...currentUser};
      this.currentUser.index = index;
    },

    checkUsers(users) {
      if (users.length) {
        this.users = users;
      } else {
        this.listIsEmpty = emptyList;
      }
    },

    showMessage(typeMessage, message) {
      switch (typeMessage) {
      case successType:
        this.isSuccess = true;
        break;
      case errorType:
        this.isError = true;
        break;
      }

      this.message = message;
      setTimeout(() => this.message = false, 3000);
    }
  }
}