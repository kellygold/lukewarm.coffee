document.getElementById('goButton').addEventListener('click', async () => {
    const apiKey = document.getElementById('apiKey').value;
    const errorMessage = document.getElementById('errorMessage');

    if (!apiKey) {
        errorMessage.textContent = "Please enter an API key.";
        return;
    }

    try {
        // Check if user exists
        let response = await fetch('https://embedded.runalloy.com/2023-06/users', {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${apiKey}`,
                'Accept': 'application/json'
            }
        });

        if (response.status === 401) {
            errorMessage.textContent = "Unauthorized. Please check your API key.";
            return;
        }

        let data = await response.json();
        let userId;

        const existingUser = data.data.find(user => user.username === "demo-app-default@test.com");

        if (existingUser) {
            userId = existingUser.userId;
        } else {
            // Create a new user if the specific user does not exist
            response = await fetch('https://embedded.runalloy.com/2023-06/users/', {
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${apiKey}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": "demo-app-default@test.com",
                    "fullName": "Demo User"
                })
            });

            data = await response.json();
            userId = data.userId;
        }

        // Store the API key and userId in the session (you can use local storage or session storage)
        sessionStorage.setItem('apiKey', apiKey);
        sessionStorage.setItem('userId', userId);

        // Redirect to the integrations page
        window.location.href = `/success?userId=${userId}&apiKey=${apiKey}`;

    } catch (error) {
        errorMessage.textContent = "An error occurred. Please try again.";
    }
});
