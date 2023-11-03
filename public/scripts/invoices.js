const apiKey = sessionStorage.getItem('apiKey');
const userId = sessionStorage.getItem('userId');

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("invoicesBody").addEventListener("change", function(e) {
        if (e.target.tagName.toLowerCase() === 'input' && e.target.type === 'checkbox') {
            toggleSyncButton();
        }
    });

    document.getElementById("syncInvoices").addEventListener("click", function() {
        const selectedInvoices = getSelectedInvoices();
        
        selectedInvoices.forEach(invoice => {
            const payload = {
                event: "isv_invoice_created",
                userId: userId,
                data: {
                    invoice: invoice
                }
            };
            syncInvoice(payload);
        });
    });

    displayInvoices(); // Displaying sample invoices on page load
});

function toggleSyncButton() {
    const checkboxes = document.querySelectorAll('#invoicesBody input[type="checkbox"]');
    const syncButton = document.getElementById("syncInvoices");
    
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            syncButton.classList.add('active'); // Add active class
            syncButton.disabled = false; // Ensure the button is enabled
            return;
        }
    }
    
    syncButton.classList.remove('active'); // Remove active class
    syncButton.disabled = true; // Ensure the button is disabled
}

function getSelectedInvoices() {
    const checkboxes = document.querySelectorAll('#invoicesBody input[type="checkbox"]');
    const selectedInvoices = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const invoice = JSON.parse(checkbox.dataset.invoice); // Parsing the full invoice object
            selectedInvoices.push(invoice);
        }
    });
    
    return selectedInvoices;
}

function syncInvoice(payload) {
    fetch('https://embedded.runalloy.com/2023-06/run/event', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function displayInvoices() {
    const invoicesBody = document.getElementById("invoicesBody");
    
    const sampleInvoices = [
        {
            "invoice_id": "INV12345",
            "issue_date": "2023-10-01",
            "due_date": "2023-10-31",
            "invoice_type": "AP",
            "billing_address": {
                "street": "123 Main St",
                "city": "Springfield",
                "state": "IL",
                "zip": "62704",
                "country": "USA"
            },
            "shipping_address": {
                "street": "456 Elm St",
                "city": "Springfield",
                "state": "IL",
                "zip": "62705",
                "country": "USA"
            },
            "customer": {
                "customer_id": "CUST001",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "phone": "555-555-5555"
            },
            "line_items": [
                {
                    "item_id": "ITEM001",
                    "description": "Product A",
                    "quantity": 5,
                    "unit_price": 20,
                    "amount": 100
                },
                {
                    "item_id": "ITEM002",
                    "description": "Product B",
                    "quantity": 2,
                    "unit_price": 50,
                    "amount": 100
                }
            ],
            "sub_total": 200,
            "tax": 20,
            "total": 220,
            "notes": "Thank you for your business!",
            "terms": "Net 30",
            "status": "unpaid"
        },
        {
            "invoice_id": "INV12346",
            "issue_date": "2023-10-02",
            "due_date": "2023-10-32",
            "invoice_type": "AR",
            "billing_address": {
                "street": "789 Oak St",
                "city": "Shelbyville",
                "state": "IL",
                "zip": "62565",
                "country": "USA"
            },
            "shipping_address": {
                "street": "101 Maple St",
                "city": "Shelbyville",
                "state": "IL",
                "zip": "62565",
                "country": "USA"
            },
            "customer": {
                "customer_id": "CUST002",
                "name": "Jane Smith",
                "email": "jane.smith@example.com",
                "phone": "555-555-5556"
            },
            "line_items": [
                {
                    "item_id": "ITEM003",
                    "description": "Service C",
                    "quantity": 1,
                    "unit_price": 200,
                    "amount": 200
                }
            ],
            "sub_total": 200,
            "tax": 20,
            "total": 220,
            "notes": "We appreciate your continued support.",
            "terms": "Net 30",
            "status": "paid"
        },
        {
            "invoice_id": "INV12347",
            "issue_date": "2023-10-03",
            "due_date": "2023-11-03",
            "invoice_type": "AR",
            "billing_address": {
                "street": "159 Elm St",
                "city": "Capital City",
                "state": "IL",
                "zip": "62701",
                "country": "USA"
            },
            "shipping_address": {
                "street": "202 Oak St",
                "city": "Capital City",
                "state": "IL",
                "zip": "62702",
                "country": "USA"
            },
            "customer": {
                "customer_id": "CUST003",
                "name": "Emily Johnson",
                "email": "emily.j@example.com",
                "phone": "555-555-5557"
            },
            "line_items": [
                {
                    "item_id": "ITEM005",
                    "description": "Product E",
                    "quantity": 4,
                    "unit_price": 40,
                    "amount": 160
                }
            ],
            "sub_total": 160,
            "tax": 0,
            "total": 160,
            "notes": "Looking forward to serving you again.",
            "terms": "Net 30",
            "status": "unpaid"
        }
    ];

    sampleInvoices.forEach(invoice => {
        const row = document.createElement("tr");
        
        row.style.backgroundColor = invoice.invoice_type === 'AP' ? '#f8d7da' : '#d4edda';

        const columns = [
            `<input type="checkbox" data-invoice='${JSON.stringify(invoice)}'>`,
            invoice.invoice_id,
            invoice.customer.name,
            `${invoice.line_items[0].description} ${invoice.line_items.length > 1 ? `(+${invoice.line_items.length - 1} more items)` : ""}`,
            invoice.issue_date,
            invoice.due_date,
            `$${invoice.total}`,
            invoice.status,
            invoice.invoice_type === 'AP' ? 'Accounts Payable (Outgoing)' : 'Accounts Receivable (Incoming)'
        ];
        
        columns.forEach(column => {
            const td = document.createElement("td");
            td.innerHTML = column;
            row.appendChild(td);
        });
        
        invoicesBody.appendChild(row);
    });
}
