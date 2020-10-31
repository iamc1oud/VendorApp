const express = require("express")
const fileUpload = require("express-fileupload")
const morgan = require("morgan")
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const _ = require("lodash")
const { response } = require("express")
const path = require('path')
const vendor = require('./model/VendorSchema')
const readXlsxFile = require('read-excel-file')
const mongoose = require("mongoose")

// Mongoose modules
mongoose.connect('mongodb://localhost:27017/Vendor', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', () => {
    console.log("Connected to mongo db");
})

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(fileUpload({
    createParentPath: false,
    tempFileDir: true
}))
app.use(cors())

var invoice_object = {
    'Invoice Numbers': Number,
    'Document Number': Number,
    'Type': String,
    'Net Due dt': Date,
    'Doc. Date': Date,
    'Pstng Date': Date,
    'Amt in loc.cur.': Number,
    'Vendor Code': String,
    'Vendor Name': String,
    'Vendor Type': String
}

// Checking if data already exists
function checkIfExists(invoicenumber, invoice) {
    try {
        vendor.find({
            invoice_number :  invoicenumber
        }, (err, doc) => {
            if(doc.length == 0){
                vendor.create(invoice)
                console.log("New invoice");
                
            }
            else {
                console.log("Already exists");
            }
        })
    } catch(err) {
        console.log(err);
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
            readXlsxFile(vendorfile.data).then((rows) => {

                for (var i = 1; i <= rows.length; i++) {
                    console.log("Data at " + i + " index is " + rows[i][0]);
                    let record = {
                        invoice_number: rows[i][0],
                        document_number: rows[i][1],
                        type: rows[i][2],
                        net_due_dt: rows[i][3],
                        doc_Date: rows[i][4],
                        posting_date: rows[i][5],
                        amt_in_loc_cur: rows[i][6],
                        vendor_code: rows[i][7],
                        vendor_name: rows[i][8],
                        vendor_type: rows[i][9]
                    }
                    checkIfExists(record.invoice_number, record)
                    // Check whether the record is present or not
                    console.log(db.collection('invoices').length);
                    
                    //vendor.create(record)
                }

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

app.get("/api/v1/detail", (req, res) => {
    
    
    res.send({
        status : "OK",
        invoices_uploaded : invoice_uploaded 
    })
})


app.listen(
    9000,
    () => console.log("Server is up and running")
)