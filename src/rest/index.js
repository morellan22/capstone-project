
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
