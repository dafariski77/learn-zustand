import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import configs from "../configs/auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data) => {
      return axios.post(`${configs.serverUrl}/api/v1/auth/login`, data);
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data) => {
      return axios.post(`${configs.serverUrl}/api/v1/auth/register`, data);
    },
  });
};

export const useVerifyMutation = () => {
  return useMutation({
    mutationFn: (data) => {
      return axios.post(`${configs.serverUrl}/api/v1/auth/verify`, data);
    },
  });
};
