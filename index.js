const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

app.use(express.json());

const uri = 'mongodb+srv://CONQUEST:GREIGHT10@cluster0.xpbrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let db

MongoClient.connect(uri)
  .then((client) => {
    console.log('database connected');
    db = client.db('mydb');
  });

let students = [];


app.post('/todo', (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ msg: 'task is required!!!' });
  }

  db.collection('todo').insertOne({ task: task }, (err, result) => {
    if (err) {
      return res.status(500).json({ msg: 'error while adding task' });
    }
    return res.status(200).json({ msg: 'task added successfully' });
  });
});


app.post('/students', (req, res) => {
  const { id, name, age } = req.body;

  if (!id || !name || !age) {
    return res.status(400).json({ msg: 'all field required!!!' });
  }

  const data = {
    id: id,
    name: name,
    age: age,
  };

  students.push(data);

  return res.status(200).json({ msg: `welcome ${name}` });
});

let port = 3000;

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
