import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Loading from "../../common/Loading";
import Error from "../../common/Error";
import {
  getProyecto,
  createProyecto,
  patchProyecto,
  deleteProyecto,
} from "../../../utils/api/Proyecto";

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [estadoDescripcion, setEstadoDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [metrajes, setMetrajes] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [mapaUrl, setMapaUrl] = useState("");
  const [imagenArchivo, setImagenArchivo] = useState("");
  const [bannerArchivo, setBannerArchivo] = useState("");
  const [referenciaArchivo, setReferenciaArchivo] = useState("");

  const imagenArchivoRef = useRef(null);
  const bannerArchivoRef = useRef(null);
  const referenciaArchivoRef = useRef(null);

  useEffect(() => {
    cargarProyectos();
  }, []);

  const limpiarArchivo = () => {
    setTitulo("");
    setEstadoDescripcion("");
    setDireccion("");
    setMetrajes("");
    setDescripcion("");
    setVideoUrl("");
    setMapaUrl("");
    setImagenArchivo("");
    setBannerArchivo("");
    setReferenciaArchivo("");
    if (imagenArchivoRef.current) {
      imagenArchivoRef.current.value = "";
    }
    if (bannerArchivoRef.current) {
      bannerArchivoRef.current.value = "";
    }
    if (referenciaArchivoRef.current) {
      referenciaArchivoRef.current.value = "";
    }
  };

  const cargarProyectos = async () => {
    setLoading(true);
    try {
      const response = await getProyecto();
      if (response.data.success) {
        setProyectos(response.data.info);
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
      setProyectos([]);
    } finally {
      setLoading(false);
    }
  };

  const guardarProyecto = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError(null);
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("estado_descripcion", estadoDescripcion);
      formData.append("direccion", direccion);
      formData.append("metrajes", metrajes);
      formData.append("descripcion", descripcion);
      formData.append("video_url", videoUrl);
      formData.append("mapa_url", mapaUrl);
      formData.append("imagen_archivo", imagenArchivo);
      formData.append("banner_archivo", bannerArchivo);
      formData.append("referencia_archivo", referenciaArchivo);
      const response = await createProyecto(formData);
      if (response.data.success) {
        cargarProyectos();
        setError(null);
        limpiarArchivo();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarProyecto = async (id) => {
    setLoading(true);
    try {
      const response = await deleteProyecto(id);
      if (response.data.success) {
        cargarProyectos();
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const estadoProyecto = async (id) => {
    setLoading(true);
    try {
      const response = await patchProyecto(id);
      if (response.data.success) {
        cargarProyectos();
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="p-4 rounded bg-gray-50 dark:bg-gray-800">
        <div className="mb-5">
          <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-700 dark:text-gray-200">
            Registra tu Proyecto
          </span>
        </div>
        <form onSubmit={guardarProyecto}>
          <div className="mb-5">
            <label
              htmlFor="titulo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Titulo
            </label>
            <input
              onChange={(e) => setTitulo(e.target.value)}
              required
              value={titulo}
              type="text"
              id="titulo"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="estadoDescripcion"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Estado
            </label>
            <input
              onChange={(e) => setEstadoDescripcion(e.target.value)}
              required
              value={estadoDescripcion}
              type="text"
              id="estadoDescripcion"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="direccion"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Dirección
            </label>
            <input
              onChange={(e) => setDireccion(e.target.value)}
              required
              value={direccion}
              type="text"
              id="direccion"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="metrajes"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Metrajes
            </label>
            <input
              onChange={(e) => setMetrajes(e.target.value)}
              required
              value={metrajes}
              type="text"
              id="metrajes"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="descripcion"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Descripción del Proyecto
            </label>
            <textarea
              onChange={(e) => setDescripcion(e.target.value)}
              required
              value={descripcion}
              id="descripcion"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Describe el proyecto..."
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="videoUrl"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Video URL
            </label>
            <input
              onChange={(e) => setVideoUrl(e.target.value)}
              required
              value={videoUrl}
              type="text"
              id="videoUrl"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="mapaUrl"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mapa URL
            </label>
            <input
              onChange={(e) => setMapaUrl(e.target.value)}
              required
              value={mapaUrl}
              type="text"
              id="mapaUrl"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="imagenArchivo"
            >
              Imagen Presentación
            </label>
            <input
              onChange={(e) => setImagenArchivo(e.target.files[0])}
              ref={imagenArchivoRef}
              required
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="imagenArchivo"
              type="file"
            />
          </div>
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="bannerArchivo"
            >
              Banner
            </label>
            <input
              onChange={(e) => setBannerArchivo(e.target.files[0])}
              ref={bannerArchivoRef}
              required
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="bannerArchivo"
              type="file"
            />
          </div>
          <div className="mb-8">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="referenciaArchivo"
            >
              Mapa de Referencia
            </label>
            <input
              onChange={(e) => setReferenciaArchivo(e.target.files[0])}
              required
              ref={referenciaArchivoRef}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="referenciaArchivo"
              type="file"
            />
          </div>
          <div className="flex justify-end">
            {loading ? (
              <Loading></Loading>
            ) : (
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Crear Proyecto
              </button>
            )}
          </div>
          <Error error={error} clase="text-xl"></Error>
        </form>
      </div>
      <div className="p-4 rounded bg-gray-50 dark:bg-gray-800 col-span-2">
        <div className="mb-5">
          <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-700 dark:text-gray-200">
            Lista de Proyectos
          </span>
        </div>
        {loading ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-4 ">
            {proyectos.map((proyecto, index) => (
              <div
                key={proyecto.id}
                className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <picture>
                    <source
                      srcSet={proyecto.imagen_archivo}
                      type="image/webp"
                    />
                    <img
                      className="rounded-t-lg w-full h-80"
                      src={proyecto.imagen_archivo}
                      loading="lazy"
                      alt=""
                    />
                  </picture>
                </a>
                <div className="p-5">
                  <div className="h-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words">
                      {proyecto.titulo}
                    </h5>
                  </div>
                  <div className="flex flex-row">
                    <NavLink
                      to={"/proyectos/" + proyecto.id}
                      className="mt-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Editar
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </NavLink>
                    <div className="w-full flex justify-end">
                      {proyecto.estado == 1 ? (
                        <div
                          onClick={() => estadoProyecto(proyecto.id)}
                          className="cursor-pointer mt-5 mr-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg"
                        >
                          <span className="text-white">Activo</span>
                        </div>
                      ) : (
                        <div
                          onClick={() => estadoProyecto(proyecto.id)}
                          className="cursor-pointer mt-5 mr-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg"
                        >
                          <span className="text-white">Inactivo</span>
                        </div>
                      )}
                      <div
                        onClick={() => eliminarProyecto(proyecto.id)}
                        className="cursor-pointer mt-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg"
                      >
                        <i className="fa fa-trash"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Proyectos;
