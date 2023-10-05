const apiKey = sessionStorage.getItem('apiKey');
const userId = sessionStorage.getItem('userId');

document.addEventListener("DOMContentLoaded", function() {
    // Commented out the API call for now
    // const API_ENDPOINT = 'https://embedded.runalloy.com/2023-06/one/crm/contacts?connectionId=651ebe4ab298ecb7c63d2185';

    document.getElementById("createContact").addEventListener("click", function() {
        // Show modal
        document.getElementById("contactModal").style.display = "block";
    });

    document.getElementById("autoFillContact").addEventListener("click", function() {
        // Using faker to generate data
        document.getElementById("firstName").value = faker.name.firstName();
        document.getElementById("lastName").value = faker.name.lastName();
        document.getElementById("email").value = faker.internet.email();
        document.getElementById("phone").value = faker.phone.phoneNumber();
        document.getElementById("street").value = faker.address.streetAddress();
        document.getElementById("city").value = faker.address.city();
        document.getElementById("state").value = faker.address.state();
        document.getElementById("postalCode").value = faker.address.zipCode();
        document.getElementById("country").value = faker.address.country();
        document.getElementById("jobTitle").value = faker.name.jobTitle();
        document.getElementById("company").value = faker.company.companyName();
    });

    document.getElementById("saveContact").addEventListener("click", function() {
        const contactData = {
            event: "isv_app_contact_created",
            userId: userId,
            data: {
                id: faker.random.uuid(),
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                fullName: document.getElementById("firstName").value + " " + document.getElementById("lastName").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                address: {
                    street: document.getElementById("street").value,
                    city: document.getElementById("city").value,
                    state: document.getElementById("state").value,
                    postalCode: document.getElementById("postalCode").value,
                    country: document.getElementById("country").value
                },
                jobTitle: document.getElementById("jobTitle").value,
                company: document.getElementById("company").value
            }
        };

        // Call API to save contact
        fetch('https://embedded.runalloy.com/2023-06/run/event', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData)
        })
        .then(response => {
            if (response.ok) {
                // Hide modal
                document.getElementById("contactModal").style.display = "none";
                // Reload contacts list or just prepend the new contact to the top
                console.log(response);
            } else {
                console.error("Failed to create contact");
            }
        })
        .catch(error => {
            console.error('Error creating contact:', error);
        });
    });

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

    document.getElementById("cancelContact").addEventListener("click", function() {
        // Hide modal
        document.getElementById("contactModal").style.display = "none";
    });

    // Using mock data for now
    const mockContacts = [
        {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            company: "Doe Corp",
            createdDate: "2023-01-01T00:00:00Z",
            lastActivityDate: "2023-01-10T00:00:00Z"
        },
        {
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            phone: "123-456-7891",
            company: "Smith Ltd",
            createdDate: "2023-01-02T00:00:00Z",
            lastActivityDate: "2023-01-11T00:00:00Z"
        },
        {
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice.johnson@example.com",
            phone: "123-456-7892",
            company: "Johnson & Sons",
            createdDate: "2023-01-03T00:00:00Z",
            lastActivityDate: "2023-01-12T00:00:00Z"
        },
        {
            firstName: "Bob",
            lastName: "Williams",
            email: "bob.williams@example.com",
            phone: "123-456-7893",
            company: "Williams Inc",
            createdDate: "2023-01-04T00:00:00Z",
            lastActivityDate: "2023-01-13T00:00:00Z"
        },
        {
            firstName: "Charlie",
            lastName: "Brown",
            email: "charlie.brown@example.com",
            phone: "123-456-7894",
            company: "Brown Co",
            createdDate: "2023-01-05T00:00:00Z",
            lastActivityDate: "2023-01-14T00:00:00Z"
        },
        {
            firstName: "Daisy",
            lastName: "Davis",
            email: "daisy.davis@example.com",
            phone: "123-456-7895",
            company: "Davis & Daughters",
            createdDate: "2023-01-06T00:00:00Z",
            lastActivityDate: "2023-01-15T00:00:00Z"
        },
        {
            firstName: "Edward",
            lastName: "Miller",
            email: "edward.miller@example.com",
            phone: "123-456-7896",
            company: "Miller Industries",
            createdDate: "2023-01-07T00:00:00Z",
            lastActivityDate: "2023-01-16T00:00:00Z"
        },
        {
            firstName: "Fiona",
            lastName: "Garcia",
            email: "fiona.garcia@example.com",
            phone: "123-456-7897",
            company: "Garcia Global",
            createdDate: "2023-01-08T00:00:00Z",
            lastActivityDate: "2023-01-17T00:00:00Z"
        },
        {
            firstName: "George",
            lastName: "Rodriguez",
            email: "george.rodriguez@example.com",
            phone: "123-456-7898",
            company: "Rodriguez & Partners",
            createdDate: "2023-01-09T00:00:00Z",
            lastActivityDate: "2023-01-18T00:00:00Z"
        },
        {
            firstName: "Hannah",
            lastName: "Martinez",
            email: "hannah.martinez@example.com",
            phone: "123-456-7899",
            company: "Martinez Media",
            createdDate: "2023-01-10T00:00:00Z",
            lastActivityDate: "2023-01-19T00:00:00Z"
        }
    ];

    displayContacts(mockContacts);
});

function displayContacts(contacts) {
    const contactsBody = document.getElementById("contactsBody");

    contacts.forEach(contact => {
        const row = document.createElement("tr");

        const columns = [
            `${contact.firstName} ${contact.lastName}`,
            contact.email,
            contact.phone,
            contact.company,
            new Date(contact.createdDate).toLocaleString(),
            new Date(contact.lastActivityDate).toLocaleString()
        ];

        columns.forEach(column => {
            const td = document.createElement("td");
            td.textContent = column;
            row.appendChild(td);
        });

        contactsBody.appendChild(row);
    });
}
