
import axios from "axios";

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params:{
        key: 'AIzaSyDSHdYZgZOwFIrVcuhukju5W2s54bqyxzw'
    }
})

export default authApi