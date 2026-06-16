// Aguarda o documento HTML carregar completamente
document.addEventListener("DOMContentLoaded", function() {
    
    // Captura o formulário pelo ID
    const formulario = document.getElementById("meuFormulario");

    // Adiciona um evento de "escuta" para quando o botão enviar for clicado
    formulario.addEventListener("submit", function(evento) {
        // Previne o comportamento padrão (que seria recarregar a página)
        evento.preventDefault();

        // Captura o valor que foi digitado no campo "nome"
        const nomeUsuario = document.getElementById("nome").value;

        // Exibe um alerta de boas-vindas customizado com o nome
        alert("Olá, " + nomeUsuario + "! Suas informações foram registradas com sucesso.");
        
        // Limpa os campos do formulário após o envio
        formulario.reset();
    });
});