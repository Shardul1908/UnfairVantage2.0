class Users{
  #users;
  constructor(){
    this.#users = [];
  }
  createUser(u) {
    this.#users.push(u);
    return u;
  }
  get allUsers() {
    return this.#users;
  }
  get numberOfUsers() {
    return this.#users.length;
  }
}

export default Users;