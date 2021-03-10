const dividirCadena = async(cadenaADividir, separador) => {
    const arrayDeCadenas = cadenaADividir.split(separador);

    for (var i = 0; i < arrayDeCadenas.length; i++) {
        console.log(arrayDeCadenas[i]);
    }


}

module.exports = {
    dividirCadena
}