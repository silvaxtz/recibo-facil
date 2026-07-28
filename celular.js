const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const capturar = document.getElementById("capturar");
const status = document.getElementById("status");

async function iniciarCamera() {

    try {

        const stream = await navigator.mediaDevices.getUserMedia({

            video:{
                facingMode:{
                    ideal:"environment"
                }
            },

            audio:false

        });

        video.srcObject = stream;

        status.innerText = "📷 Câmera pronta";

    } catch (erro) {

        console.error(erro);

        status.innerText = "❌ Erro ao abrir câmera";

        alert("Não foi possível acessar a câmera.");

    }

}

iniciarCamera();

capturar.onclick = async ()=>{

    status.innerText="📸 Capturando...";

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

   ctx.drawImage(video, 0, 0);

const corte = document.createElement("canvas");
const c = corte.getContext("2d");

// Ajuste estes valores conforme a posição do ID
const x = canvas.width * 0.08;
const y = canvas.height * 0.72;
const w = canvas.width * 0.84;
const h = canvas.height * 0.12;

corte.width = w;
corte.height = h;

c.drawImage(
    canvas,
    x, y, w, h,
    0, 0, w, h
);

await lerComprovante(corte);
