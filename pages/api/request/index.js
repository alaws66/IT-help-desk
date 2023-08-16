import connect from '@/utils/connect';
import Requests from '@/models/request';

const request = async (req, res) => {
  try {
    const { id } = req.body;

    // connect to database
    await connect();

    const request = await Requests.findById(id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default request;