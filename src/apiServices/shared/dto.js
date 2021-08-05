// Estructura de mensaje predeterminado para la respuesta del servidor
const normally = (status, data) => ({
    status: status,
    data: data,
});

module.exports = {
    normally,
};