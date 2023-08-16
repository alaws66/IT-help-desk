import connect from '@/utils/connect';
import Users from '@/models/user';
import Requests from '@/models/request';

const user = async (req, res) => {
  try {
    const { id } = req.query;

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

    if (id) {
      await Requests.findByIdAndUpdate(
        id,
        { technician: user.firstName + ' ' + user.lastName}
      );
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default user;