import clientAxios from "../config/AxiosUrl"

const login = async (data) => {
    try {
        const response = await clientAxios.post('/adminusuario/login',data);
        return response;
    } catch (error) {
        throw new Error(error.response || error.message);
    }
}

export {
    login
}