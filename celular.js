const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const capturar = document.getElementById("capturar");
const codigoDiv = document.getElementById("codigo");
const status = document.getElementById("status");

// Abre a câmera traseira
async function iniciarCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: {
                    ideal: "environment"
                }
            },
            audio: false
        });

        video.srcObject = stream;
        status.innerText = "📷 Câmera pronta";
    } catch (e) {
        console.error(e);
        status.innerText = "❌ Não foi possível abrir a câmera";
    }
}

iniciarCamera();

capturar.addEventListener("click", async () => {

    status.innerText = "🔍 Lendo recibo...";

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    const {
        data: { text }
    } = await Tesseract.recognize(canvas, "eng");

    console.log(text);

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
