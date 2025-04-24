
function logar() {
 let InputEmail = document.getElementById("e-mail");
 let InputSenha = document.getElementById("senha");

 let email = InputEmail.value;
 let senha = InputSenha.value;

if(senha.length < 8 && senha.length > 0) {
    console.log("A senha precisa de pelo menos 8 caracteres"); 
} else if(senha.length == 0) {
    console.log("Digite sua senha")
} else {
    console.log("Logado")
}


}