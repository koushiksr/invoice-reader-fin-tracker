import mongoose from 'mongoose';

const miscExpSchema = new mongoose.Schema({}, { strict: false });
const MiscExpModel = mongoose.model('MiscExp', miscExpSchema);

export default MiscExpModel;