document.addEventListener("DOMContentLoaded", function() {
    const API_ENDPOINT = 'https://embedded.runalloy.com/2023-06/one/commerce/products?connectionId=64ee0778e82c129ab636f901&pageSize=10';

    fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer SaOSPcvU3jdRx2M9sqZrC',
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => displayProducts(data.products))
    .catch(error => console.error('Error fetching products:', error));
});

function displayProducts(products) {
    const productsBody = document.getElementById("productsBody");

    // Sort products by creation date (most recent at the top)
    products.sort((a, b) => b.createdTimestamp - a.createdTimestamp);

    products.forEach(product => {
        const row = document.createElement("tr");

        const columns = [
            product.productName,
            product.vendor,
            product.productStatus,
            new Date(product.createdTimestamp * 1000).toLocaleString(),
            new Date(product.updatedTimestamp * 1000).toLocaleString(),
            product.productUrl
        ];

        columns.forEach((column, index) => {
            const td = document.createElement("td");
            if (index === columns.length - 1) {
                const anchor = document.createElement("a");
                anchor.href = column;
                anchor.textContent = "View";
                anchor.target = "_blank";
                td.appendChild(anchor);
            } else {
                td.textContent = column;
            }
            row.appendChild(td);
        });

        productsBody.appendChild(row);
    });
}
document.getElementById("createProduct").addEventListener("click", function() {
    // Show modal
    document.getElementById("productModal").style.display = "block";
});

document.getElementById("cancelProduct").addEventListener("click", function() {
    // Hide modal
    document.getElementById("productModal").style.display = "none";
});

document.getElementById("saveProduct").addEventListener("click", function() {
    const productName = document.getElementById("productName").value;
    const description = document.getElementById("description").value;
    const productStatus = document.getElementById("productStatus").value;
    const price = parseFloat(document.getElementById("price").value);
    const productType = document.getElementById("productType").value;
    const vendor = document.getElementById("vendor").value;

    const productData = {
        productName,
        description,
        productStatus,
        price,
        productType,
        vendor
    };

    // Call API to save product
    fetch('https://embedded.runalloy.com/2023-06/one/commerce/products?connectionId=64ee0778e82c129ab636f901', {
        method: 'POST', // Assuming POST is used to create a new product, adjust if different
        headers: {
            'Authorization': 'Bearer SaOSPcvU3jdRx2M9sqZrC',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
    })
    .then(response => {
        if (response.ok) {
            // Hide modal
            document.getElementById("productModal").style.display = "none";
            // Reload products list or just prepend the new product to the top
            location.reload();
        } else {
            console.error("Failed to create product");
        }
    })
    .catch(error => {
        console.error('Error creating product:', error);
    });
});

