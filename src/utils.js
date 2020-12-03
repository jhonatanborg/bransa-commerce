const errorMessage = message => {
  if (message) {
    if (message.response && message.response.data[0]) return message.response.data[0].message;
    if (message.response && message.response.data.message) return message.response.data.message;
    return message.response ? message.response.data : message;
  }
  return 'Erro';
};
// eslint-disable-next-line import/prefer-default-export
export { errorMessage };
