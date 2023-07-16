require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/phonebook");

app.use(cors());

app.use(express.static("build"));
app.use(express.json());

app.use(
  morgan(function (tokens, req, res) {
    if (req.method === "POST") {
      const body = JSON.stringify(req.body);
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
        body,
      ].join(" ");
    }
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

// const generateId = () => {
//   return Math.floor(Math.random() * 100000000000);
// };

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((notes) => {
    response.json(notes);
  });
});

// app.get("/info", (request, response) => {
//   const length = persons.length;
//   const date = new Date();
//   response.send(
//     `
//     <p>Phonebook has info for ${length}
//     people</p> <p>${date}</p>
//     `
//   );
// });

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((person) => person.id !== id);
//   response.status(204).end();
// });

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === "" || body.number === "") {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

// app.put("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const body = request.body;
//   const newPersons = persons.map((number) =>
//     number.id !== id ? number : body
//   );
//   persons = newPersons;
//   response.json(body);
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
