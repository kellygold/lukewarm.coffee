const apiKey = sessionStorage.getItem('apiKey');
const userId = sessionStorage.getItem('userId');


document.addEventListener("DOMContentLoaded", function() {

    
    const API_ENDPOINT = 'https://embedded.runalloy.com/2023-06/one/commerce/orders?connectionId=652d6460c672f2c2021cc9da&pageSize=50';
//kelly@runalloy 65085d5884e8f6e3ec490b84
// kelly+se@runalloy 6512f06d55242704b790d628
    fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer laON7aWuiCDHyYQof42AT',
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => displayOrders(data.orders))
    .catch(error => console.error('Error fetching orders:', error));
    document.getElementById('refreshWebhooks').addEventListener('click', fetchWebhookEvents);
    document.getElementById("createSampleOrder").addEventListener('click', createSampleOrder);
});
function toggleDrawer() {
    const drawer = document.querySelector('.webhook-drawer');
    if (drawer.style.display === "none" || !drawer.style.display) {
        drawer.style.display = "block";
    } else {
        drawer.style.display = "none";
    }
}
function fetchWebhookEvents() {
    fetch('/webhooks', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => displayWebhooks(data.webhooks))
    .catch(error => console.error('Error fetching webhooks:', error));
}

function displayWebhooks(webhooks) {
    const webhookEventsDiv = document.querySelector('.webhook-events');
    webhookEventsDiv.innerHTML = ''; // Clear the existing webhooks

    webhooks.forEach(webhook => {
        const webhookDiv = document.createElement("div");
        webhookDiv.className = "webhook-event";

        const summaryDiv = document.createElement("div");
        summaryDiv.className = "webhook-summary";
        summaryDiv.textContent = `Event: ${webhook.headers['x-alloy-workflow']}`;
        summaryDiv.addEventListener('click', function() {
            const detailsDiv = this.nextElementSibling;
            if (detailsDiv.style.display === "none" || !detailsDiv.style.display) {
                detailsDiv.style.display = "block";
            } else {
                detailsDiv.style.display = "none";
            }
        });

        const detailsDiv = document.createElement("div");
        detailsDiv.className = "webhook-details";
        detailsDiv.textContent = JSON.stringify(webhook.data, null, 2); // Pretty print the JSON

        webhookDiv.appendChild(summaryDiv);
        webhookDiv.appendChild(detailsDiv);
        webhookEventsDiv.appendChild(webhookDiv);
    });
}

document.getElementById('magicallyLogo').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the default link behavior

    const storedApiKey = sessionStorage.getItem('apiKey');
    const storedUserId = sessionStorage.getItem('userId');
    
    if (storedApiKey && storedUserId) {
        window.location.href = `/success?userId=${storedUserId}&apiKey=${storedApiKey}`;
    } else {
        window.location.href = '/';  // or some other default location
    }
});
function createSampleOrder() {
    // Generate fake order data using Faker.js

    const validAreaCodes = [
        '201', '202', '203', '205', '206', '207', '208', '209', '210',
        '212', '213', '214', '215', '216', '217', '218', '219', '225',
        '228', '229', '231', '234', '239', '240', '248'
    ];

    let phoneNumber;
    const randomAreaCode = validAreaCodes[Math.floor(Math.random() * validAreaCodes.length)];
    phoneNumber = faker.phone.phoneNumber(`${randomAreaCode}-###-####`);

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const city = faker.address.city();
    const address1 = faker.address.streetAddress();
    const countryCode = faker.address.countryCode();
    const postalCode = faker.address.zipCode();
    const region = faker.address.state();

    const orderData = {
        customer: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phoneNumber,
        },
        currency: 'USD',
        billingAddress: {
            firstName: firstName,
            lastName: lastName,
            city: city,
            phone: phoneNumber,
            address1: address1,
            countryCode: countryCode,
            postalCode: postalCode,
            region: region
        },
        lineItems: [
            {
                quantity: 1,
                productId: 8279801921840,
                price: faker.commerce.price(),
                currency: 'USD',
                title: faker.commerce.productName(),
                variantId: 44923451277616
            },
            {
                quantity: 1,
                productId: faker.datatype.uuid(),
                price: faker.commerce.price(),
                currency: 'USD',
                title: faker.commerce.productName()
            }
        ],
        paymentStatus: 'Paid',
        fulfillmentStatus: 'unfulfilled'
    };


    
    // Send the order data to your API
    fetch('https://embedded.runalloy.com/2023-06/run/event', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event: "isv_app_order_created",
            userId: userId,
            data: orderData
        })
    })
    .then(response => {
        console.log('API Response:', response);
        return response.json();
    })
    .then(data => {
        if (data.message == "Event successfully triggered") {
            alert('Sample order created successfully!');
            const ordersBody = document.getElementById("ordersBody");
            const newRow = generateTableRow({
                ...orderData,
                orderNumber: "Demo-" + Date.now(),
                totalPrice: orderData.lineItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2)
            });
            ordersBody.prepend(newRow);
        } else {
            alert('Error creating sample order. Please try again.');
        }
    })
    .catch(error => console.error('Error creating sample order:', error));
}


function generateTableRow(order) {
    const row = document.createElement("tr");
    const columns = [
        order.orderNumber,
        `${order.customer?.firstName || 'Unknown'} ${order.customer?.lastName || 'Unknown'}`,
        order.customer?.email || 'Unknown Email',
        `$${order.lineItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2)} ${order.currency || 'Unknown Currency'}`,
        order.paymentStatus || 'Unknown Status',
        new Date().toLocaleString(),
        new Date().toLocaleString(),
        "View"
    ];
    

    columns.forEach(column => {
        const td = document.createElement("td");
        td.textContent = column;
        row.appendChild(td);
    });

    return row;
}

function displayOrders(orders) {
    const ordersBody = document.getElementById("ordersBody");

    // Sort the orders by createdTimestamp in descending order
    orders.sort((a, b) => b.createdTimestamp - a.createdTimestamp);

    orders.forEach(order => {
        if (!order.customer) {
            console.warn('Order missing customer data:', order);
        }

        const row = document.createElement("tr");

        const columns = [
            order.orderNumber,
            `${order.customer?.firstName || 'Unknown'} ${order.customer?.lastName || 'Unknown'}`,
            order.customer?.email || 'Unknown Email',
            `$${order.totalPrice || 0} ${order.currency || 'Unknown Currency'}`,
            order.orderStatus || 'Unknown Status',
            new Date(order.createdTimestamp * 1000).toLocaleString(),
            new Date(order.updatedTimestamp * 1000).toLocaleString(),
            "View"
        ];

        columns.forEach(column => {
            const td = document.createElement("td");
            td.textContent = column;
            row.appendChild(td);
        });

        ordersBody.appendChild(row);
    });
}


