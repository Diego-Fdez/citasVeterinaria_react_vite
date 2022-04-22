import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [correo, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.correo);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //validación del formulario
    if ([ nombre, propietario, correo, fecha, sintomas ].includes('')) {
      setError(true);
      return;
    }
    setError(false);

    //Objeto de Paciente
    const objetoPaciente = {
      nombre,
      propietario, 
      correo, 
      fecha, 
      sintomas,
    }

    if (paciente.id) {
      //Editando el Registro
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id ===
        paciente.id ? objetoPaciente : pacienteState);

        setPacientes(pacientesActualizados);
        setPaciente({});
    } else {
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    //Reiniciar el form
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimientos Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y {' '}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        { error && <Error mensaje='Todos los campos son requeridos' /> }
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input value={nombre} onChange={ (e) => setNombre(e.target.value) } type="text" placeholder="Nombre de la Mascota" id="mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input value={propietario} onChange={ (e) => setPropietario(e.target.value) } type="text" placeholder="Nombre del Propietario" id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Correo</label>
          <input value={correo} onChange={ (e) => setEmail(e.target.value) } type="email" placeholder="Escriba el Correo" id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Fecha de Salida</label>
          <input value={fecha} onChange={ (e) => setFecha(e.target.value) } type="date" id="alta" className="border-2 w-full p-2 mt-2 rounded-md" />
        </div>
        <div className="mb-5">
        <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>
          <textarea value={sintomas} onChange={ (e) => setSintomas(e.target.value) } name="" id="sintomas" cols="30" rows="10" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" ></textarea>
        </div>
        <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" value = { paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} />
      </form>
    </div>
  );
}

export default Formulario;