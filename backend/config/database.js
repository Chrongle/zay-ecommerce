module.exports = {
  username: process.env.DB_USERNAME || "user",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "zay",
  host: process.env.DB_HOSTNAME || "localhost",
  //host: 'db',
  dialect: "mysql"
}
