const inputImagem = document.getElementById("imagem");
const codigoDiv = document.getElementById("codigo");
const status = document.getElementById("status");

let codigoEncontrado = "";

inputImagem.addEventListener("change", async () => {

    const arquivo = inputImagem.files[0];

    if (!arquivo) return;

    status.innerText = "🔍 Lendo recibo...";

    const {
        data: { text }
    } = await Tesseract.recognize(
        arquivo,
        "por"
    );

    // Procura números entre 16 e 20 dígitos
    const numeros = text.match(/\d{16,20}/g);

    if (!numeros || numeros.length === 0) {

        codigoEncontrado = "";

        codigoDiv.innerText = "Nenhum código encontrado";

        status.innerText = "❌ Código não localizado";

        return;
    }

    // Pega o maior número encontrado
    codigoEncontrado = numeros.sort((a,b)=>b.length-a.length)[0];

    codigoDiv.innerText = codigoEncontrado;

    status.innerText = "✅ Código encontrado";

});
