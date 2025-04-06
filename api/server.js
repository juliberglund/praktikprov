import express from "express";
import axios from "axios";
import db from "./db.js";
const app = express();
const port = 3004;

// Fetch user data from RandomUser API and store in database
app.get("/fetchProfiles", async (req, res) => {
  try {
    const response = await axios.get("https://randomuser.me/api/?results=50");
    const users = response.data.results;

    // Insert profiles into database
    users.forEach((user) => {
      const { first, last } = user.name;
      const email = user.email;
      const gender = user.gender;
      const picture = user.picture.medium;

      const query =
        "INSERT INTO profiles (first_name, last_name, email, gender, picture) VALUES (?, ?, ?, ?, ?)";
      db.query(query, [first, last, email, gender, picture], (err, result) => {
        if (err) throw err;
      });
    });

    res.send("Profiles fetched and saved!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching profiles");
  }
});

// Get profiles from the database
app.get("/profiles", (req, res) => {
  const query = "SELECT * FROM profiles";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching profiles from the database");
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
