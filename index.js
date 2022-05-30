const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const contacts = require("./data/contacts");
const listOfMeetings = require("./data/meetings");

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

const port = 3030;

app.get("/", (req, res) => {
  console.log("got request");
  res.send("hey what's your name?!");
});

app.get("/contacts", (req, res) => {
  res.json({ contacts: contacts });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

app.get("/contacts/:id", (req, res) => {
  console.log("params", req.params);
  console.log("id", req.params.id);
  const contact = contacts.find((item) => item.id === +req.params.id);
  res.json({ contact: contact });
});

app.get("/contacts/:id/meetings", (req, res) => {
  const meetings = listOfMeetings.filter(
    (meeting) => meeting.contactId === req.params.id
  );
  res.json({ meetings });
});

app.post("/contacts", (req, res) => {
  const contactData = { ...req.body, id: contacts.length + 1 };
  contacts.push(contactData);
  res.json({ contact: contactData });
});

app.put("/contacts/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === +req.params.id);

  contact.firstName = req.body.firstName;
  contact.lastName = req.body.lastName;
  contact.street = req.body.street;
  contact.city = req.body.city;
  contact.type = req.body.type;
  contact.email = req.body.email;
  contact.linkedin = req.body.linkedin;
  contact.twitter = req.body.twitter;

  res.json({ contact: contact });
});

app.delete("/contacts/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === +req.params.id);
  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);
  res.json();
});
