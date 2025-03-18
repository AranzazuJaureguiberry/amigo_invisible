document.addEventListener("DOMContentLoaded", () => {
    const inputNombre = document.getElementById("amigo");
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.style.display = "grid";
    listaAmigos.style.gridTemplateColumns = "repeat(auto-fill, minmax(150px, 1fr))";
    listaAmigos.style.gap = "10px";
    const resultado = document.getElementById("resultado");
    const contador = document.createElement("p");
    contador.id = "contadorAmigos";
    contador.style.fontSize = "1.4rem";
    contador.style.fontWeight = "bold";
    contador.style.color = "#2c3e50";
    contador.style.marginTop = "10px";
    listaAmigos.parentElement.insertBefore(contador, listaAmigos);
    let amigos = [];

    window.agregarAmigo = function () {
        let nombre = inputNombre.value.trim();
        
        if (!validarNombre(nombre)) {
            alert("Los valores ingresados no corresponden a un nombre");
            return;
        }

        nombre = formatearNombre(nombre);

        if (amigos.includes(nombre)) {
            alert("Este nombre ya ha sido ingresado");
            return;
        }

        amigos.push(nombre);
        actualizarLista();
        inputNombre.value = "";
        inputNombre.focus();
    };

    function validarNombre(nombre) {
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/.test(nombre);
    }

    function formatearNombre(nombre) {
        return nombre.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    }

    function actualizarLista() {
        listaAmigos.innerHTML = "";
        amigos.forEach((amigo, index) => {
            const li = document.createElement("li");
            li.textContent = amigo;
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";
            li.style.padding = "5px 10px";
            li.style.border = "1px solid #ddd";
            li.style.borderRadius = "5px";
            li.style.marginBottom = "5px";
            li.style.minWidth = "150px";
            
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "❌";
            btnEliminar.style.marginLeft = "10px";
            btnEliminar.style.border = "none";
            btnEliminar.style.color = "white";
            btnEliminar.style.padding = "3px 6px";
            btnEliminar.style.borderRadius = "50%";
            btnEliminar.style.cursor = "pointer";
            btnEliminar.style.fontSize = "0.7rem";
            btnEliminar.onclick = () => eliminarAmigo(index);
            
            li.appendChild(btnEliminar);
            listaAmigos.appendChild(li);
        });
        actualizarContador();
    }

    function actualizarContador() {
        contador.textContent = `Participantes: ${amigos.length}`;
    }

    function eliminarAmigo(index) {
        amigos.splice(index, 1);
        actualizarLista();
    }

    window.sortearAmigo = function () {
        if (amigos.length === 0) {
            alert("Debes añadir al menos un nombre antes de sortear.");
            return;
        }

        const indiceSorteado = Math.floor(Math.random() * amigos.length);
        const nombreSorteado = amigos[indiceSorteado];
        
        amigos = []; 
        listaAmigos.innerHTML = "";
        contador.textContent = "";
        resultado.innerHTML = `<p>El amigo invisible para ti es: <strong>${nombreSorteado}</strong></p>`;
    };

    inputNombre.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            agregarAmigo();
        }
    });
});
