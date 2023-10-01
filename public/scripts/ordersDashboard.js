const apiKey = sessionStorage.getItem('apiKey');
const userId = sessionStorage.getItem('userId');


document.addEventListener("DOMContentLoaded", function() {
    const API_ENDPOINT = 'https://embedded.runalloy.com/2023-06/one/commerce/orders?connectionId=6512f06d55242704b790d628&pageSize=50';

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

    document.getElementById("createSampleOrder").addEventListener('click', createSampleOrder);
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


