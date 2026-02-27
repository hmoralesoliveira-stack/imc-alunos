let alunos = [];

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
    const idade = document.getElementById("idade").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    const resultadoDiv = document.getElementById("resultado");
    const erroDiv = document.getElementById("erro");

    erroDiv.textContent = "";
    resultadoDiv.classList.add("hidden");

    if (!nome || !serie || !idade || isNaN(peso) || isNaN(altura)) {
        erroDiv.textContent = "⚠️ Todos os campos devem ser preenchidos corretamente.";
        return;
    }

    if (altura === 0) {
        erroDiv.textContent = "⚠️ Altura não pode ser zero.";
        return;
    }

    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(2);

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

    alunos.push({
        nome,
        serie,
        idade,
        peso,
        altura,
        imc: imcFormatado,
        classificacao
    });

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

function limparCampos() {
    document.getElementById("imcForm").reset();
    document.getElementById("resultado").classList.add("hidden");
    document.getElementById("erro").textContent = "";
}

function exportarExcel() {

    if (alunos.length === 0) {
        alert("Nenhum aluno cadastrado para exportar.");
        return;
    }

    let csv = "Nome,Série,Idade,Peso,Altura,IMC,Classificação\n";

    alunos.forEach(aluno => {
        csv += `${aluno.nome},${aluno.serie},${aluno.idade},${aluno.peso},${aluno.altura},${aluno.imc},${aluno.classificacao}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "alunos_imc.csv";

    link.click();
}
