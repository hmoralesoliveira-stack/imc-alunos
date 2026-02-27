// Carrega alunos do LocalStorage
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

// Garante que o DOM carregue antes de executar
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("imcForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        calcularIMC();
    });

});

function calcularIMC() {

    const nome = document.getElementById("nome").value.trim();
    const serie = document.getElementById("serie").value.trim();
    const idade = parseInt(document.getElementById("idade").value);
    const sexo = document.getElementById("sexo").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    const resultadoDiv = document.getElementById("resultado");
    const erroDiv = document.getElementById("erro");

    erroDiv.textContent = "";
    resultadoDiv.classList.add("hidden");

    // 🔎 Validação
    if (!nome || !serie || isNaN(idade) || !sexo || isNaN(peso) || isNaN(altura)) {
        erroDiv.textContent = "⚠️ Todos os campos devem ser preenchidos corretamente.";
        return;
    }

    if (altura === 0) {
        erroDiv.textContent = "⚠️ Altura não pode ser zero.";
        return;
    }

    // 🧮 Cálculo IMC
    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(2);

    let classificacao = "";

    // 👶 Classificação Infantil (6–12 anos)
    if (idade >= 6 && idade <= 12) {

        const tabelaOMS = {
            6: { M: {p5: 13.5, p85: 17.5, p95: 19}, F: {p5: 13.3, p85: 17.3, p95: 18.8} },
            7: { M: {p5: 13.8, p85: 18, p95: 20}, F: {p5: 13.6, p85: 17.8, p95: 19.5} },
            8: { M: {p5: 14, p85: 19, p95: 21}, F: {p5: 13.8, p85: 18.5, p95: 20.5} },
            9: { M: {p5: 14.2, p85: 19.8, p95: 22}, F: {p5: 14, p85: 19.5, p95: 21.8} },
            10:{ M: {p5: 14.5, p85: 20.5, p95: 23}, F: {p5: 14.3, p85: 20.3, p95: 23} },
            11:{ M: {p5: 15, p85: 21.5, p95: 24}, F: {p5: 14.8, p85: 21.8, p95: 24.5} },
            12:{ M: {p5: 15.5, p85: 22.5, p95: 25}, F: {p5: 15.3, p85: 22.8, p95: 26} }
        };

        const referencia = tabelaOMS[idade]?.[sexo];

        if (!referencia) {
            classificacao = "Faixa etária fora da tabela infantil (6–12 anos)";
        } else {
            if (imc < referencia.p5) {
                classificacao = "Baixo peso (Percentil < 5)";
            } else if (imc < referencia.p85) {
                classificacao = "Peso adequado (Percentil 5–84)";
            } else if (imc < referencia.p95) {
                classificacao = "Sobrepeso (Percentil 85–94)";
            } else {
                classificacao = "Obesidade (Percentil ≥ 95)";
            }
        }

    } else {
        // 👨‍🦱 Classificação Adulto
        if (imc < 18.5) {
            classificacao = "Abaixo do peso";
        } else if (imc < 25) {
            classificacao = "Peso normal";
        } else if (imc < 30) {
            classificacao = "Sobrepeso";
        } else {
            classificacao = "Obesidade";
        }
    }

    // 💾 Salva aluno
    alunos.push({
        nome,
        serie,
        idade,
        sexo,
        peso,
        altura,
        imc: imcFormatado,
        classificacao
    });

    localStorage.setItem("alunos", JSON.stringify(alunos));

    // 🖥️ Exibe resultado
    resultadoDiv.innerHTML = `
        <h3>Resultado</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Série:</strong> ${serie}</p>
        <p><strong>Idade:</strong> ${idade}</p>
        <p><strong>Sexo:</strong> ${sexo === "M" ? "Masculino" : "Feminino"}</p>
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

// 📊 Exportar Excel (CSV unificado)
function exportarExcel() {

    if (alunos.length === 0) {
        alert("Nenhum aluno cadastrado para exportar.");
        return;
    }

    let csv = "Nome,Série,Idade,Sexo,Peso,Altura,IMC,Classificação\n";

    alunos.forEach(aluno => {
        csv += `${aluno.nome},${aluno.serie},${aluno.idade},${aluno.sexo},${aluno.peso},${aluno.altura},${aluno.imc},${aluno.classificacao}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "alunos_imc.csv";

    link.click();
}
