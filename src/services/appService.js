import axios from 'axios';
export default class AppService {
    constructor() {
        this.api = axios.create({
            baseURL: `http://localhost:8080/`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });
    }
    validateUser(payload) {       
        return this.api.post('validate', payload);            
    };
}