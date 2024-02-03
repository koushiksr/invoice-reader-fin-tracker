import mongoose from 'mongoose';

const BillDetailsSchema = new mongoose.Schema({}, { strict: false });
const BillDetailsModel = mongoose.model('BillDetails', BillDetailsSchema);

export default BillDetailsModel;