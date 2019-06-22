import mongoose from 'mongoose';

const consumableUnit = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    GTIN: {
        type: String,
        required: true,
        unique: true
    }
});

const ConsumableUnit = mongoose.model('ConsumableUnit', consumableUnit);

export default ConsumableUnit;
