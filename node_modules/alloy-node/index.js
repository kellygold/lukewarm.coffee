const axios = require("axios");

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
        workflow,
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
}

module.exports = Alloy;
