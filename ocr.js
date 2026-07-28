const linhas = text.split("\n");

const linhaID = linhas.find(l =>
    l.toUpperCase().includes("ID:")
);

if (!linhaID) {
    codigoEncontrado = "";
    codigoDiv.innerText = "ID não encontrado";
    status.innerText = "❌";
    return;
}

codigoEncontrado = linhaID
    .replace(/ID:/i, "")
    .replace(/\s/g, "")
    .trim();

codigoDiv.innerText = codigoEncontrado;
status.innerText = "✅ ID encontrado";
