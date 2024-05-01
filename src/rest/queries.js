import { fetchData } from ".";
import { exampleQuery } from "../data";

const urlQueries = "/queries";
export async function getQueryApi(currentUser,callback){
    console.log(urlQueries)
    let data = {};
    if(currentUser===null){
        data = exampleQuery;
    }
    else{
        const myInit = {
            method:'GET',
            mode: 'cors'
            };

        try {
            data = await fetchData(urlQueries, myInit);
        } catch (error) {
            console.error(error);
        }
        console.log("getQueryApi:%s", JSON.stringify(data))
     }
    return callback(data);

} 
export async function saveQueryApi(querySaved){
    console.log(querySaved)
    const myInit = {
        method:'POST',
        mode: 'cors',
        headers:{'Content-type':'application/json'},
        body: JSON.stringify(querySaved)
        };
    let data = {};
    try {
        data = await fetchData(urlQueries, myInit);
    } catch (error) {
        console.error(error);
    }
    console.log(data);
    console.log("savedQueries array has been persisted:");
    return true;

} 
