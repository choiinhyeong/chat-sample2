import axios from "axios";
import VueAxios from "vue-axios";
import sessionStorageService from "@/assets/js/sessionstorage.service";
import {TOKEN_KEY} from "@/store/modules/auth/auth";

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
    vueInstance: null,
    init(app) {
        app.use(VueAxios, axios);
        this.vueInstance = app;
    },

    /**
     * Set the default HTTP request headers
     */
    query(resource, params) {
        return this.vueInstance.axios.get(resource, {params}).catch(error => {
            console.error(error);
        });
    },
    /**
     * Send the GET HTTP request
     * @param resource
     * @param slug
     * @returns {*}
     */
    get(resource, slug = "") {
        return this.vueInstance.axios.get(`${resource}/${slug}`).catch(error => {
            console.error(error);
        });
    },

    /**
     * Set the POST HTTP request
     * @param resource
     * @param params
     * @returns {*}
     */
    post(resource, params) {
        return this.vueInstance.axios.post(`${resource}`, params).catch(error => {
            console.error(error);
        });
    },
    /**
     * Send the UPDATE HTTP request
     * @param resource
     * @param slug
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    update(resource, slug, params) {
        return this.vueInstance.axios.put(`${resource}/${slug}`, params).catch(error => {
            console.error(error);
        });
    },
    /**
     * Send the PUT HTTP request
     * @param resource
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    put(resource, params) {
        return this.vueInstance.axios.put(`${resource}`, params).catch(error => {
            console.error(error);
        });
    },
    /**
     * Send the DELETE HTTP request
     * @param resource
     * @param slug
     * @returns {*}
     */
    delete(resource, slug) {
        return this.vueInstance.axios.delete(`${resource}/${slug}`).catch(error => {
            console.error(error);
        });
    },
    getFileFormData(fileList, isMulti) {
        const data = new FormData();
        if(isMulti){
            if(fileList && fileList.length > 0){
                for(let i = 0; i < fileList.length; i++){
                    data.append("uploadFiles", fileList[i]);
                }
            }
        }else{
            if(fileList && fileList.length > 0){
                data.append( 'uploadFile', fileList[0]);
            }
        }
        return data;
    },
    execXhr(resource, data, resolve, reject){
        const xhr = new XMLHttpRequest();
        // timeout 을 길게
        xhr.timeout = 10 * 60 * 1000;
        xhr.open("POST", `${resource}`, true);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader(TOKEN_KEY, sessionStorageService.getToken(TOKEN_KEY));
        xhr.responseType = 'json';

        xhr.addEventListener( 'load', () => {
            const response = xhr.response;
            // if (!response || response.error) {
            //     return reject(response && response.error ? response.error : 'Upload Failed');
            // }else{
                return resolve(response);
            // }
        });

        xhr.addEventListener('error', () => {
            return reject(xhr.response);
        });
        
        xhr.send(data);
    },
    upload(resource, fileList, isMulti){
        return new Promise((resolve, reject) => {
            const data = this.getFileFormData(fileList, isMulti);
            this.execXhr(resource, data, resolve, reject);
        });
    },
    download(resource, slug, params, fileName){
        const xhr = new XMLHttpRequest();
        let url = `${resource}/${slug}`;
        if(params !== null && params !== undefined){
            const keys = Object.keys(params);
            if(keys.length > 0){
                url += ('?'+ keys.map(key => `${key}=${params[key]}`).join('&'));
            }
        }

        xhr.open("GET", url, true);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader(TOKEN_KEY, sessionStorageService.getToken(TOKEN_KEY));
        xhr.responseType = "blob";
        xhr.onload =  () => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(xhr.response);
            link.download = fileName;
            link.click();
        };
        xhr.send();
    },
    parts(resource, fileList, params, isMulti) {
        return new Promise((resolve, reject) => {
            const data = this.getFileFormData(fileList, isMulti);
            data.append('params', new Blob([JSON.stringify(params)] , {type: "application/json"}));
            this.execXhr(resource, data, resolve, reject, data);
        });
    }
};

export default ApiService;
