const codigoDiv = document.getElementById("codigo");
const status = document.getElementById("status");
const copiar = document.getElementById("copiar");

let ultimoCodigo = "";

// Carrega o último código salvo
async function carregarUltimoCodigo() {
    const { data, error } = await supabase
        .from("codigos")
        .select("*")
        .order("enviado_em", { ascending: false })
        .limit(1);

    if (!error && data.length > 0) {
        ultimoCodigo = data[0].codigo;
        codigoDiv.textContent = ultimoCodigo;
    }

    status.textContent = "🟢 Conectado";
}

carregarUltimoCodigo();

// Escuta novos códigos em tempo real
supabase
.channel("codigos")
.on(
    "postgres_changes",
    {
        event: "*",
        schema: "public",
        table: "codigos"
    },
    (payload) => {

        ultimoCodigo = payload.new.codigo;
        codigoDiv.textContent = ultimoCodigo;

    }
)
.subscribe();

// Botão copiar
copiar.onclick = async () => {

    if (!ultimoCodigo) return;

    await navigator.clipboard.writeText(ultimoCodigo);

    copiar.innerText = "✅ Copiado";

    setTimeout(() => {
        copiar.innerText = "📋 Copiar";
    },1500);

};
