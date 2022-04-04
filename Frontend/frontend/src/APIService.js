import axios from 'axios';

export default class APIService {

    static post(url, form_data){

       
        return axios.post(url, form_data, {
                headers: {
                    'content-type': 'multipart/form-data', 
                }
                })


    }

    static get(url){

       
        return axios.get(url)
         


    }


    static patch(url,form_data){

        return  axios.patch(url, form_data, {
            headers: {
              'content-type': 'multipart/form-data',
          
            }
          })


        
    }

    static delete(url){

        return axios.delete(url)
    }





}