/**
 * Integrations script for the application.
 * Handles integration functionality, fetches integration data, and renders options.
 * Allows users to select an integration and connect it headlessly.
 * @file Integrations script
 * @see {@link https://example.com}
 */

// Modal-related functions
function hideModal() {
    document.getElementById('workflowsModal').style.display = 'none';
}

function showModal() {
    document.getElementById('workflowsModal').style.display = 'block';
}

const closeModal = document.querySelector('.close');
closeModal.addEventListener('click', hideModal);

// Integration-related functions
async function fetchIntegrations() {
    Alloy.setToken(window.magicallyToken);
    return await Alloy.getIntegrations();
}

function renderIntegrationOptions(integrations) {
    const integrationOptions = document.getElementById('integration-options');
    for (const integration of integrations) {
        const option = document.createElement('div');
        option.classList.add('integration-card');
        const buttonText = integration.workflows.length > 1 ? 'View Workflows' : 'Connect';
        option.innerHTML = `
            <img src="${integration.icon}" alt="${integration.app}">
            <div>
                <h3>${integration.app}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo, nisi et bibendum venenatis, sapien sapien interdum erat, id bibendum nisl libero vitae justo.</p>
                <button onclick="selectIntegration('${integration.integrationId}', integrationsData.data)">${buttonText}</button>
                <button onclick="connectHeadlessly('${integration.integrationId}', '${integration.app}')">Connect Headlessly</button>
            </div>`;
        integrationOptions.appendChild(option);
    }
}

async function selectIntegration(integrationId, integrations) {
    const selectedIntegration = integrations.find(
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

// Headless connection
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

// Initialization
async function initialize() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const apiKey = urlParams.get('apiKey');
        const userId = urlParams.get('userId');

        if (!apiKey || !userId) {
            const storedApiKey = sessionStorage.getItem('apiKey');
            const storedUserId = sessionStorage.getItem('userId');

            if (storedApiKey && storedUserId) {
                window.location.href = `/success?userId=${storedUserId}&apiKey=${storedApiKey}`;
                return;
            } else {
                console.error("API key and User ID are missing.");
                return;
            }
        }

        const integrationsData = await fetchIntegrations();
        renderIntegrationOptions(integrationsData.data);
    } catch (error) {
        console.error('Failed to fetch integrations:', error);
    }
}
document.addEventListener("DOMContentLoaded", initialize);
