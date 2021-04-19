const auth = (status, data, token) => ({
    status: status,
    data: data,
    token: token
});

module.exports = {
    auth,
};