export function QueryForm(params) {

    const handleChange = (event) => {
        let newQueryObject = { ...params.formObject };
        newQueryObject[event.target.name] = event.target.value;
        params.setFormObject(newQueryObject);
    };
    function currentUserIsAdmin(){
        if(params.currentUser){
        if(params.currentUser.user){
        if(params.currentUser.user === "admin"){
        return true;
        }
        }
        }
        return false;
       }
       
    function onSubmitClick(event) {
        event.preventDefault();
        if (!params.formObject.queryName) {
            alert("please provide a name for the query!");
            return;
        }
        if (!params.formObject.q || params.formObject.q.length === 0) {
            alert("please provide some text for the query field!");
            return;
        }
        params.submitToParent(params.formObject);
    };

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="queryName">Query Name: </label>
                    <input type="text" size={10} id="queryName" name="queryName" placeholder={params.formObject.queryName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="q">Query Text: </label>
                    <input type="text" size={10} id="q" name="q" placeholder={params.formObject.q} onChange={handleChange} />
                </div>
                <span style={{ display: "block", backgroundColor: "#eee" }}>
                    <input type="button" value="Submit" onClick={onSubmitClick} />
                </span>                
            </form>
            <div className={(currentUserIsAdmin())?"visible":"hidden"} 
                style={{border: "solid black 1px"}}>
                {/* Extra fields */}
                <p>extra admin stuff</p>
            </div>
        </div>

    );

}