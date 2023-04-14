function isValidUUID(uuid: string) {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    return uuidRegex.test(uuid);
}

function isValidCPF(cpf: string) {
    cpf = cpf.toString();
    return cpf.length === 14;
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
