<template>
  <div class="container">
    <div class="col-lg-12">
      <h3 class="text-secondary">List of Users</h3>
    </div>
    <div class="row mt-3">
      <div class="col-lg-9 col-sm-9">
        <div class="message-pop-up alert" v-bind:class="{'alert-success': isSuccess, 'alert-danger': isError}" v-if="message">
          <button
            type="button"
            class="close"
            v-on:click="message = false"
          >
            <i class="fa fa-times"></i>
          </button>
          {{ message }}
        </div>
      </div>
      <div class="col-lg-3 col-sm-3">
        <button
          class="btn btn-secondary float-right"
          v-on:click="showModalWindow('add')"
        >
          <i class="icon-add-user fa fa-user fa-lg"></i>
          Add New User
        </button>
      </div>
    </div>
    <hr>

    <div class="row">
      <div class="col-lg-12">
        <table class="table table-bordered table-striped">
          <thead>
            <tr class="text-center bg-secondary text-light">
              <th class="table-user-name">Name</th>
              <th class="table-user-gender">Gender</th>
              <th class="table-user-age">Age</th>
              <th class="table-user-country">Country</th>
              <th class="table-user-free"></th>
              <th class="table-user-free"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="(currentUser, index) in users" v-bind:key="currentUser.id">
              <td class="table-user-name-date">{{ currentUser.name }}</td>
              <td>{{ currentUser.gender }}</td>
              <td>{{ currentUser.age }}</td>
              <td>{{ currentUser.country }}</td>
              <td>
                <a href="#" class="text-success">
                  <i class="fa fa-user-edit"
                    v-on:click="showModalWindow('edit', currentUser, index)">
                  </i
                ></a>
              </td>
              <td>
                <a href="#" class="text-danger">
                  <i class="fa fa-trash-o"
                    v-on:click="showModalWindow('delete', currentUser, index)">
                  </i
                ></a>
              </td>
            </tr>
            <tr class="text-center" v-if="listIsEmpty">
              <td colspan="6">{{ listIsEmpty }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="modal" v-if="showAddEditModalWindow">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-secondary text-light">
            <h5 class="modal-title">{{ currentModalWindow.title }}</h5>
            <button
              type="button"
              class="close"
              v-on:click="showAddEditModalWindow=false"
            >
              <i class="fa fa-times"></i>
            </button>
          </div>
          <div class="modal-body p-4">
            <form v-on:submit="currentModalWindow.onSubmit()" novalidate>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name*"
                  v-model.trim="currentUser.name"
                  @blur="$v.currentUser.name.$touch()"
                />
                <div class="modal-pop-up" v-if="$v.currentUser.name.$error">
                  Insert name between 0 and 100 symbol
                </div>
              </div>
              <div class="form-group">
                <select class="form-control" v-model="currentUser.gender" @blur="$v.currentUser.gender.$touch()">
                  <option value="" disabled hidden>Gender*</option>
                  <option value="He">He</option>
                  <option value="She">She</option>
                </select>
                <div class="modal-pop-up" v-if="$v.currentUser.gender.$error">
                  Choose your gender
                </div>
              </div>
              <div class="form-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Age*"
                  v-model="currentUser.age"
                  @blur="$v.currentUser.age.$touch()"
                />
                <div class="modal-pop-up" v-if="$v.currentUser.age.$error">
                  Insert age between 0 - 150
                </div>
              </div>
              <div class="form-group">
                <select class="form-control" v-model="currentUser.country">
                  <option value="" disabled hidden>Country</option>
                  <option value="—">— — — No country — — —</option>
                  <option v-for="country in countries" v-bind:key="country">{{ country }}</option>
                </select>
              </div>
              <div class="form-group">
                <button class="btn btn-secondary btn-block" :disabled="$v.$invalid">{{ currentModalWindow.button }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div id="modal" v-if="showDeleteModalWindow">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-secondary text-light">
            <h5 class="modal-title">Delete User</h5>
            <button
              type="button"
              class="close"
              v-on:click="showDeleteModalWindow = false"
            >
              <i class="fa fa-times"></i>
            </button>
          </div>
          <div class="modal-body p-4">
            <h4>Are you sure want to delete this user?</h4>
            <hr>
            <button
              class="btn bg-secondary m-3 w-25"
              v-on:click="showDeleteModalWindow = false, deleteUser()"
            >
              Yes
            </button>
            <button
              class="btn bg-secondary m-3 w-25"
              v-on:click="showDeleteModalWindow = false"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./ListOfUsers.js"></script>
<style src="./ListOfUsers.css"></style>