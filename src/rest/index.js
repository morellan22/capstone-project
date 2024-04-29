
const baseURL = "http://localhost:4000/";
 const fetchData = async(url, myInit)=>{
    try {
         let response = await fetch(url, myInit);
        console.log(response);
         if(!response.ok)
            throw new Error(`Error fetching data: ${response.status}`);
        console.log(response)
        return  response.json();
    } catch (error) {
        console.error(error);
    }
 }


    export async function saveNewsApi(news,callback){
        console.log(news)
        const myInit = {
            method:'POST',
            mode: 'cors',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(news)
            };
        let data = {};
        try {
            data = await fetchData(baseURL + 'news', myInit);
        } catch (error) {
            console.error(error);
        }
        
        return callback(data);

    } 
