import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true },
  contactPhone: { type: String, required: true },
  softwareType: { type: String, required: true },
  salesperson: { type: String, required: true },
  saleDate: { type: Date, required: true },
  licenseType: { type: String, required: true },
  quantity: { type: String, required: true },
  transactionAmount: { type: String, required: true },
  leadSource: { type: String, required: true },
  internalNotes: { type: String, required: true },
});

const Sales = mongoose.model('Sales', salesSchema);

export default Sales;
