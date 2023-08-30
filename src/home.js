window.onload = function (e) {

    var usuarioGuid = localStorage.getItem("usuarioGuid");

    if (usuarioGuid == null) {
        window.location.href = "login.html";
    }
    else {
        obterUsuario(usuarioGuid);
    }

    var lnkSair = document.getElementById("lnkSair");

    lnkSair.onclick = function (e) {
        localStorage.removeItem("usuarioGuid");

        window.location.href = "login.html";
    }

    var menu = document.getElementById("menu");
    menu.onclick = function (e) {
        var x = document.getElementById("menu");
        if (x.className === "topnav") {
            x.className += "responsive";
        }
        else {
            x.className = "topnav";
        }
    }


    var logout = document.getElementById("logout");
    logout.onclick = function (e) {
        localStorage.removeItem("usuarioGuid");

        window.location.href = "login.html";
    }

    function obterUsuario(usuarioGuid) {

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    //sucesso

                    var spnMensagem = document.getElementById("spnMensagem");

                    spnMensagem.innerText = "Bem-vindo ao sistema " + result.nome + "!";

                    document.getElementById("spnMensagem").innerHTML = spnMensagem;

                }
                else {
                    window.location.href = "login.html";
                }             

            }
        });

        xhr.open("GET", "https://localhost:44359/api/usuario/obterUsuario?usuarioGuid=" + usuarioGuid);

        xhr.send();

    }

    

    

}