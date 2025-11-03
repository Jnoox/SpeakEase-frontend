import { authRequest } from "../../lib/auth";

const BASE = "http://127.0.0.1:8000/api";

export const trainingAPI = {
  getRandomWord: () =>
    authRequest({
      method: "get",
      url: `${BASE}/vocabulary/`
    }),

  voiceTraining: (formData) =>
    authRequest({
      method: "post",
      url: `${BASE}/training/voice/`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
};
