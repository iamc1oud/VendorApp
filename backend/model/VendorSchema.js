const mongoose = require('mongoose')

const vendorschema = mongoose.Schema({
    invoice_number :{
        prop : 'invoice_numbers',
        type: Number,
        unique: true
    },
    document_number : {
        prop: 'documentNumber',
        type: Number
    },
    type: {
        prop: 'type',
        type: String
    },
    net_due_dt : {
        prop : 'net_due_date',
        type: Date
    },
    doc_Date : {
        prop : 'doc_date',
        type: Date
    },
    
    posting_date : {
        prop: 'posting_date',
        type: Date
    },
    amt_in_loc_cur: {
        prop: 'amount_in_local_currency',
        type: Number
    },
    vendor_code: {
        prop:   'vendor_code',
        type: String
    },
    vendor_name: {
        prop:'vendor_name',
        type: String
    },
    vendor_type: {
        prop:   'vendor_type',
        type: String
    }
})

vendorschema.pre('save', () => {
    //console.log("Function run before saving to database");
})


// {
//     InvoiceNumbers: Number,
//     DocumentNumber: Number,
//     Type: String,
//     NetDuedt: Date,
//     DocDate: Date,
//     PstngDate: Date,
//     AmtInlocCur: Number,
//     VendorCode: String,
//     VendorName: String,
//     VendorType: String
// }

module.exports = mongoose.model('VendorData', vendorschema)