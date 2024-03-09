import { useEffect, useState, useRef } from "react";
import {
  getInformacion,
  patchInformacion,
  patchArchivos,
} from "../../../../utils/api/Informacion";
import Loading from "../../../common/Loading";
import Error from "../../../common/Error";

const InformacionComponent = () => {
  const [informacion, setInformacion] = useState({});

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [ubicacionUrl, setUbicacionUrl] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [emailRemitente, setEmailRemitente] = useState("");
  const [claveEmailRemitente, setClaveEmailRemitente] = useState("");
  const [emailReceptor, setEmailReceptor] = useState("");
  const [imagen1Archivo, setImagen1Archivo] = useState("");
  const [imagen2Archivo, setImagen2Archivo] = useState("");
  const [imagen3Archivo, setImagen3Archivo] = useState("");
  const [video1Archivo, setVideo1Archivo] = useState("");
  const [video2Archivo, setVideo2Archivo] = useState("");

  const imagen1ArchivoRef = useRef(null);
  const imagen2ArchivoRef = useRef(null);
  const imagen3ArchivoRef = useRef(null);
  const video1ArchivoRef = useRef(null);
  const video2ArchivoRef = useRef(null);

  useEffect(() => {
    cargarInformacion();
  }, []);
  useEffect(() => {
    if (informacion) {
      setNumero(informacion.numero || "");
      setEmail(informacion.email || "");
      setUbicacion(informacion.ubicacion || "");
      setUbicacionUrl(informacion.ubicacion_url || "");
      setFacebook(informacion.facebook || "");
      setYoutube(informacion.youtube || "");
      setInstagram(informacion.instagram || "");
      setTiktok(informacion.tiktok || "");
      setWhatsapp(informacion.whatsapp || "");
      setEmailRemitente(informacion.email_remitente || "");
      setClaveEmailRemitente(informacion.clave_email_remitente || "");
      setEmailReceptor(informacion.email_receptor || "");
    }
  }, [informacion]);

  const limpiarArchivos = () => {
    setImagen1Archivo("");
    setImagen2Archivo("");
    setImagen3Archivo("");
    setVideo1Archivo("");
    setVideo2Archivo("");
    if (imagen1ArchivoRef.current) {
      imagen1ArchivoRef.current.value = "";
    }
    if (imagen2ArchivoRef.current) {
      imagen2ArchivoRef.current.value = "";
    }
    if (imagen3ArchivoRef.current) {
      imagen3ArchivoRef.current.value = "";
    }
    if (video1ArchivoRef.current) {
      video1ArchivoRef.current.value = "";
    }
    if (video2ArchivoRef.current) {
      video2ArchivoRef.current.value = "";
    }
  };

  const cargarInformacion = async () => {
    setLoading(true);
    try {
      const response = await getInformacion();
      if (response.data.success) {
        setInformacion(response.data.info);
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
      setInformacion({});
    } finally {
      setLoading(false);
    }
  };

  const guardarInformacion = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError(null);
      const response = await patchInformacion({
        numero,
        email,
        ubicacion,
        ubicacionUrl,
        facebook,
        youtube,
        instagram,
        tiktok,
        whatsapp,
        emailRemitente,
        claveEmailRemitente,
        emailReceptor,
      });
      if (response.data.success) {
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

  const guardarArchivos = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError(null);
      const formData = new FormData();
      formData.append("imagen_1_archivo", imagen1Archivo);
      formData.append("imagen_2_archivo", imagen2Archivo);
      formData.append("imagen_3_archivo", imagen3Archivo);
      formData.append("video_1_archivo", video1Archivo);
      formData.append("video_2_archivo", video2Archivo);
      const response = await patchArchivos(formData);
      if (response.data.success) {
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      limpiarArchivos();
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded bg-gray-50 dark:bg-gray-800">
      <div className="mb-5">
        <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-700 dark:text-gray-200">
          Información
        </span>
      </div>
      <Error error={error} clase="text-xl mb-5"></Error>
      <div className="grid grid-cols-2 gap-5">
        <form onSubmit={guardarInformacion}>
          <div className="mb-5">
            <label
              htmlFor="numero"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Número Telefónico
            </label>
            <input
              onChange={(e) => setNumero(e.target.value)}
              required
              value={numero}
              type="text"
              id="numero"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Correo Electrónico
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
              type="text"
              id="email"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="ubicacion"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ubicación
            </label>
            <input
              onChange={(e) => setUbicacion(e.target.value)}
              required
              value={ubicacion}
              type="text"
              id="ubicacion"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="ubicacionUrl"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ubicación en Google Maps
            </label>
            <input
              onChange={(e) => setUbicacionUrl(e.target.value)}
              required
              value={ubicacionUrl}
              type="text"
              id="ubicacionUrl"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="facebook"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Facebook
            </label>
            <input
              onChange={(e) => setFacebook(e.target.value)}
              required
              value={facebook}
              type="text"
              id="facebook"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="youtube"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Youtube
            </label>
            <input
              onChange={(e) => setYoutube(e.target.value)}
              required
              value={youtube}
              type="text"
              id="youtube"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="instagram"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Instagram
            </label>
            <input
              onChange={(e) => setInstagram(e.target.value)}
              required
              value={instagram}
              type="text"
              id="instagram"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="tiktok"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tik Tok
            </label>
            <input
              onChange={(e) => setTiktok(e.target.value)}
              required
              value={tiktok}
              type="text"
              id="tiktok"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="whatsapp"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              WhatsApp Link
            </label>
            <input
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              value={whatsapp}
              type="text"
              id="whatsapp"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <div className="flex flex-row gap-5">
              <div className="w-full">
                <label
                  htmlFor="emailRemitente"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gmail Remitente (Gmail de aviso)
                </label>
                <input
                  onChange={(e) => setEmailRemitente(e.target.value)}
                  required
                  value={emailRemitente}
                  type="email"
                  id="emailRemitente"
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="claveEmailRemitente"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Clave Remitente (Gmail de aviso)
                </label>
                <input
                  onChange={(e) => setClaveEmailRemitente(e.target.value)}
                  required
                  value={claveEmailRemitente}
                  type="password"
                  id="claveEmailRemitente"
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="emailReceptor"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email Receptor
            </label>
            <input
              onChange={(e) => setEmailReceptor(e.target.value)}
              required
              value={emailReceptor}
              type="email"
              id="emailReceptor"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {loading ? (
            <Loading></Loading>
          ) : (
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Guardar Información
            </button>
          )}
        </form>
        <form onSubmit={guardarArchivos}>
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="imagenArchivo"
            >
              Imagen de Descuento
            </label>
            <input
              onChange={(e) => setImagen1Archivo(e.target.files[0])}
              ref={imagen1ArchivoRef}
              required={false}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="imagenArchivo"
              type="file"
            />
          </div>

          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="video1ArchivoRef"
            >
              Video Descuento
            </label>
            <input
              onChange={(e) => setVideo1Archivo(e.target.files[0])}
              ref={video1ArchivoRef}
              required={false}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="video1ArchivoRef"
              type="file"
            />
          </div>

          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="imagen2ArchivoRef"
            >
              Nuestro Equipo
            </label>
            <input
              onChange={(e) => setImagen2Archivo(e.target.files[0])}
              ref={imagen2ArchivoRef}
              required={false}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="imagen2ArchivoRef"
              type="file"
            />
          </div>

          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="imagen3ArchivoRef"
            >
              Banner "Constructora"
            </label>
            <input
              onChange={(e) => setImagen3Archivo(e.target.files[0])}
              ref={imagen3ArchivoRef}
              required={false}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="imagen3ArchivoRef"
              type="file"
            />
          </div>

          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="video2ArchivoRef"
            >
              Video "Constructora"
            </label>
            <input
              onChange={(e) => setVideo2Archivo(e.target.files[0])}
              ref={video2ArchivoRef}
              required={false}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="video2ArchivoRef"
              type="file"
            />
          </div>
          {loading ? (
            <Loading></Loading>
          ) : (
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Guardar Archivos
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default InformacionComponent;
