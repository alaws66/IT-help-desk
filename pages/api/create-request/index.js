import connect from '@/utils/connect';
import Requests from '@/models/request';
import moment from 'moment';

const createRequest = async (req, res) => {
  try {
    const {
      fullName,
      department,
      issueHeadline,
      issueDescription,
      status
    } = req.body;

    // connect to database
    await connect();

    await Requests.create({
      fullName,
      department,
      dateRequested: moment().add(1, 'hour'),
      issueHeadline,
      issueDescription,
      status,
      technician: null
    });

    res.status(200).json({ message: 'Request Created' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default createRequest;