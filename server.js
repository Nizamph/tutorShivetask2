const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 4000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('api is running successfully');
});
let globalValue = {};
app.post('/api/submitForm', async (req, res) => {
  try {
    const { value } = req.body;
    console.log('value is here from backend', value);
    if (!value) {
      res.status(401).json({ error: 'please provide values' });
      throw new Error('please provide values');
    }
    globalValue = value;
    if (Object.keys(globalValue).length > 0) {
      res.status(201).json({ formValue: globalValue });
    } else {
      res.status(501).json({ error: 'something went wrong' });
    }
  } catch (err) {
    res.status(501).json({ error: 'internal server error' });
    throw new Error('please provide values');
  }
});
app.get('/api/getForm', async (req, res) => {
  try {
    res.status(201).json({ formValue: globalValue });
  } catch (err) {
    console.log(err);
  }
});
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
