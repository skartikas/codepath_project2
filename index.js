const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/company/:id", (req, res) => {
  res.sendFile(__dirname + "/company.html");
});
app.get("/api/info/:id", (req, res) => {
  fs.readFile("./data.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      res.status(500).send({ error: "Cannot read data file" });
      return;
    }
    const companies = JSON.parse(data);

    if (req.params.id <= companies.length) {
      res.status(200).send(companies[req.params.id]);
    } else {
      console.log("invalid id");
      res.status(404).send({ status: 404 });
    }
  });
});

app.get("/api/all", (req, res) => {
  fs.readFile("./data.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      res.status(500).send({ error: "Cannot read data file" });
      return;
    }
    const companies = JSON.parse(data);

    res.status(200).send(companies);
  });
});

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/404.html");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
