import clientAxios from "../config/AxiosUrl"

const getInicioBanner = async () => {
    try {
        const response = await clientAxios.get('/iniciobanner/');
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const postInicioBanner = async (data) => {
    try {
        const response = await clientAxios.post('/iniciobanner/', data);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const patchInicioBanner = async (id) => {
    try {
        const response = await clientAxios.patch('/iniciobanner/'+id);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const deleteInicioBanner = async (id) => {
    try {
        const response = await clientAxios.delete('/iniciobanner/'+id);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}
const postPositionInicioBanner = async (data) => {
    try {
        const response = await clientAxios.post('/iniciobanner/position/', data);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

export{
    getInicioBanner,
    postInicioBanner,
    patchInicioBanner,
    deleteInicioBanner,
    postPositionInicioBanner
}