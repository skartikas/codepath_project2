const express = require("express");
const app = express();
const port = 3000;
const pool = require("./config/database");
const fs = require("fs");
require("dotenv").config({ path: "./.env" });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/company/:id", (req, res) => {
  res.sendFile(__dirname + "/company.html");
});
app.get("/api/info/:id", (req, res) => {
  const query = "SELECT * FROM companies";

  pool.query(query, (err, data) => {
    if (err) {
      console.log(error);
      res.status(500).send({ error: "Cannot read data file" });
      return;
    }
    const companies = data.rows;
    if (req.params.id <= companies.length) {
      res.status(200).send(companies[req.params.id]);
    } else {
      console.log("invalid id");
      res.status(404).send({ status: 404 });
    }
  });
});

app.get("/api/all", (req, res) => {
  const query = "SELECT * FROM companies";

  pool.query(query, (err, data) => {
    if (err) {
      console.log(error);
      res.status(500).send({ error: "Cannot read data file" });
      return;
    }
    const companies = data.rows;
    res.status(200).send(companies);
  });
});

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/404.html");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
