const express = require('express');
const path = require('path');
const axios = require('axios');
const { clientId, clientSecret } = require('./config');

const app = express();

app.use(express.json());

app.get('/user/signin/callback', async (req, res) => {
  const { query: { code } } = req;

  if (!code) {
    res.json({
      success: false,
      message: 'Error, no code'
    });
  }

  // POST
  try {
    const { data } = await axios.post(`https://github.com/login/oauth/access_token`, null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        code
      },
      headers: {
        'user-agent': 'node.js',
        'Content-Type': 'application/json'
      }
    });

    res.redirect(`https://github-account.herokuapp.com?${data}`);
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// app.get('/user', async (req, res) => {
//   const accessToken = '9d01a654c7f105c337b6782e98b343ac0eaffe1e';

//   try {
//     const { data } = await axios.get('https://api.github.com/user', {
//       headers: {
//         'Authorization': `token ${accessToken}`
//       }
//     });
//     res.send(data);
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send('Server Error');
//   }
// });

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));