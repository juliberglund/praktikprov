import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "user_profiles",
  port: 8889,
});

db.connect((err) => {
  if (err) {
    console.error("Could not connect to the database:", err);
    process.exit();
  } else {
    console.log("Connected to the database!");
  }
});

export default db;
