import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import Error from "../../common/Error";
import {
  getProyectoById,
  createBeneficio,
  createConocenos,
  estadoBeneficio,
  deleteBeneficio,
  estadoConocenos,
  deleteConocenos,
} from "../../../utils/api/Proyecto";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "flowbite-react";

const ProyectoEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [proyecto, setProyecto] = useState([]);
  const [beneficios, setBeneficios] = useState([]);
  const [conocenos, setConocenos] = useState([]);

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

  const [nuevoBeneficioLogo, setNuevoBeneficioLogo] = useState("");
  const [nuevoBeneficioDescripcion, setNuevoBeneficioDescripcion] =
    useState("");
  const [nuevoConocenosArchivo, setNuevoConocenosArchivo] = useState("");
  const [nuevoConocenosDescripcion, setNuevoConocenosDescripcion] =
    useState("");

  const imagenArchivoRef = useRef(null);
  const bannerArchivoRef = useRef(null);
  const referenciaArchivoRef = useRef(null);

  useEffect(() => {
    cargarProyecto(id);
  }, []);

  useEffect(() => {
    if (proyecto) {
      setTitulo(proyecto.titulo || "");
      setEstadoDescripcion(proyecto.estado_descripcion || "");
      setDireccion(proyecto.direccion || "");
      setMetrajes(proyecto.metrajes || "");
      setDescripcion(proyecto.descripcion || "");
      setVideoUrl(proyecto.video_url || "");
      setMapaUrl(proyecto.mapa_url || "");
      setImagenArchivo(proyecto.imagen_archivo || "");
      setBannerArchivo(proyecto.banner_archivo || "");
      setReferenciaArchivo(proyecto.referencia_archivo || "");
      setBeneficios(proyecto.PROYECTOS_BENEFICIOs || []);
      setConocenos(proyecto.PROYECTOS_CONOCENOs || []);
    }
  }, [proyecto]);

  const cargarProyecto = async (id) => {
    setLoading(true);
    try {
      const response = await getProyectoById(id);
      if (response.data.success) {
        setProyecto(response.data.info);
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
      setProyecto([]);
    } finally {
      setLoading(false);
    }
  };

  const guardarBeneficio = async (e, id, data) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createBeneficio(id, {
        logo: data.nuevoBeneficioLogo,
        descripcion: data.nuevoBeneficioDescripcion,
      });
      if (response.data.success) {
        await cargarProyecto(id);
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
      setProyecto([]);
    } finally {
      setLoading(false);
    }
  };
  const guardarConocenos = async (e, id, data) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("imagen_archivo", data.nuevoConocenosArchivo);
      formData.append("descripcion", data.nuevoConocenosDescripcion);
      const response = await createConocenos(id, formData);
      if (response.data.success) {
        await cargarProyecto(id);
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
      setProyecto([]);
    } finally {
      setLoading(false);
    }
  };

  const eliminarBeneficio = async (idProyecto, id) => {
    setLoading(true);
    try {
      const response = await deleteBeneficio(idProyecto, id);
      if (response.data.success) {
        cargarProyecto(idProyecto);
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

  const cambiarEstadoBeneficio = async (idProyecto, id) => {
    setLoading(true);
    try {
      const response = await estadoBeneficio(idProyecto, id);
      if (response.data.success) {
        cargarProyecto(idProyecto);
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

  const eliminarConocenos = async (idProyecto, id) => {
    setLoading(true);
    try {
      const response = await deleteConocenos(idProyecto, id);
      if (response.data.success) {
        cargarProyecto(idProyecto);
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

  const cambiarEstadoConocenos = async (idProyecto, id) => {
    setLoading(true);
    try {
      const response = await estadoConocenos(idProyecto, id);
      if (response.data.success) {
        cargarProyecto(idProyecto);
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
    <div className="grid grid-cols-1  lg:grid-cols-3 lg:gap-4">
      <div className="p-4 rounded bg-gray-50 dark:bg-gray-800">
        <div className="mb-5">
          <button
            onClick={() => navigate(-1)}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            <i className="fa-solid fa-caret-left"></i> Regresar
          </button>
        </div>
        <div className="mb-5">
          <label className="self-center text-xl font-bold sm:text-2xl text-gray-700 dark:text-gray-200 break-words">
            {loading ? <Loading></Loading> : titulo}
          </label>
        </div>
        <form onSubmit={() => {}}>
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
                Actualizar
              </button>
            )}
          </div>
          <Error error={error} clase="text-xl"></Error>
        </form>
      </div>
      <div className="grid grid-cols-1 gap-4 col-span-2">
        <div className="p-4 rounded bg-gray-50 dark:bg-gray-800 col-span-2"></div>
        <div className="p-4 rounded bg-gray-50 dark:bg-gray-800 col-span-2">
          <div className="mb-5">
            <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-700 dark:text-gray-200">
              Lista de "Beneficios"
            </span>
          </div>
          {loading ? (
            <Loading></Loading>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-5">
              {beneficios.map((beneficio, index) => (
                <div
                  key={beneficio.id}
                  className="bg-white p-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-red-500 text-center flex flex-col gap-3"
                >
                  <i className={"text-6xl fa fa-" + beneficio.logo}></i>
                  <span className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {beneficio.descripcion}
                  </span>
                  <div className="flex flex-row">
                    <div className="w-full text-start">
                      {beneficio.estado == 1 ? (
                        <div className="font-medium text-sm">
                          <span className="text-green-500">Activo</span>
                        </div>
                      ) : (
                        <div className="font-medium text-sm">
                          <span className="text-red-500">Inactivo</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row gap-2">
                      <Tooltip content="Cambiar estado">
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            cambiarEstadoBeneficio(id, beneficio.id)
                          }
                        >
                          <i className="fa-solid fa-eye text-gray-500"></i>
                        </span>
                      </Tooltip>
                      <Tooltip content="Eliminar">
                        <span
                          className="cursor-pointer"
                          onClick={() => eliminarBeneficio(id, beneficio.id)}
                        >
                          <i className="fa-solid fa-trash text-red-500"></i>
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))}
              <form
                onSubmit={(e) => {
                  guardarBeneficio(e, id, {
                    nuevoBeneficioLogo,
                    nuevoBeneficioDescripcion,
                  });
                }}
                className="bg-white p-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-red-500 text-center flex flex-row gap-2"
              >
                <div className="w-full">
                  <div className="mb-3">
                    <input
                      onChange={(e) => setNuevoBeneficioLogo(e.target.value)}
                      required
                      type="text"
                      placeholder="Logo..."
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      onChange={(e) =>
                        setNuevoBeneficioDescripcion(e.target.value)
                      }
                      required
                      type="text"
                      placeholder="Descripción..."
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="text-white text-xs bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <i className="fa fa-add"></i>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="p-4 rounded bg-gray-50 dark:bg-gray-800 col-span-2">
          <div className="mb-5">
            <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-700 dark:text-gray-200">
              Lista de "Conócenos"
            </span>
          </div>
          {loading ? (
            <Loading></Loading>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
              {conocenos.map((conoceno, index) => (
                <div
                  key={conoceno.id}
                  className="bg-white p-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-red-500 text-center flex flex-col gap-3"
                >
                  <div>
                    <picture>
                      <source
                        srcSet={conoceno.imagen_archivo}
                        type="image/webp"
                      />
                      <img
                        className="w-full h-64"
                        src={conoceno.imagen_archivo}
                        loading="lazy"
                        alt=""
                      />
                    </picture>
                  </div>
                  <div>
                    <span className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {conoceno.descripcion}
                    </span>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-full text-start">
                      {conoceno.estado == 1 ? (
                        <div className="font-medium text-sm">
                          <span className="text-green-500">Activo</span>
                        </div>
                      ) : (
                        <div className="font-medium text-sm">
                          <span className="text-red-500">Inactivo</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row gap-2">
                      <Tooltip content="Cambiar estado">
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            cambiarEstadoConocenos(id, conoceno.id)
                          }
                        >
                          <i className="fa-solid fa-eye text-gray-500"></i>
                        </span>
                      </Tooltip>
                      <Tooltip content="Eliminar">
                        <span
                          className="cursor-pointer"
                          onClick={() => eliminarConocenos(id, conoceno.id)}
                        >
                          <i className="fa-solid fa-trash text-red-500"></i>
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))}
              <form
                onSubmit={(e) =>
                  guardarConocenos(e, id, {
                    nuevoConocenosArchivo,
                    nuevoConocenosDescripcion,
                  })
                }
              >
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-gray-500 text-center">
                  <div>
                    <svg
                      className="w-full h-48"
                      fill="currentColor"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 487 487"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g>
                          <path
                            d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z
                  M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9
                  v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z
                  M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z
                  M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="flex flex-row gap-2">
                    <div className="w-full">
                      <input
                        onChange={(e) =>
                          setNuevoConocenosArchivo(e.target.files[0])
                        }
                        required
                        className="mb-3 block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="imagenArchivo"
                        type="file"
                      />
                      <input
                        onChange={(e) =>
                          setNuevoConocenosDescripcion(e.target.value)
                        }
                        required
                        type="text"
                        placeholder="Descripción..."
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="text-white text-xs bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        <i className="fa fa-add"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProyectoEditar;
