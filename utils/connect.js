import mongoose from 'mongoose';
import config from 'config';

const connect = async () => {
  return mongoose.connect(`${config.get('mongoDbUrl')}/help-desk`);
}

export default connect;