const server = require("./src/server");
const { conn } = require("./src/db.js");
const loadApiDataToDB = require("./src/controllers/DBController");
const PORT = 3001;

conn
  .sync({ force: true })
  .then(() => {
    loadApiDataToDB();
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
