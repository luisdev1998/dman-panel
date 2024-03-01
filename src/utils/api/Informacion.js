import clientAxios from "../config/AxiosUrl"

const getInformacion = async () => {
    try {
        const response = await clientAxios.get('/informacion/');
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const patchInformacion = async (data) => {
    try {
        const response = await clientAxios.patch('/informacion/', data);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const patchArchivos = async (data) => {
    try {
        const response = await clientAxios.patch('/informacion/archivos/', data);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

export{
    getInformacion,
    patchInformacion,
    patchArchivos
}