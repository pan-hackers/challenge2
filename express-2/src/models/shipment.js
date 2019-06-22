import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    SSCC: {
        type: String,
        required: true,
        unique: true
    },
});

const ShipmentSchema = mongoose.model('Shipment', shipmentSchema);

export default ShipmentSchema;
