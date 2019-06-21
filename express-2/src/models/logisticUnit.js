import mongoose from 'mongoose';

const logisticUnitSchema = new mongoose.Schema({
    SSCC: {
        type: String,
        required: true
    }
});

const LogisticUnit = mongoose.model('Location', logisticUnitSchema);

export default LogisticUnit;
