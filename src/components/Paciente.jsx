import swal from "sweetalert";

const Paciente = ({ paciente, setPaciente, eliminarPaciente }) => {

  const { nombre, propietario, correo, fecha, sintomas, id } = paciente;

  const handleEliminar = () => {
    
    swal({
      title: 'Deseas Eliminar el Paciente?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        eliminarPaciente(id)
        swal(
          'Eliminado!',
          'Su archivo ha sido eliminado.',
          'Exitosamente', {icon: "success"},
        )
      } else {
        swal("No se ha eliminado el paciente");
      }
    })
  }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold mb-3 text-gray-700 uppercase">Nombre:{' '}
          <span className="font-normal normalcase">{nombre}</span>
        </p>

        <p className="font-bold mb-3 text-gray-700 uppercase">Propietario:{' '}
          <span className="font-normal normalcase">{propietario}</span>
        </p>

        <p className="font-bold mb-3 text-gray-700">Correo:{' '}
          <span className="font-normal normalcase">{correo}</span>
        </p>

        <p className="font-bold mb-3 text-gray-700 uppercase">Fecha de Salida:{' '}
          <span className="font-normal normalcase">{fecha}</span>
        </p>

        <p className="font-bold mb-3 text-gray-700 uppercase">Síntomas:{' '}
          <span className="font-normal normalcase">{sintomas}</span>
        </p>
        <div className="flex justify-between mt-10">
          <button type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
          onClick={() => setPaciente(paciente)}>
            Editar
          </button>
          <button type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          onClick={handleEliminar}>
            Eliminar
          </button>
        </div>
      </div>
  )
}

export default Paciente;