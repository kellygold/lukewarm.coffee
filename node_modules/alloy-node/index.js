const axios = require("axios");
const { ObjectId } = require("mongodb");

class Alloy {
  headers = {};
  username = null;
  userId = null;

  constructor(apiKey) {
    this.apiKey = apiKey;
    this.headers = {
      Authorization: `Bearer ${apiKey}`,
    };
  }

  async identify(username) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/users/${username}`,
      method: "GET",
      headers: this.headers,
      data: {},
    };

    try {
      const responseData = await axios.request(options);
      this.username = responseData?.data?.username;
      this.userId = responseData?.data?.userId;
    } catch (err) {
      this.username = null;
      this.userId = null;
      throw err.response.data.message;
    }
  }

  clear() {
    this.username = null;
    this.userId = null;
  }

  async event(eventName, payload) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/run/event`,
      method: "POST",
      headers: this.headers,
      data: {
        event: eventName,
        userId: this.userId,
        data: payload,
      },
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getUser(user) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/users/${user}`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getVersions(workflowId) {
    const options = {
      url: `https://embedded.runalloy.com/2023-06/workflows/${workflowId}/versions`,
      method: "GET",
      headers: this.headers,
      params: { userId: this.userId },
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getUsers() {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/users`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async createUser(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/users`,
      method: "POST",
      headers: this.headers,
      data: data,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async updateUser(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/users/${this.userId}`,
      method: "PUT",
      headers: this.headers,
      data: data,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async deleteUser() {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/users/${this.userId}`,
      method: "DELETE",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getUserToken() {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/users/${this.userId}/token`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getWorkflows() {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/workflows`,
      method: "GET",
      headers: this.headers,
      params: { userId: this.userId },
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async reactivate(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/workflows/activate`,
      method: "PUT",
      headers: this.headers,
      data: { userId: this.userId, ...data },
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async deactivate(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/workflows/deactivate`,
      method: "PUT",
      headers: this.headers,
      data: { userId: this.userId, ...data },
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async disableAllWorkflows() {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/users/${this.userId}/deactivate-workflows`,
      method: "PUT",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getLogs(workflowId) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/workflows/${workflowId}/logs`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getLogs(workflowId) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/workflows/${workflowId}/logs`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async deleteLogs() {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/users/${this.userId}/logs`,
      method: "DELETE",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getAnalytics(workflowId) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/workflows/${workflowId}/analytics`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getIntegrations() {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/integrations`,
      method: "GET",
      headers: this.headers,
      params: { userId: this.userId },
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getIntegration(name) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/integrations/${name}`,
      method: "GET",
      headers: this.headers,
      params: { userId: this.userId },
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getWorkflowDetails(workflowId) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/workflows/${workflowId}/users`,
      method: "GET",
      headers: this.headers,
      params: { userId: this.userId },
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getApps() {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/apps`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async run(workflow, payload) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/run/workflow`,
      method: "POST",
      headers: this.headers,
      data: {
        ...(ObjectId.isValid(workflow) && new ObjectId(workflow).toString() === workflow ? { workflowId: workflow } : { workflowName: workflow }),
        userId: this.userId,
        data: payload,
      },
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getUserOauthRedirect(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/users/${this.userId}/credentials/${data.credentialName}`,
      method: "GET",
      headers: this.headers,
      params: data,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getCredential(credentialName) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/credentials/${credentialName}`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getWorkflow(workflowId) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/workflows/${workflowId}`,
      method: "GET",
      headers: this.headers,
      params: { userId: this.userId },
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async deleteWorkflow(workflowId) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/workflows/${workflowId}`,
      method: "DELETE",
      headers: this.headers,
      params: { userId: this.userId },
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async generateLink(integrationId) {
    const options = {
      url: `https://embedded.runalloy.com/2023-01/users/${this.userId}/integrations/${integrationId}/install-url`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async listCustomers(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/customers?userId=${data.userId}&credentialId=${data.credentialId}`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getCustomer(customerId, credentialId) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/customers/${customerId}?userId=${this.userId}&credentialId=${credentialId}`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async createCustomer(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/customers?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "POST",
      headers: this.headers,
      data: data,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async updateCustomer(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/customers/${data.customerId}?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "PUT",
      headers: this.headers,
      data: data,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async deleteCustomer(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/customers/${data.customerId}?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "DELETE",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async listOrders(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/orders?userId=${data.userId}&credentialId=${data.credentialId}`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getOrder(orderId, credentialId) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/orders/${orderId}?userId=${this.userId}&credentialId=${credentialId}`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async createOrder(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/orders?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "POST",
      headers: this.headers,
      data: data,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async updateOrder(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/orders/${data.orderId}?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "PUT",
      headers: this.headers,
      data: data,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async deleteOrder(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/orders/${data.customerId}?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "DELETE",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async listProducts(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/products?userId=${data.userId}&credentialId=${data.credentialId}`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getProduct(productId, credentialId) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/products/${productId}?userId=${this.userId}&credentialId=${credentialId}`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async createProduct(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/products?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "POST",
      headers: this.headers,
      data: data,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async updateProduct(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/products/${data.productId}?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "PUT",
      headers: this.headers,
      data: data,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async deleteProduct(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/products/${data.productId}?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "DELETE",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async listProductVariants(productId, data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/products/${productId}/variants?userId=${data.userId}&credentialId=${data.credentialId}`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getProductVariant(productId, variantId, credentialId) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/products/${productId}/variants/${variantId}?userId=${this.userId}&credentialId=${credentialId}`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async createProductVariant(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/products/${data.productId}/variants?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "POST",
      headers: this.headers,
      data: data,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async updateProductVariant(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/products/${data.productId}?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "PUT",
      headers: this.headers,
      data: data,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async deleteProductVariant(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/commerce/products/${data.productId}/variants/${data.variantId}?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "DELETE",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async listSubscriptions() {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/webhooks?userId=${data.userId}&credentialId=${data.credentialId}`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async getSubscription(subscriptionId, credentialId) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/webhooks/${subscriptionId}?userId=${this.userId}&credentialId=${credentialId}`,
      method: "GET",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async createSubscription(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/webhooks?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "POST",
      headers: this.headers,
      data: data,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }

  async deleteSubscription(data) {
    const options = {
      url: `https://embedded.runalloy.com/2023-03/one/webhooks/${data.subscriptionId}?userId=${this.userId}&credentialId=${data.credentialId}`,
      method: "DELETE",
      headers: this.headers,
    };

    try {
      const responseData = await axios.request(options);
      return responseData?.data;
    } catch (err) {
      throw err.response.data.message;
    }
  }
}

module.exports = Alloy;
