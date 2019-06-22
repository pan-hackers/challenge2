import mongoose from 'mongoose';

const logisticUnitSchema = new mongoose.Schema({
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
    tradeUnits: [ { type: mongoose.Schema.Types.ObjectId, ref: 'TradeUnit' } ]
});

const LogisticUnit = mongoose.model('LogisticUnit', logisticUnitSchema);

export default LogisticUnit;
