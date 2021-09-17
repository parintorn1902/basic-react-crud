import axios from "axios";
import Router from "next/dist/client/router";
import AuthManager from "../auth/AuthManager";

class ServiceManager {
  static async get(urlWithParams: string) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AuthManager.getToken(),
        },
      };
      const response = await axios.get(urlWithParams, config);
      const result = response.data;

      if (result.success) {
        return result.data;
      } else {
        throw result.message;
      }
    } catch (error) {
      handleServiceError(error);
    }
  }

  static async post(url: string, requestBody: any) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AuthManager.getToken(),
        },
      };
      const response = await axios.post(url, requestBody, config);
      const result = response.data;

      if (result.success) {
        return result.data;
      } else {
        throw result.message;
      }
    } catch (error) {
      handleServiceError(error);
    }
  }

  static async put(urlWithParams: string, requestBody: any) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AuthManager.getToken(),
        },
      };

      const response = await axios.put(urlWithParams, requestBody, config);
      const result = response.data;

      if (result.success) {
        return result.data;
      } else {
        throw result.message;
      }
    } catch (error) {
      handleServiceError(error);
    }
  }

  static async delete(urlWithParams: string) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AuthManager.getToken(),
        },
      };

      const response = await axios.delete(urlWithParams, config);
      const result = response.data;

      if (result.success) {
        return result.data;
      } else {
        throw result.message;
      }
    } catch (error) {
      handleServiceError(error);
    }
  }
}

export default ServiceManager;

const handleServiceError = (error: any) => {
  let errorMessage = error;
  if (error?.response?.status === 401) {
    AuthManager.destroyToken();
    errorMessage = "Token expired, Please sign in again.";
    Router.push("/");
  }

  throw errorMessage;
};
