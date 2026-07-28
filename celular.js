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

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video,0,0);

    await lerComprovante(canvas);

};
