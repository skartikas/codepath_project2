const pool = require("./config/database");
require("dotenv").config({ path: "./.env" });

// const query = "DELETE FROM companies";
// pool.query(query, (err, res) => {
//   if (err) {
//     throw err;
//   }

//   console.log(res);
// });

const fs = require("fs");
fs.readFile("./data.json", "utf8", (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  const companies = JSON.parse(data);

  companies.forEach((company) => {
    const query = {
      text: `INSERT INTO companies (id, company	, revenue	,headquarters,ceo	,founded,	founders,	logo	,products	,marketcap	,employees	,keyhighlights) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    };

    // const values = [...Object.values(company)];
    const values = [];
    Object.entries(company).forEach(([key, val]) => {
      if (key == "Founders" || key == "Products") {
        values.push(JSON.stringify(val));
      } else {
        values.push(val);
      }
    });

    console.log(values);

    pool.query(query, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting companies", err);
        return;
      }

      console.log(`✅ ${company.Company} added successfully`);
    });
  });
});
