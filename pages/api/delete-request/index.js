import connect from '@/utils/connect';
import Requests from '@/models/request';

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.body;

    // connect to database
    await connect();

    // find by id and delete request
    const request = await Requests.findByIdAndDelete(id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json({ message: 'Request Deleted' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default deleteRequest;