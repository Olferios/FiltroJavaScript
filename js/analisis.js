const cargarFormularioAnalisis = () => {
    const formAnalisis = document.getElementById('containerAdn');
    const formResultados=document.getElementById('moduloResultados');
    const contciudadano=document.getElementById('formularioCiudadano');
    const inicial = document.getElementById('tituloRPincipal');

    //esconder demas
    contciudadano.style.display="none";
    formResultados.style.display="none";
    formAnalisis.style.display="block";
    inicial.style.display="none";
    
    //mostrar el de analisis
    
    formAnalisis.innerHTML = `
        <form class="formulario">
            <label for="codigoAnalisis">Codigo Adn:*</label>
            <input type="number" id="codigoAnalisis" required>

            <button type="button" onclick="mostrarResultadoAdn()">Analizar</button>
        </form>

    `;
    const volverButton=document.createElement('button');
    volverButton.textContent='Volver al inicio';
    volverButton.addEventListener('click',volverAnalizar);
    formAnalisis.appendChild(volverButton);
}
const calcularCoincidencia = (codigoADN1, codigoADN2) => {
    let coincidencias = 0;
    for (let i = 0; i < codigoADN1.length; i++) {
        if (codigoADN1[i] === codigoADN2[i]) {
            coincidencias++;
        }
    }
    return coincidencias;
}

const mostrarResultadoAdn = () => {
    const codigoAnalisis = document.getElementById('codigoAnalisis').value;

    const formAnalisis = document.getElementById('containerAdn');
    const formResultados=document.getElementById('moduloResultados');
    const contciudadano=document.getElementById('formularioCiudadano');
    const inicial = document.getElementById('tituloRPincipal');

    contciudadano.style.display="none";
    formResultados.style.display="block";
    formAnalisis.style.display="block";
    inicial.style.display="none";

    

    
    // Validar que el código ADN tenga exactamente 20 dígitos
    if (codigoAnalisis.length !== 20) {
        alert('El código ADN debe tener exactamente 20 dígitos.');
        return;
    }
    
    // Calcular las coincidencias
    const coincidencias = listaCiudadanosAdn.map(ciudadano => ({
        ciudadano,
        coincidencia: calcularCoincidencia(ciudadano.codigo_adn, codigoAnalisis)
    }));

    coincidencias.sort((a, b) => b.coincidencia - a.coincidencia);

    const cincoMayoresCoincidencias = coincidencias.slice(0, 5);

    const listaResultados = document.createElement('ul');

    cincoMayoresCoincidencias.forEach(({ ciudadano, coincidencia }) => {
        const porcentajeCoincidencia = (coincidencia / codigoAnalisis.length) * 100;

        // Crear un elemento de lista li para cada resultado
        const itemResultado = document.createElement('li');
        itemResultado.textContent = `Nombre: ${ciudadano.nombre_completo} - Código ADN: ${ciudadano.codigo_adn} - Coincidencia: ${coincidencia} (${porcentajeCoincidencia.toFixed(2)}%)`;

        // Agregar el elemento de lista li al ul
        listaResultados.appendChild(itemResultado);
    });

    // Obtener el div donde se mostrarán los resultados
    const divResultados = document.getElementById('moduloResultados');

    // Limpiar cualquier contenido previo en el div
    divResultados.innerHTML = '';

    // Agregar la lista de resultados al div
    divResultados.appendChild(listaResultados);
}


const volverAnalizar=()=>{
    const formAnalisis = document.getElementById('containerAdn');
    const formResultados=document.getElementById('moduloResultados');
    const contciudadano=document.getElementById('formularioCiudadano');
    const inicialI = document.getElementById('tituloRPincipal'); 

    //esconder demas
    contciudadano.style.display="none";
    formResultados.style.display="none";
    formAnalisis.style.display="none";
    inicialI.style.display="block";

}
