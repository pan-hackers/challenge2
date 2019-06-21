import mongoose from 'mongoose';

const consumableUnit = new mongoose.Schema({
    GTIN: {
        type: String,
        required: true
    },
    
    tradeUnit: { type: mongoose.Schema.Types.ObjectId, ref: 'TradeUnit' },
});

const ConsumableUnit = mongoose.model('Consumable Unit', consumableUnit);

export default ConsumableUnit;
