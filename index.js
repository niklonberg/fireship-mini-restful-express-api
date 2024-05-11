const express = require("express");
const app = express();
const PORT = 8080;

// express does not parse JSON in req.body by default,
// we can setup middleware that tells express to parse json before data
// hits the function we are using to handle a request. See below
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.get("/tshirt", (req, res) => {
  // a route for get requests to http://localhost:8080/tshirt
  res.status(200).send({
    tshirt: "👕",
    size: "large",
  });
  // we can se status and use .send to send data. If we send a javascript object,
  // it will convert that data into json for us by default, no need to JSON.stringify it
});

//:id <-- this is called a dynamic url parameter
app.post("/tshirt/:id", (req, res) => {
  // a route for post requests, user wants to create new data on the server
  const { id } = req.params; // we get hold of the dynamic id from the req.params object
  const { logo } = req.body; // we can get hold of the data being sent from req.body

  // below early return in case of failure of some sort
  if (!logo) res.status(418).send({ message: "Logo is required" });

  res.send({
    tshirt: `👕 with your ${logo} and ID of ${id}`,
  });
});
