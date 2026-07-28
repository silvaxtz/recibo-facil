const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const capturar = document.getElementById("capturar");
const codigoDiv = document.getElementById("codigo");
const status = document.getElementById("status");

// Abre a câmera traseira
async function iniciarCamera() {

    alert("Tentando abrir a câmera");

    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            }
        });

        alert("Câmera aberta!");

        video.srcObject = stream;

        status.innerText = "📷 Câmera pronta";

    } catch (erro) {

        alert("Erro: " + erro.message);

        console.error(erro);

        status.innerText = erro.message;

    }

}
    // Procura a linha do ID
    const linha = text
        .split("\n")
        .find(l => /[I1l][D0O]\s*:?/i.test(l));

    if (!linha) {

        codigoDiv.innerText = "ID não encontrado";
        status.innerText = "❌";

        return;
    }

    let codigo = linha
        .replace(/[I1l][D0O]\s*:?/i, "")
        .replace(/\s+/g, "")
        .trim();

    codigoDiv.innerText = codigo;

    status.innerText = "☁️ Enviando...";

    const { error } = await supabase
        .from("codigos")
        .insert([
            {
                codigo: codigo
            }
        ]);

    if (error) {

        console.error(error);

        status.innerText = "❌ Erro ao enviar";

        return;
    }

    status.innerText = "✅ Enviado!";
});
