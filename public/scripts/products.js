const apiKey = sessionStorage.getItem('apiKey');
const userId = sessionStorage.getItem('userId');

document.addEventListener("DOMContentLoaded", function() {
    const API_ENDPOINT = 'https://embedded.runalloy.com/2023-06/one/commerce/products?connectionId=651da7e4d6e4affcf592988c&pageSize=10';

    fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer laON7aWuiCDHyYQof42AT',
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

document.getElementById("saveProduct").addEventListener("click", async function() {
    const productName = document.getElementById("productName").value;
    const description = document.getElementById("description").value;
    const productStatus = document.getElementById("productStatus").value;
    const price = document.getElementById("price").value;
    const productType = document.getElementById("productType").value;
    const vendor = document.getElementById("vendor").value;
    const inventoryQuantity = document.getElementById("inventoryQuantity").value;
    const sku = faker.random.alphaNumeric(10);

    let base64Image;
    try {
        const response = await fetch('https://picsum.photos/400');
        const blob = await response.blob();
        base64Image = await blobToBase64(blob);
    } catch (error) {
        console.error('Error fetching the image:', error);
    }

    const productData = {
        event: "isv_app_product_created",
        userId: userId,
        data: {
            customFieldsMappings: {
                images: [{
                    attachment: base64Image,
                }],
                variants: [{
                    price: price,
                    inventory_quantity: inventoryQuantity,
                    sku: sku,
                }],
            },
            productName,
            description,
            productStatus,
            price,
            productType,
            vendor
        }
    };

    // Call API to save product
    fetch('https://embedded.runalloy.com/2023-06/run/event', {  // updated endpoint
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
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
            console.log(response)
        } else {
            console.error("Failed to create product");
            console.log(apiKey)
        }
    })
    .catch(error => {
        console.error('Error creating product:', error);
    });
});

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function() {
            resolve(reader.result.split(',')[1]); // Return only the Base64 string
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

document.getElementById("autoFillProduct").addEventListener("click", function() {
    // Using faker to generate data
    document.getElementById("productName").value = faker.commerce.productName();
    document.getElementById("description").value = faker.commerce.productDescription();
    document.getElementById("productStatus").value = "active"; // Keeping it as 'active' for simplicity
    document.getElementById("price").value = faker.commerce.price().toString();
    document.getElementById("productType").value = faker.commerce.productMaterial(); // Using productMaterial as a placeholder for product type
    document.getElementById("vendor").value = faker.company.companyName();
    document.getElementById("inventoryQuantity").value = Math.floor(Math.random() * 1000) + 1;
});
