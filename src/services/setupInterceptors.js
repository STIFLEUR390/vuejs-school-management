import axiosInstance from './api'
import  TokenService from './token-service'

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + store.state.auth.user.access_token
            }
            return config;
        },
        (error) =>{
                return Promise.reject(error)
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== "/auth/login" && err.response) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        /*const rs = await axiosInstance.post("/auth/refresh", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        });*/
                        const rs = await axiosInstance.post("/auth/refresh");

                        const { accessToken } = rs.data;

                        store.dispatch('auth/refresh', accessToken);
                        TokenService.updateLocalAccessToken(accessToken);

                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }

            return Promise.reject(err);
        }
    );
};

export default setup;