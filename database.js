const {Client} = require('pg');
const { use } = require('./routes/tasksRoutes');

// CREATE CLIENT
module.exports.createClient = async function () {
  const client = new Client({
      user: 'postgres',
      password: 'admin',
      host: 'localhost',
      port: 5432,
      database: 'todolist_nodejs',
    });
  return client;
};

// USERS

// CREATE USERS TABLE
module.exports.createUsersTable = async function (client) {
  try {
    const response = await client.query("CREATE TABLE users ( \
      id SERIAL NOT NULL, \
      mail varchar(255) NOT NULL, \
      password varchar(255) NOT NULL, \
      created_at DATE DEFAULT CURRENT_DATE \
      );"
    );
    return response;
  }catch(err){
    return err;
  }finally {
    client.end();
  }
};

// CREATE USER
module.exports.createUser = async function (mail,password,client) {
  try {
    const response = await client.query("INSERT INTO users (mail,password) \
        VALUES ($1,$2)",[mail,password]
    );
    return response;
  }catch(err){
    return err;
  }finally {
    client.end();
  }
};

// VERIFY USER
module.exports.verifyUser = async function (mail,password,client) {
  try {
    const response = await client.query("SELECT * FROM users WHERE mail=$1 AND password=$2",
    [mail,password]
    );
    if (response.rowCount === 1) {return true}
  }catch(err) {
    return false;
  }finally {
    client.end();
  }
};

// READ USER
module.exports.getAllUsers = async function (client) {
  try {
    const response = await client.query("SELECT * FROM users");
    return response.rows;
  }catch(err) {
    return err;
  }finally{
    client.end();
  }
};

// READ USER PASSWORD
module.exports.getUserHash = async function (mail,client) {
  try {
    const response = await client.query("SELECT password FROM users WHERE mail = $1",
    [mail]
    );
    return response.rows[0].password;
  }catch(err) {
    return err;
  }finally {
    client.end();
  }
};

// UPDATE USER
module.exports.updateUserPassword = async function (mail,newPassword,client) {
  try {
    const response = await client.query(
      "UPDATE users \
      SET password = $1 \
      WHERE mail = $2",
      [newPassword,mail]
    );
    return true;
  }catch(err) {
    return err;
  }finally {
    client.end();
  }
};

// DELETE USER
module.exports.deleteUser = async function (mail,client) {
  try {
    const response = await client.query("DELETE FROM users WHERE mail=$1",[mail]);
    return true;
  }catch(err){
    return err;
  }finally{
    client.end();
  }
};

// GET USER ID
const getUserID = async function (mail) {
  const client = new Client({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    database: 'todolist_nodejs',
  });
  try {
    const response = await client.query("SELECT id FROM users WHERE mail = $1",[mail]);
    return response.rows;
  }catch(err) {
    return err;
  }finally{
    client.end();
  }
};

// TASKS TABLE
module.exports.createTasksTable = async function (client) {
  try {
    const response = await client.query(
    "taskid SERIAL NOT NULL, \
      description varchar(255) NOT NULL, \
      status varchar(255) NOT NULL, \
      created_at DATE DEFAULT CURRENT_DATE, \
      userid INTEGER NOT NULL, \
      PRIMARY KEY(taskid), \
      FOREIGN KEY (userid) REFERENCES users(id)"
    );
    return response;
  }catch(err){
    return err;
  }finally {
    client.end();
  }
};

module.exports.createTask = async function (descritpion,mail,client) {
  const status = "pending";
  let userid;
  try {
    const data = await client.query("SELECT id FROM users WHERE mail = $1",[mail]);
    userid = data.rows[0].id;
  }catch(err) {
    return err;
  }
  try {
    await client.query(" INSERT INTO tasks (description,status,userid) \
     VALUES ($1,$2,$3)",[descritpion,status,userid]);
    return true;
  }catch(err) {
    return false;
  }finally{
    client.end();
  }
};

module.exports.getAllTasks = async function (mail,client) {
  let userid;
  try {
    const data = await client.query("SELECT id FROM users WHERE mail = $1",[mail]);
    userid = data.rows[0].id;
  }catch(err) {
    return err;
  }
  try {
    const response = await client.query("SELECT * FROM tasks WHERE userid =$1",[userid]);
    return response.rows;
  }catch(err){
    return null;
  }finally{
    client.end();
  }
};

module.exports.updateTask = async function (mail,status,id,client) {
  let userid;
  try {
    const data = await client.query("SELECT id FROM users WHERE mail = $1",[mail]);
    userid = data.rows[0].id;
  }catch(err) {
    return err;
  }
  try {
    await client.query("UPDATE tasks SET status = $1 WHERE taskid = $2 AND userid = $3",
      [status,id,userid]
    )
    return true;
  }catch(err) {
    return false;
  }finally{
    client.end();
  }
};

module.exports.deleteTask = async function (mail,id,client) {
  let userid;
  try {
    const data = await client.query("SELECT id FROM users WHERE mail = $1",[mail]);
    userid = data.rows[0].id;
  }catch(err) {
    return err;
  }
  try {
    await client.query("DELETE FROM tasks WHERE taskid = $1 AND userid = $2",[id,userid]);
    return true;
  }catch(Err) {
    return false;
  }finally{
    client.end();
  }
};
