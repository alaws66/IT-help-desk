import connect from '@/utils/connect';
import Users from '@/models/user';

const user = async (req, res) => {
  try {
    // connect to database
    await connect();

    // find user who is logged in
    const user = await Users.findOne(
      {
        loggedIn: true
      }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default user;