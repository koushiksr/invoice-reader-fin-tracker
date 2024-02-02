import mongoose from 'mongoose';

const capitalExpSchema = new mongoose.Schema({}, { strict: false });







const CapitalExpModel = mongoose.model('CapitalExp', capitalExpSchema);

export default CapitalExpModel;