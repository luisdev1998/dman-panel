import clientAxios from "../config/AxiosUrl"

const getInicioTestimonio = async () => {
    try {
        const response = await clientAxios.get('/iniciotestimonio/');
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const postInicioTestimonio = async (data) => {
    try {
        const response = await clientAxios.post('/iniciotestimonio/', data);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const patchInicioTestimonio = async (id) => {
    try {
        const response = await clientAxios.patch('/iniciotestimonio/'+id);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const deleteInicioTestimonio = async (id) => {
    try {
        const response = await clientAxios.delete('/iniciotestimonio/'+id);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}
const postPositionInicioTestimonio = async (data) => {
    try {
        const response = await clientAxios.post('/iniciotestimonio/position/', data);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

export{
    getInicioTestimonio,
    postInicioTestimonio,
    patchInicioTestimonio,
    deleteInicioTestimonio,
    postPositionInicioTestimonio
}