import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false
    },
    eta: {
        type: Date,
        required: false
    },
    ata: {
        type: Date,
        required: false
    },
    etd: {
        type: Date,
        required: false
    },
    atd: {
        type: Date,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    shipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment' },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]

});

const Milestone = mongoose.model('Milestone', milestoneSchema);

export default Milestone;
