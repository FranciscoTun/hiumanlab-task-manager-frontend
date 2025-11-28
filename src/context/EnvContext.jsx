import React, { createContext, useContext } from "react";

const EnvContext = createContext({});
export const EnvProvider = ({ children }) => {
  const env = {
    API_URL: import.meta.env.VITE_API_URL,
    APP_NAME: import.meta.env.VITE_APP_NAME,
    DEFAULT_TASK_STATE: import.meta.env.VITE_DEFAULT_TASK_STATE,
  };

  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;
};

export const useEnv = () => {
  return useContext(EnvContext);
};
