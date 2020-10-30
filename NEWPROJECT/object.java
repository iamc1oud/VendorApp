import java.util.List;

class Vendor {
    private String vendorid;
    private String vendorname;
    private String vendortpye;
    private List<Invoice> invoices;
}

class Invoice {
    private Integer invoice_number;
    private Integer doc_number;
    private String type;
    private Date net_due_date;
    private Date document_date;
    private Date posting_date;
    private Float currency;
}

class Result {
    private List<Vendor> vendorList;

}