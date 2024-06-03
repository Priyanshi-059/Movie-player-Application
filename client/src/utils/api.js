import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/movie/157336?api_key=186b04cb42f0f1f5749604bd660f9913&append_to_response=videos,images";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const headers = {
    Authorization:"bearer" + TMDB_TOKEN,
}

export const fetchDataFromApi = async(url,params)=>{
    try {
        const {data} = await axios.get(BASE_URL+url,{
            headers,
            params
        });

    } catch (err) {
        console.log(err);
        return err;
    }
}