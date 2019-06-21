import mongoose from 'mongoose';

const tradeUnitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    GLN: {
        type: String,
        required: true
    },
    consumableUnits: [ { type: mongoose.Schema.Types.ObjectId, ref: 'ConsumableUnit' } ]
});

const TradeUnit = mongoose.model('TradeUnit', tradeUnitSchema);

export default TradeUnit;
