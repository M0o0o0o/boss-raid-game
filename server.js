const app = require("./app");

app.listen(app.get("port"), "0.0.0.0", () => {
  console.log(app.get("port"));
  console.log(`Server is running on port ${app.get("port")}.`);
});
