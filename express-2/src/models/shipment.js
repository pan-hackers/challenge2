import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
    status: {
        type: String,
        required: false
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
});

const ShipmentSchema = mongoose.model('Shipment', shipmentSchema);

export default ShipmentSchema;
