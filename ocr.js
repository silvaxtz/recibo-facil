async function lerComprovante(canvas){

    status.innerText = "Preparando imagem...";

    const ctx = canvas.getContext("2d");

    const img = ctx.getImageData(0,0,canvas.width,canvas.height);

    const d = img.data;

    for(let i=0;i<d.length;i+=4){

        const media=(d[i]+d[i+1]+d[i+2])/3;

        const cor = media>170 ? 255 : 0;

        d[i]=cor;
        d[i+1]=cor;
        d[i+2]=cor;

    }

    ctx.putImageData(img,0,0);

    status.innerText="Lendo ID...";

    const resultado = await Tesseract.recognize(
        canvas,
        "eng",
        {
            logger:m=>console.log(m)
        }
    );

    let texto = resultado.data.text.toUpperCase();

    console.log(texto);

    let codigo="";

    const match = texto.match(/ID[:\s]*([A-Z0-9]+)/);

    if(match){

        codigo=match[1];

    }

    if(!codigo){

        const lista = texto.match(/[A-Z0-9]{30,60}/g);

        if(lista){

            codigo=lista[0];

        }

    }

    codigo=codigo
        .replace(/ /g,"")
        .replace(/\n/g,"")
        .replace(/O/g,"0")
        .replace(/I/g,"1")
        .replace(/L/g,"1");

    if(!codigo){

        status.innerText="ID não encontrado";

        return;

    }

    document.getElementById("codigo").innerText=codigo;

    status.innerText="Enviando...";

    const {error}=await db
    .from("codigos")
    .insert([
        {
            codigo
        }
    ]);

    if(error){

        console.error(error);

        status.innerText="Erro ao enviar";

        return;

    }

    status.innerText="✅ Enviado";

}
