const { query, queryParams } = require("../../../dal/data-access");


const addpostulaciones = async(req, res) => {
    const {
        id_postulante,
        id_vacante
    } = req.body;

    const mysqlParams = [
        id_postulante,
        id_vacante
    ];
    let resultQuery = await queryParams(
        "stp_add_postulaciones(?, ?)",
        mysqlParams
    );



    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Ocurrio un error al agregar la informacion",
            data: null,
        });

    }
    res.json({
        status: true,
        message: "Informacion agregada de manera exitosa",
        data: "yes",
    });


}

const cancelpostulaciones = async(req, res) => {
    const {
        id
    } = req.params;

    const mysqlParams = [
        id_postulacion = id
    ]

    let resultQuery = await queryParams(
        "stp_cancel_postulaciones(?)",
        mysqlParams
    );

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Ocurrio un error al cancelar la postulacion",
            data: null,
        });

    }
    res.json({
        status: true,
        message: "Postulacion cancelada de manera exitosa",
        data: "yes",
    });
}

const deletepostulaciones = async(req, res) => {
    const {
        id
    } = req.params;

    const mysqlParams = [
        id_postulacion = id
    ]

    let resultQuery = await queryParams(
        "stp_delete_postulaciones(?)",
        mysqlParams
    );

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Ocurrio un error al cancelar la postulacion",
            data: null,
        });

    }
    res.json({
        status: true,
        message: "Postulacion cancelada de manera exitosa",
        data: "yes",
    });
}

const aceptarpostulante = async(req, res) => {
    const {
        id
    } = req.params;

    const mysqlParams = [
        id_postulacion = id
    ]

    let resultQuery = await queryParams(
        "stp_aceptar_postulacioes(?)",
        mysqlParams
    );

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Ocurrio un error al aceptar la postulacion",
            data: null,
        });

    }
    res.json({
        status: true,
        message: "Postulacion aceptada de manera exitosa",
        data: "yes",
    });
}

const rechazarpostulante = async(req, res) => {
    const {
        id
    } = req.params;

    const mysqlParams = [
        id_postulacion = id
    ]

    let resultQuery = await queryParams(
        "stp_rechazar_postulacioes(?)",
        mysqlParams
    );

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Ocurrio un error al rechazar la postulacion",
            data: null,
        });

    }
    res.json({
        status: true,
        message: "Postulacion rechazada de manera exitosa",
        data: "yes",
    });
}


module.exports = {
    addpostulaciones,
    cancelpostulaciones,
    deletepostulaciones,
    aceptarpostulante,
    rechazarpostulante
}