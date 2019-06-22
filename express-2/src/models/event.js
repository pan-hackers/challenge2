import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    milestone: {
        type: String,
        required: true
    },
    // shipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment' },
    logisticUnit: { type: mongoose.Schema.Types.ObjectId, ref: 'LogisticUnit' },
});

const Event = mongoose.model('Event', eventSchema);

export default Company;
