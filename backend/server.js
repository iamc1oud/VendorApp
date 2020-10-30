const express = require("express")
const fileUpload = require("express-fileupload")
const morgan = require("morgan")
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const _ = require("lodash")
const { response } = require("express")
const path = require('path')

// Mongoose modules
const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser :true
})

const db = mongoose.connection

db.once('open', () => {
    console.log("Connected to mongo db");
})

// Dependency required for reading excel file
const readXlsxFile = require('read-excel-file')

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(fileUpload({
    createParentPath: false,
    tempFileDir: true
}))
app.use(cors())

// Schema 
const fileSchema = {
    'Invoice Numbers':{
        prop : 'invoice_numbers',
        type: Date
    },
    'Document Number' : {
        prop: 'documentNumber',
        type: Number
    },
    'Type': {
        prop: 'type',
        type: String
    },
    'Net Due dt' : {
        prop : 'net_due_date',
        type: Number
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


// Post request to upload file
app.post("/api/v1/upload", async (request, response) => {
    //    const FILE_TYPE_PREFFERED = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

    try {
        if (!request.files) {
            response.send({
                status: false,
                message: "No file uploaded"
            })
        }
        else {
            let vendorfile = request.files.uploadedfile

            vendorfile.mv("./uploaded/" + vendorfile.name)

            // Read the excel file
            readXlsxFile(vendorfile.data, {fileSchema}).then(({rows, errors}) => {
                
            }).catch((onrejectionhandled) => {
                console.log(onrejectionhandled);
            })
            // Checking whether the uploaded files is of excel
            // if(vendorfile.mimetype != FILE_TYPE_PREFFERED){
            //     response.send({
            //         status: false,
            //         message: "Upload Excel file only",
            //         err : "NOT_PREFERRED_FILE_TYPE"
            //     })
            // }
            // else {

            var data = vendorfile.data.toString("utf-8")
            response.send({
                status: true,
                message: "File is uploaded",
                data: {
                    name: vendorfile.name,
                    mimetype: vendorfile.mimetype,
                    size: vendorfile.size,
                }
            })
        }
    } catch (err) {
        response.status(500)
        console.log(err);
    }
})

app.listen(
    9000,
    () => console.log("Server is up and running")
)