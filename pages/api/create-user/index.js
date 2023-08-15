import connect from '@/utils/connect';
import Users from '@/models/user';
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      password
    } = req.body;

    if (!(firstName && lastName)) return res.status(500).json({ error: 'Require full name' });
    if (!(username && password)) return res.status(500).json({ error: 'Invalid username or password' });

    // bcrypt password
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    // check decryption successful
    if (!encryptedPassword) return res.status(500).json({ error: 'Invalid password' });

    // connect to database
    await connect();

    // create new user
    await Users.create({
      firstName,
      lastName,
      username,
      password: encryptedPassword,
      loggedIn: false
    });

    res.status(200).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default createUser;