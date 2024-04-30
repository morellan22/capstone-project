
const baseURL = "http://localhost:4000";
 const fetchData = async(url, options)=>{
    try {
         let response = await fetch(baseURL + url, options);
        console.log(response);
         if(!response.ok)
            throw new Error(`Error fetching data: ${response.status}`);
        console.log(response)
        return  response.json();
    } catch (error) {
        console.error(error);
    }
 }


    export async function saveNewsApi(urlNews,news,callback){
        console.log(news)
        const myInit = {
            method:'POST',
            mode: 'cors',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(news)
            };
        let data = {};
        try {
            data = await fetchData(urlNews, myInit);
        } catch (error) {
            console.error(error);
        }
        
        return callback(data);

    } 
    export async function getQueryApi(urlQuery,callback){
        console.log(urlQuery)
        const myInit = {
            method:'GET',
            mode: 'cors'
            };
        let data = {};
        try {
            data = await fetchData(urlQuery, myInit);
        } catch (error) {
            console.error(error);
        }
        
        return callback(data);

    } 
    export async function saveQueryApi(urlQuery,querySaved){
        console.log(querySaved)
        const myInit = {
            method:'POST',
            mode: 'cors',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(querySaved)
            };
        let data = {};
        try {
            data = await fetchData(urlQuery, myInit);
        } catch (error) {
            console.error(error);
        }
        console.log(data);
        console.log("savedQueries array has been persisted:");
        return true;

    } 
