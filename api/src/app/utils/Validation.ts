function isValidUUID(uuid: string) {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    return uuidRegex.test(uuid);
}

function isValidCPF(cpf: string) {
    console.log(cpf);
    console.log(cpf.length === 11);
    console.log(cpf.length);
    return cpf.length === 11;
}


function isValidCNPJ(cnpj: string) {
    cnpj = cnpj.toString();
    return cnpj.length === 14;
}

export {
    isValidUUID,
    isValidCPF,
    isValidCNPJ,
};
