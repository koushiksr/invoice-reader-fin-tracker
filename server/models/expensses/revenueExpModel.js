import mongoose from 'mongoose';

const revenueExpSchema = new mongoose.Schema({}, { strict: false });
const RevenueExpModel = mongoose.model('RevenueExp', revenueExpSchema);

export default RevenueExpModel;     