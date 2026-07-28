const codigoDiv = document.getElementById("codigo");
const status = document.getElementById("status");
const copiar = document.getElementById("copiar");

let ultimoCodigo = "";

async function carregarUltimo() {

    const { data, error } = await db
        .from("codigos")
        .select("*")
        .order("enviado_em", { ascending: false })
        .limit(1);

    if (!error && data.length > 0) {
        ultimoCodigo = data[0].codigo;
        codigoDiv.innerText = ultimoCodigo;
    }

    status.innerText = "🟢 Conectado";
}

carregarUltimo();

db.channel("codigos")
.on(
    "postgres_changes",
    {
        event: "INSERT",
        schema: "public",
        table: "codigos"
    },
    (payload) => {

        ultimoCodigo = payload.new.codigo;
        codigoDiv.innerText = ultimoCodigo;
        status.innerText = "✅ Novo ID recebido";

        codigoDiv.style.background = "#dcfce7";

        setTimeout(() => {
            codigoDiv.style.background = "#f5f5f5";
        }, 2000);

    }
)
.subscribe();

copiar.onclick = async () => {

    if (!ultimoCodigo) return;

    await navigator.clipboard.writeText(ultimoCodigo);

    copiar.innerText = "✅ Copiado";

    setTimeout(() => {
        copiar.innerText = "📋 Copiar ID";
    }, 1500);

};
