import connect from '@/utils/connect';
import Users from '@/models/user';

const logout = async (req, res) => {
  try {
    const { id } = req.body;

    // connect to database
    await connect();

    const user = await Users.findByIdAndUpdate(id, { loggedIn: false });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User logged out' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default logout;