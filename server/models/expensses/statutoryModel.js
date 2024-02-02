import mongoose from 'mongoose';

const statutorySchema = new mongoose.Schema({}, { strict: false });
const StatutoryModel = mongoose.model('Statutory', statutorySchema);

export default StatutoryModel;        




