import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    GLN: {
        type: String,
        required: true
    },
    location: String,

    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
