import clientAxios from "../config/AxiosUrl"

const getProyecto = async () => {
    try {
        const response = await clientAxios.get('/proyecto/');
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const createProyecto = async (data) => {
    try {
        const response = await clientAxios.post('/proyecto/', data);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const cambioEstadoProyecto = async (id) => {
    try {
        const response = await clientAxios.patch('/proyecto/'+id);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const patchProyecto = async (id,data) => {
    try {
        const response = await clientAxios.patch('/proyecto/actualizar/'+id,data);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const deleteProyecto = async (id) => {
    try {
        const response = await clientAxios.delete('/proyecto/'+id);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const getProyectoById = async (id) => {
    try {
        const response = await clientAxios.get('/proyecto/'+id);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const createBeneficio = async (id,data) => {
    try {
        const response = await clientAxios.post('/proyecto/'+id+"/beneficio",data);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const createConocenos = async (id,data) => {
    try {
        const response = await clientAxios.post('/proyecto/'+id+"/conocenos",data);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const estadoBeneficio = async (idProyecto,id) => {
    try {
        const response = await clientAxios.patch('/proyecto/'+idProyecto+"/beneficio/"+id);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const deleteBeneficio = async (idProyecto,id) => {
    try {
        const response = await clientAxios.delete('/proyecto/'+idProyecto+"/beneficio/"+id);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const estadoConocenos = async (idProyecto,id) => {
    try {
        const response = await clientAxios.patch('/proyecto/'+idProyecto+"/conocenos/"+id);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

const deleteConocenos = async (idProyecto,id) => {
    try {
        const response = await clientAxios.delete('/proyecto/'+idProyecto+"/conocenos/"+id);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}
const patchPositionConocenos = async (idProyecto,data) => {
    try {
        const response = await clientAxios.patch('/proyecto/'+idProyecto+"/conocenos/",data);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

export{
    getProyecto, 
    createProyecto, 
    cambioEstadoProyecto,
    patchProyecto,
    deleteProyecto, 
    getProyectoById,
    createBeneficio,
    createConocenos,
    estadoBeneficio,
    deleteBeneficio,
    estadoConocenos,
    deleteConocenos,
    patchPositionConocenos
}