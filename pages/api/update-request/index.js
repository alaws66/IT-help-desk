import connect from '@/utils/connect';
import Requests from '@/models/request';

const updateRequest = async (req, res) => {
  try {
    const { id, status, technician } = req.body;

    // connect to database
    await connect();

    // find by id and update status
    const request = await Requests.findByIdAndUpdate(id, { status: status, technician: technician });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json({ message: 'Request Updated' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default updateRequest;