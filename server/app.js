const express = require("express");
const sequelize = require("./config/database");
const formRoutes = require("./routes/formRoutes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", formRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("Unable to connect to the database:", err));
