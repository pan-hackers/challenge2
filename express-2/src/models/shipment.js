import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    }
});

const ShipmentSchema = mongoose.model('Location', shipmentSchema);

export default ShipmentSchema;
