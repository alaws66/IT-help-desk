import connect from '@/utils/connect';
import Users from '@/models/user';
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(500).json({ error: 'Invalid username or password' });

    // connect to database
    await connect();

    // check username exists in users
    const user = await Users.findOne(
      {
        username: username
      }
    ).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      await Users.findOneAndUpdate(
        {
          username: user.username,
          password: user.password
        },
        { loggedIn: true }
      );

      res.status(200).json({ message: 'User logged in' });
    } else {
      return res.status(500).json({ error: 'Invalid password' });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default login;