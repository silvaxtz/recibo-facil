const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const capturar = document.getElementById("capturar");
const status = document.getElementById("status");

async function iniciarCamera() {

    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: "environment" },
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            },
            audio: false
        });

        video.srcObject = stream;

        await video.play();

        status.innerText = "📷 Câmera pronta";

    } catch (e) {

        console.error(e);

        status.innerText = "Erro ao abrir câmera";

    }

}

iniciarCamera();

capturar.onclick = async () => {

    status.innerText = "Capturando...";

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    // Região onde fica o ID
    const corte = document.createElement("canvas");
    const c = corte.getContext("2d");

    const x = canvas.width * 0.05;
    const y = canvas.height * 0.67;
    const w = canvas.width * 0.90;
    const h = canvas.height * 0.18;

    corte.width = w * 3;
    corte.height = h * 3;

    c.drawImage(
        canvas,
        x,
        y,
        w,
        h,
        0,
        0,
        corte.width,
        corte.height
    );

    await lerComprovante(corte);

};
