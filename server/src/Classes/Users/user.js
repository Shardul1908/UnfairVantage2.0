class User{
  #id;
  #name;
  #email;
  #email_verified_at;
  #password;
  #remember_token;
  #created_at;
  #updated_at;
  #shopify_grandfathered;
  #shopify_namespace;
  #shopify_freemium;
  #plan_id;
  #deleted_at;
  #password_updated_at;

  constructor(){
    this.#id = null;
    this.#name = null;
    this.#email = null;
    this.#email_verified_at = null;
    this.#password = null;
    this.#remember_token = null;
    this.#created_at = null;
    this.#updated_at = null;
    this.#shopify_grandfathered = null;
    this.#shopify_namespace = null;
    this.#shopify_freemium = null;
    this.#plan_id = null;
    this.#deleted_at = null;
    this.#password_updated_at = null;
  }

  get id(){
    return this.#id;
  }
  set id(id){
    this.#id = id;
  }
  get name(){
    return this.#name;
  }
  set name(name){
    this.#id = name;
  }
  get email(){
    return this.#email;
  }
  set email(email){
    this.#email = email;
  }
  get email_verified_at(){
    return this.#email_verified_at;
  }
  set email_verified_at(email_verified_at){
    this.#email_verified_at = email_verified_at;
  }
  get password(){
    return this.#password;
  }
  set password(password){
    this.#password = password;
  }
  get remember_token(){
    return this.#remember_token;
  }
  set remember_token(remember_token){
    this.#remember_token = remember_token;
  }
  get created_at(){
    return this.#created_at;
  }
  set created_at(created_at){
    this.#created_at = created_at;
  }
  get updated_at(){
    return this.#updated_at;
  }
  set updated_at(updated_at){
    this.#updated_at = updated_at;
  }
  get shopify_grandfathered(){
    return this.#shopify_grandfathered;
  }
  set shopify_grandfathered(shopify_grandfathered){
    this.#shopify_grandfathered = shopify_grandfathered;
  }
  get shopify_namespace(){
    return this.#shopify_namespace;
  }
  set shopify_namespace(shopify_namespace){
    this.#shopify_namespace = shopify_namespace;
  }
  get shopify_freemium(){
    return this.#shopify_freemium;
  }
  set shopify_freemium(shopify_freemium){
    this.#shopify_freemium = shopify_freemium;
  }
  get plan_id(){
    return this.#plan_id;
  }
  set plan_id(plan_id){
    this.#plan_id = plan_id;
  }
  get deleted_at(){
    return this.#deleted_at;
  }
  set deleted_at(deleted_at){
    this.#deleted_at = deleted_at;
  }
  get password_updated_at(){
    return this.#password_updated_at;
  }
  set password_updated_at(password_updated_at){
    this.#password_updated_at = password_updated_at;
  }
}

export default User;