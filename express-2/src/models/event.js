import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    what: {
        type: String,
        required: true
    },
    when: {
        type: Date,
        required: true
    },
    where: {
        type: String,
        required: true
    },
    why: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    // shipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment' },
    logisticUnit: { type: mongoose.Schema.Types.ObjectId, ref: 'LogisticUnit' },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
