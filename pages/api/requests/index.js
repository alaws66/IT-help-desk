import connect from '@/utils/connect';
import Requests from '@/models/request';

const requests = async (req, res) => {
  try {
    // connect to database
    await connect();

    // find all requests
    const requests = await Requests.find();

    if (!requests) {
      return res.statsu(404).json({ error: 'Requests not found' });
    }

    res.json(requests);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default requests;