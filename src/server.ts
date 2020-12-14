import express from 'express';

const app = express();
const PORT = 3333;

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello Typescript!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
