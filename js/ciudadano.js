const listaCiudadanosAdn=[];

const cargarCiudadano=async()=>{
    try{
        const respuesta=await fetch("http://localhost:3000/ciudadanos");

        if(!respuesta.ok){
            throw new Error('Error al cargar ciudadano');
        }
        const ciudadano=await respuesta.json();
        listaCiudadanosAdn.push(...ciudadano);
    }catch(error){
        console.error('Error al cargar ciudadano',error.message);
    }
}

const guardarCiudadano=async(nuevoCiudadano)=>{
    try{

        const respuesta=await fetch('http://localhost:3000/ciudadanos',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(nuevoCiudadano),
        });

        if(!respuesta.ok){
           throw new Error('Error al crear el ciudadano. Estado: ',respuesta.status);
        }
        const ciudadanoCreado=await respuesta.json();
       
        
        console.log('Ciudadano creado:', ciudadanoCreado);

    }catch(error){
        console.error("Error al cargar ciudadano",error.message);
    }
}

const cargarFormularioCiudadano = () => {
    const formAnalisis = document.getElementById('containerAdn');
    const formResultados=document.getElementById('moduloResultados');
    //const contciudadano=document.getElementById('formularioCiudadano');
    const inicial = document.getElementById('tituloRPincipal');
    const formCiudadano = document.getElementById('formularioCiudadano');

    //hide demas archivos
    formAnalisis.style.display = 'none';
    formResultados.style.display = 'none';
    inicial.style.display = 'none';
    formCiudadano.style.display='block';

    formCiudadano.innerHTML = `
        

    <form class="formulario">
    <h2>Registro de Ciudadano</h2>

    <label for="nombreCiudadano">Nombre:*</label>
    <input type="text" id="nombreCiudadano" placeholder="Nombres y Apellidos" required>

    <label for="codigoAdn">Código ADN:*</label>
    <input type="text" id="codigoAdn" maxlength="20" placeholder="Ingrese código ADN" required>

    <label for="celular">Teléfono celular:* </label>
    <input type="number" id="celular" placeholder="Ingrese celular" required>

    <label for="direccion">Dirección:*</label>
    <input type="text" id="direccion" placeholder="Ingrese dirección*" required>

    <button type="button" onclick="crearCiudadano()">Guardar</button>
</form>

    `;
}

const validarCamposMatricula = () => {
    const valiCiudadano = document.getElementById('nombreCiudadano').value;
    const validAdn = document.getElementById('codigoAdn').value;
    const valiCel = document.getElementById('celular').value;
    const valiDireccion = document.getElementById('direccion').value;
    
    if (!valiCiudadano || !validAdn || !valiCel || !valiDireccion) {
        alert('Debe llenar todos los campos requeridos');
        console.log('Validación de campos fallida');
        return false;
    }
    
    const verificacionCiudadanoAdn = listaCiudadanosAdn.find((ciudadano) => ciudadano.codigo_adn === validAdn);

    if (verificacionCiudadanoAdn) {
        alert('Lo siento, ya hay un ciudadano con el mismo código ADN');
        return false;
    }
    
    return true; // Retorna true si todos los campos están llenos y no hay un ciudadano con el mismo código ADN
}




const crearCiudadano = async () => {
    if (!validarCamposMatricula()) {
        return; // Si la validación de campos falla, detener la ejecución
    }

    const inputNombreCiudadano = document.getElementById('nombreCiudadano').value;
    const inputCodigoAdn = document.getElementById('codigoAdn').value;
    const inputCelular = document.getElementById('celular').value;
    const inputDireccionCiudadano = document.getElementById('direccion').value;

    

    const nuevoCiudadano = {
        nombre_completo: inputNombreCiudadano,
        direccion: inputDireccionCiudadano,
        celular: inputCelular,
        codigo_adn: inputCodigoAdn
    }

    await guardarCiudadano(nuevoCiudadano);
    alert('Ciudadano creado con éxito');
    return nuevoCiudadano;
}
