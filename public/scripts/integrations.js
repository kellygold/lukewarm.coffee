const apiKey = sessionStorage.getItem('apiKey');
const userId = sessionStorage.getItem('userId');


// Get the close button element
const closeModal = document.querySelector('.close');

// Add a click event listener to the close button
closeModal.addEventListener('click', () => {
    document.getElementById('workflowsModal').style.display = 'none';
});

let integrationsData = [];

async function selectIntegration(integrationId) {
    const selectedIntegration = integrationsData.data.find(
        (integration) => integration.integrationId === integrationId
    );

    if (selectedIntegration.workflows.length > 1) {
        displayWorkflowsModal(selectedIntegration);
    } else {
        Alloy.setToken(window.magicallyToken);
        Alloy.install({
            integrationId: integrationId,
            callback: () => {
                console.log('Alloy Embedded Modal installed successfully.');
            },
        });
    }
}

function displayWorkflowsModal(integration) {
    const workflowsContainer = document.getElementById('workflows-container');
    workflowsContainer.innerHTML = '';

    for (const workflow of integration.workflows) {
        const label = document.createElement('label');
        label.className = 'workflow-option';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'workflow';
        input.value = workflow.workflowId;
        input.checked = workflow.installed;
        label.appendChild(input);

        // Display block icons
        for (const block of workflow.blocks) {
            const blockIcon = document.createElement('img');
            blockIcon.className = 'block-icon';
            blockIcon.src = block.icon;
            label.appendChild(blockIcon);
        }

        const workflowNameWrapper = document.createElement('div');
        workflowNameWrapper.className = 'workflow-name';

        const text = document.createTextNode(workflow.name);
        workflowNameWrapper.appendChild(text);
        label.appendChild(workflowNameWrapper);

        workflowsContainer.appendChild(label);
    }

    // Show the modal
    document.getElementById('workflowsModal').style.display = 'block';
}

document.getElementById('connect-workflows').addEventListener('click', () => {
    const selectedWorkflows = Array.from(
        document.querySelectorAll('input[name="workflow"]:checked')
    ).map((checkbox) => checkbox.value);

    Alloy.setToken(window.magicallyToken);
    Alloy.install({
        workflowIds: selectedWorkflows,
        callback: () => {
            console.log('Selected workflows installed successfully.');
        },
        alwaysShowAuthentication: true,
        hide: false,
        title: 'Cool Alloy Workflows',
    });
});

async function connectHeadlessly(integrationId, appName) {
    if (appName === "Shopify" || appName === "Salesforce CRM") {
        const subdomain = prompt("Please enter your shop subdomain:");
        if (subdomain) {
            try {
                const apiKey = sessionStorage.getItem('apiKey');
                const userId = sessionStorage.getItem('userId');
                const response = await fetch(`https://embedded.runalloy.com/2023-01/users/${userId}/credentials/${appName.toLowerCase()}?integrationId=${integrationId}&shopSubdomain=${subdomain}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `bearer ${apiKey}`,
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                if (data.data && data.data.redirectUrl) {
                    window.open(data.data.redirectUrl, '_blank');
                } else {
                    console.error("Failed to get redirect URL");
                }
            } catch (error) {
                console.error('Error connecting headlessly:', error);
            }
        }
    } else {
        alert("Headless connection is not supported for this app.");
    }
}

// Fetch the integration data and render the options
(async function () {
    Alloy.setToken(window.magicallyToken);
    integrationsData = await Alloy.getIntegrations();
    const integrationOptions = document.getElementById('integration-options');

    for (const integration of integrationsData.data) {
        const option = document.createElement('div');
        option.classList.add('integration-card');
        const buttonText = integration.workflows.length > 1 ? 'View Workflows' : 'Connect';
        option.innerHTML = `
            <img src="${integration.icon}" alt="${integration.app}">
            <div>
                <h3>${integration.app}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo, nisi et bibendum venenatis, sapien sapien interdum erat, id bibendum nisl libero vitae justo.</p>
                <button onclick="selectIntegration('${integration.integrationId}')">${buttonText}</button>
                <button onclick="connectHeadlessly('${integration.integrationId}', '${integration.app}')">Connect Headlessly</button>
            </div>`;
        integrationOptions.appendChild(option);
    }
})();