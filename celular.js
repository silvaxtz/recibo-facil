const botaoEnviar = document.getElementById("enviar");

botaoEnviar.onclick = async () => {

    if (!codigoEncontrado) {

        alert("Nenhum código encontrado.");

        return;
    }

    const { error } = await supabase
        .from("codigos")
        .insert([
            {
                codigo: codigoEncontrado
            }
        ]);

    if (error) {

        alert("Erro ao enviar.");

        console.log(error);

        return;
    }

    alert("✅ Código enviado com sucesso!");

};
