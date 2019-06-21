import mongoose from 'mongoose';

const consumableUnit = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    GTIN: {
        type: String,
        required: true
    }
});

const ConsumableUnit = mongoose.model('Consumable Unit', consumableUnit);

export default ConsumableUnit;
