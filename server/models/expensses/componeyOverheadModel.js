import mongoose from 'mongoose';

const componeyOverheadSchema = new mongoose.Schema({}, { strict: false });
const ComponeyOverheadModel = mongoose.model('ComponeyOverhead', componeyOverheadSchema);

export default ComponeyOverheadModel;