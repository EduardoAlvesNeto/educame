function validateCPF(cpf) {
    cpf = cpf.toString();
    return cpf.length === 14;
}


function validateCNPJ(cnpj) {
    cnpj = cnpj.toString();
    return cnpj.length === 14;
}

function validateUUID(uuid) {
    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return regex.test(uuid);
}


export {
    validateCPF,
    validateCNPJ,
    validateUUID
};
