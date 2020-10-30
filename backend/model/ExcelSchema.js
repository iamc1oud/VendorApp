
const fileSchema = {
    'Invoice Numbers':{
        prop : 'invoice_numbers',
        type: Date
    },
    'Document Number' : {
        prop: 'documentNumber',
        type: Integer
    },
    'Type': {
        prop: 'type',
        type: String
    },
    'Net Due dt' : {
        prop : 'net_due_date',
        type: Integer
    },
    'Doc. Date' : {
        prop : 'doc_date',
        type: Date
    },
    
    'Pstng Date' : {
        prop: 'posting_date',
        type: Date
    },
    'Amt in loc.cur.': {
        prop: 'amount_in_local_currency',
        type: Number
    },
    'Vendor Code': {
        prop:   'vendor_code',
        type: String
    },
    'Vendor Name': {
        prop:   'vendor_name',
        type: String
    },
    'Vendor Type': {
        prop:   'vendor_type',
        type: String
    }
}