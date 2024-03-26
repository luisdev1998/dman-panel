import { useState, useRef, useEffect } from "react";
import InformacionComponent from "./InformacionComponent";
import {
  getInicioBanner,
  postInicioBanner,
  patchInicioBanner,
  deleteInicioBanner,
  postPositionInicioBanner,
} from "../../../../utils/api/InicioBanners";
import {
  getInicioTestimonio,
  postInicioTestimonio,
  patchInicioTestimonio,
  deleteInicioTestimonio,
  postPositionInicioTestimonio,
} from "../../../../utils/api/InicioTestimonios";
import Loading from "../../../common/Loading";
import Error from "../../../common/Error";
import { Tooltip } from "flowbite-react";

const Paginas = () => {
  const [banners, setBanners] = useState([]);
  const [testimonios, setTestimonios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState(null);

  const archivoBanner = useRef(null);
  const archivoTestimonio = useRef(null);

  useEffect(() => {
    cargarInicioBanner();
    cargarInicioTestimonio();
  }, []);

  const archivoClickBanner = () => {
    archivoBanner.current.click();
  };
  const archivoClickTestimonio = () => {
    archivoTestimonio.current.click();
  };

  const cargarInicioBanner = async () => {
    setLoading(true);
    try {
      const response = await getInicioBanner();
      if (response.data.success) {
        setBanners(response.data.info);
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };
  const cargarInicioTestimonio = async () => {
    setLoading(true);
    try {
      const response = await getInicioTestimonio();
      if (response.data.success) {
        setTestimonios(response.data.info);
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
      setTestimonios([]);
    } finally {
      setLoading(false);
    }
  };

  const guardarBanner = async (evento) => {
    const foto = evento.target.files[0];
    if (foto) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("archivo", foto);
        const response = await postInicioBanner(formData);
        if (response.data.success) {
          setError(null);
          await cargarInicioBanner();
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const eliminarInicioBanner = async (id) => {
    setLoading(true);
    try {
      const response = await deleteInicioBanner(id);
      if (response.data.success) {
        cargarInicioBanner();
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

  const estadoInicioBanner = async (id) => {
    setLoading(true);
    try {
      const response = await patchInicioBanner(id);
      if (response.data.success) {
        cargarInicioBanner();
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

  const guardarTestimonio = async (evento) => {
    const foto = evento.target.files[0];
    if (foto) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("archivo", foto);
        const response = await postInicioTestimonio(formData);
        if (response.data.success) {
          setError(null);
          await cargarInicioTestimonio();
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const eliminarInicioTestimonio = async (id) => {
    setLoading(true);
    try {
      const response = await deleteInicioTestimonio(id);
      if (response.data.success) {
        cargarInicioTestimonio();
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

  const estadoInicioTestimonio = async (id) => {
    setLoading(true);
    try {
      const response = await patchInicioTestimonio(id);
      if (response.data.success) {
        cargarInicioTestimonio();
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

  const handleDragStartBanner = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedItemId(id);
  };

  const handleDropBanner = async (e, targetId) => {
    e.preventDefault();
    setLoading(true);
    try {
      const draggedOverItemId = targetId;
      const draggedItemIndex = banners.find(
        (card) => card.id === draggedItemId
      );
      const targetItemIndex = banners.find(
        (card) => card.id === draggedOverItemId
      );

      if (draggedItemIndex.id !== targetItemIndex.id) {
        const response = await postPositionInicioBanner({
          dragid: draggedItemIndex.id,
          dropid: targetItemIndex.id,
        });
        if (response.data.success) {
          cargarInicioBanner();
          setError(null);
        } else {
          setError(response.data.message);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStartTestimonio = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedItemId(id);
  };

  const handleDropTestimonio = async (e, targetId) => {
    e.preventDefault();
    setLoading(true);
    try {
      const draggedOverItemId = targetId;
      const draggedItemIndex = testimonios.find(
        (card) => card.id === draggedItemId
      );
      const targetItemIndex = testimonios.find(
        (card) => card.id === draggedOverItemId
      );

      if (draggedItemIndex.id !== targetItemIndex.id) {
        const response = await postPositionInicioTestimonio({
          dragid: draggedItemIndex.id,
          dropid: targetItemIndex.id,
        });
        if (response.data.success) {
          cargarInicioTestimonio();
          setError(null);
        } else {
          setError(response.data.message);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <InformacionComponent></InformacionComponent>
      <div className="p-4 rounded bg-gray-50 dark:bg-gray-800">
        <div className="mb-5">
          <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-700 dark:text-gray-200">
            Banners de Inicio
          </span>
        </div>
        <Error error={error} clase="mb-5 text-xl"></Error>
        {loading ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {banners.map((card, index) => (
              <div
                key={card.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropBanner(e, card.id)}
                className="border border-gray-500 p-3"
              >
                <div className="mb-3">
                  <picture>
                    <source srcSet={card.ruta} type="image/webp" />
                    <img
                      draggable="false"
                      onDragStart={handleDragOver}
                      className="w-full h-64"
                      src={card.ruta}
                      loading="lazy"
                      alt=""
                    />
                  </picture>
                </div>
                <div className="text-gray-700 dark:text-gray-200 flex flex-row">
                  <div className="w-full">
                    <span>Estado: </span>
                    {card.estado == 1 ? (
                      <span className="text-green-500 font-bold">Activo</span>
                    ) : (
                      <span className="text-red-500 font-bold">Inactivo</span>
                    )}
                  </div>
                  <div className="flex row gap-2">
                    <Tooltip content="Eliminar">
                      <span
                        className="cursor-pointer"
                        onClick={() => eliminarInicioBanner(card.id)}
                      >
                        <i className="fa-solid fa-trash text-red-500"></i>
                      </span>
                    </Tooltip>
                    <Tooltip content="Cambiar estado">
                      <span
                        className="cursor-pointer"
                        onClick={() => estadoInicioBanner(card.id)}
                      >
                        <i className="fa-solid fa-eye text-gray-500"></i>
                      </span>
                    </Tooltip>
                    <Tooltip content="Arrastrar">
                      <span
                        className="cursor-pointer"
                        draggable="true"
                        onDragStart={(e) => handleDragStartBanner(e, card.id)}
                      >
                        <i className="fa-solid fa-arrows-up-down-left-right text-blue-500"></i>
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <input
                type="file"
                ref={archivoBanner}
                className="hidden"
                onChange={guardarBanner}
              />
              <div
                onClick={archivoClickBanner}
                className="border border-gray-500 p-3 text-gray-500 flex flex-col items-center justify-center cursor-pointer h-full"
              >
                <div>
                  <svg
                    className="w-full h-64"
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
                <div className="text-center">
                  <span className="font-bold text-lg">
                    Clic aquí para ingresar un nuevo banner
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 rounded bg-gray-50 dark:bg-gray-800">
        <div className="mb-5">
          <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-700 dark:text-gray-200">
            Testimonios de Inicio
          </span>
        </div>
        <Error error={error} clase="mb-5 text-xl"></Error>
        {loading ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {testimonios.map((card, index) => (
              <div
                key={card.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropTestimonio(e, card.id)}
                className="border border-gray-500 p-3"
              >
                <div className="mb-3">
                  {/* <picture>
                    <source srcSet={card.ruta} type="image/webp" />
                    <img
                      draggable="false"
                      onDragStart={handleDragOver}
                      className="w-full h-80"
                      src={card.ruta}
                      loading="lazy"
                      alt=""
                    />
                  </picture> */}
                  <video className="w-full h-80" controls>
                    <source src={card.ruta} type="video/mp4" />
                  </video>
                </div>
                <div className="text-gray-700 dark:text-gray-200 flex flex-row">
                  <div className="w-full">
                    <span>Estado: </span>
                    {card.estado == 1 ? (
                      <span className="text-green-500 font-bold">Activo</span>
                    ) : (
                      <span className="text-red-500 font-bold">Inactivo</span>
                    )}
                  </div>
                  <div className="flex row gap-2">
                    <Tooltip content="Eliminar">
                      <span
                        className="cursor-pointer"
                        onClick={() => eliminarInicioTestimonio(card.id)}
                      >
                        <i className="fa-solid fa-trash text-red-500"></i>
                      </span>
                    </Tooltip>
                    <Tooltip content="Cambiar estado">
                      <span
                        className="cursor-pointer"
                        onClick={() => estadoInicioTestimonio(card.id)}
                      >
                        <i className="fa-solid fa-eye text-gray-500"></i>
                      </span>
                    </Tooltip>
                    <Tooltip content="Arrastrar">
                      <span
                        className="cursor-pointer"
                        draggable="true"
                        onDragStart={(e) =>
                          handleDragStartTestimonio(e, card.id)
                        }
                      >
                        <i className="fa-solid fa-arrows-up-down-left-right text-blue-500"></i>
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <input
                type="file"
                ref={archivoTestimonio}
                className="hidden"
                onChange={guardarTestimonio}
              />
              <div
                onClick={archivoClickTestimonio}
                className="border border-gray-500 p-3 text-gray-500 flex flex-col items-center justify-center cursor-pointer h-full"
              >
                <div>
                  <svg
                    className="w-full h-64"
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
                <div className="text-center">
                  <span className="font-bold text-lg">
                    Clic aquí para ingresar un nuevo testimonio
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paginas;
