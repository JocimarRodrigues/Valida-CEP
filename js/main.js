document.querySelector("#enviar").addEventListener("click", validaCep);

async function validaCep() {
  let mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";
  try {
    cep = document.getElementById("cep").value;
    let consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let consultaCepConvertida = await consultaCep.json();

    if (consultaCepConvertida.erro) {
      throw Error();
    }
    estado = consultaCepConvertida.uf;
    cidade = consultaCepConvertida.localidade;
    bairro = consultaCepConvertida.bairro;
    cep = consultaCepConvertida.cep;
    endereco = consultaCepConvertida.logradouro;

    console.log(consultaCepConvertida);

    principal.innerHTML = `
        <div id='resposta'>
        <table border="1">
        <tr class="tabela-superior">
        <td>Estado</td>
        <td>Cidade</td>
        <td>Logradouro</td>
        <td>Bairro</td>
        <td>CEP</td>
        </tr> 
        <tr class="tabela-inferior">
        <td>${estado}</td>
        <td>${cidade}</td>
        <td>${endereco}</td>
        <td>${bairro}</td>
        <td>${cep}</td>
        </tr>
        </table
        </div>
        `;
    principal.innerHTML += '<button id="btn-voltar">Voltar</button>';
    document
      .querySelector("#btn-voltar")
      .addEventListener("click", () => window.location.reload());
  } catch (erro) {
    mensagemErro.innerHTML = "<p>CEP Inválido. Tente novamente.</p>";
  }
}
