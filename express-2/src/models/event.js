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
    temperature: {
        type: Number,
        required: false
    },
    logisticUnit: { type: mongoose.Schema.Types.ObjectId, ref: 'LogisticUnit' },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
