const BASE_URL = "http://localhost:5173";

const getRedirectUrl = (platform, success = true, data = {}) => {
  const params = new URLSearchParams({
    success: success.toString(),
    platform,
    ...data,
  });

  return `${BASE_URL}/interface?${params.toString()}`;
};

const getErrorRedirectUrl = (reason = "unknown") => {
  return `${BASE_URL}/error?reason=${reason}`;
};

module.exports = {
  getRedirectUrl,
  getErrorRedirectUrl,
};
