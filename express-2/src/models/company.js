import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    GCP: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    }
});

const Company = mongoose.model('Company', companySchema);

export default Company;
