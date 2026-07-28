async function lerComprovante(imagem){

    status.innerText = "🤖 Lendo comprovante...";

    const resultado = await Tesseract.recognize(
        imagem,
        "eng",
        {
            logger: m => console.log(m)
        }
    );

    const texto = resultado.data.text;

    console.log(texto);

    // Procura a linha que contém ID:
    const linhas = texto.split("\n");

    let codigo = "";

    for(const linha of linhas){

        const limpa = linha.replace(/\s+/g," ");

        if(/ID/i.test(limpa)){

            codigo = limpa
                .replace(/.*ID[:\s]*/i,"")
                .replace(/[^A-Z0-9]/gi,"")
                .trim();

            break;

        }

    }

    // Caso não encontre pela palavra ID,
    // procura um código alfanumérico grande.
    if(codigo===""){

        const encontrados = texto.match(/[A-Z0-9]{25,60}/g);

        if(encontrados){

            codigo = encontrados[0];

        }

    }

    if(codigo===""){

        document.getElementById("codigo").innerText="❌ ID não encontrado";

        status.innerText="Tente aproximar mais o comprovante.";

        return;

    }

    document.getElementById("codigo").innerText=codigo;

    status.innerText="☁️ Enviando...";

    const { error } = await db
    .from("codigos")
    .insert([
        {
            codigo: codigo
        }
    ]);

    if(error){

        console.error(error);

        status.innerText="❌ Erro ao enviar";

        return;

    }

    status.innerText="✅ Enviado com sucesso!";
}
