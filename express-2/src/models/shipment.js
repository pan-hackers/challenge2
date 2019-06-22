import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
    status: {
        type: String,
        required: false
    },
    awb: {
      type: String,
      required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    SSCC: {
        type: String,
        required: true,
        unique: true
    },
    milestones: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' } ]
}/*, {
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret._v;
      }
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret._v;
      }
    }
  }*/);

const ShipmentSchema = mongoose.model('Shipment', shipmentSchema);

export default ShipmentSchema;
