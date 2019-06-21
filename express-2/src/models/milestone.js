import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false
    },
    milestoneCategory: {
        type: String,
        required: true
    }

});

const Milestone = mongoose.model('Milestone', milestoneSchema);

export default Milestone;
