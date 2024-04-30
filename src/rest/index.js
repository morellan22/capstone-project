
 export const fetchData = async(url, options)=>{
    try {
         let response = await fetch(url, options);
        console.log(response);
         if(!response.ok)
            throw new Error(`Error fetching data: ${response.status}`);
        console.log(response)
        return  response.json();
    } catch (error) {
        console.error(error);
    }
 }


 