export const configs = {
  serverHost:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_SERVER_HOST!
      : `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
};
