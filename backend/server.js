const express = require("express")
const fileUpload = require("express-fileupload")
const morgan = require("morgan")
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const _ = require("lodash")
const { response } = require("express")
const path = require('path')

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

// Post request to upload file
app.post("/api/v1/upload", async (request, response) => {
    const FILE_TYPE_PREFFERED = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

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
                console.log(rows);
            })
            // Checking whether the uploaded files is of excel
            if(vendorfile.mimetype != FILE_TYPE_PREFFERED){
                response.send({
                    status: false,
                    message: "Upload Excel file only",
                    err : "NOT_PREFERRED_FILE_TYPE"
                })
            }
            else {

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