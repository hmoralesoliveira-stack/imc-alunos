// Espera o formulário ser enviado
document.getElementById("imcForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede recarregar a página

    calcularIMC();
});

function calcularIMC() {

    // Pegando valores do formulário
    const nome = document.getElementById("nome").value.trim();
    const serie = document.getElementById("serie").value.trim();
    const idade = document.getElementById("idade").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    const resultadoDiv = document.getElementById("resultado");
    const erroDiv = document.getElementById("erro");

    // Limpa mensagens anteriores
    erroDiv.textContent = "";
    resultadoDiv.classList.add("hidden");

    // 🔎 Validações básicas
    if (!nome || !serie || !idade || !peso || !altura) {
        erroDiv.textContent = "⚠️ Todos os campos devem ser preenchidos.";
        return;
    }

    if (altura === 0) {
        erroDiv.textContent = "⚠️ Altura não pode ser zero.";
        return;
    }

    // 🧮 Cálculo do IMC
    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(2);

    // 📊 Classificação
    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Peso normal";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else {
        classificacao = "Obesidade";
    }

    // 🖥️ Exibição do resultado
    resultadoDiv.innerHTML = `
        <h3>Resultado</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Série:</strong> ${serie}</p>
        <p><strong>Idade:</strong> ${idade}</p>
        <p><strong>IMC:</strong> ${imcFormatado}</p>
        <p><strong>Classificação:</strong> ${classificacao}</p>
    `;

    resultadoDiv.classList.remove("hidden");
}

// 🔄 Limpar campos
function limparCampos() {
    document.getElementById("imcForm").reset();
    document.getElementById("resultado").classList.add("hidden");
    document.getElementById("erro").textContent = "";
}
