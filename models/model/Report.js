import { Schema, Model } from 'mongoose';

const ReportSchmea = {
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reportType: {
        type: String,
        required: true
    },
    reportDescription: {
        type: String,
        required: true
    },
    reportDate: {
        type: Date,
        default: Date.now
    },
    reportStatus: {
        type: String,
        default: 'pending'
    },
    reportLocation:{
        type: String,
        required: true
    },
    supportingImages:{
        type: Array,
        default: []
    }

}
const Report = Model('Report', ReportSchmea);
export default Report;  // eslint-disable-line no-unused-vars