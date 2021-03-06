import mongoose from 'mongoose';

const tradeUnitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    GTIN: {
        type: String,
        required: true,
        unique: true
    },
    shipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment' },
    consumableUnits: [ { type: mongoose.Schema.Types.ObjectId, ref: 'ConsumableUnit' } ]
});

const TradeUnit = mongoose.model('TradeUnit', tradeUnitSchema);

export default TradeUnit;
