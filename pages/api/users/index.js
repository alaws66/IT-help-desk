import connect from '@/utils/connect';
import Users from '@/models/user';

const users = async (req, res) => {
  try {
    // connect to database
    await connect();

    // find all users
    const users = await Users.find();

    if (!users) {
      return res.status(404).json({ error: 'Users not found' });
    }

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default users;