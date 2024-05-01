
import { QueryForm } from './components/QueryForm';
import { Articles } from './components/Articles';
import { useState, useEffect } from 'react';
import { exampleQuery ,exampleData } from './data';
import { SavedQueries } from './components/SavedQueries';
import { LoginForm } from './components/LoginForm';
import { getQueryApi, saveQueryApi } from './rest/queries';
import { saveNewsApi } from './rest/news';
import { loginApi } from './rest/login';



export function NewsReader() {
  const [query, setQuery] = useState(exampleQuery); // latest query send to newsapi
  const [data, setData] = useState(exampleData);   // current data returned from newsapi
  const [queryFormObject, setQueryFormObject] = useState({ ...exampleQuery });
  const [savedQueries, setSavedQueries] = useState([{ ...exampleQuery }]);
  const [currentUser, setCurrentUser] = useState(null);
  const [credentials, setCredentials] = useState({ user: "", password: "" });

  useEffect(() => {
    getNews(query);
  }, [query])
  useEffect(() => {getQueryApi(currentUser,setSavedQueries);}, [currentUser])

  function currentUserMatches(user) {
      return ((currentUser) && (currentUser.user)&&(currentUser.user === user));
    }
  function onFormSubmit(queryObject) {
    if (currentUser === null){
      alert("Log in if you want to create new queries!")
      return; 
    }
     
    if (savedQueries.length >= 3 && currentUserMatches("guest")) {
      alert("guest users cannot submit new queries once saved query count is 3 or greater!")
      return;
      }
    let newSavedQueries = [];
    newSavedQueries.push(queryObject);
    for (let query of savedQueries) {
      if (query.queryName !== queryObject.queryName) {
        newSavedQueries.push(query);
      }
    }
    console.log(JSON.stringify(newSavedQueries));
    setSavedQueries(newSavedQueries); 
    saveQueryApi(newSavedQueries);
    setQuery(queryObject);
  }

  async function getNews(queryObject) {
    if (queryObject.q) {
      saveNewsApi(queryObject, setData);
    } else {
      setData({});
    }
  }
  function onSavedQuerySelect(selectedQuery) {
    setQueryFormObject(selectedQuery);
    setQuery(selectedQuery);
   }
   function login(){
    if (currentUser !== null) {
      // logout
      setCurrentUser(null);
    } else {
      loginApi(credentials, setCurrentUser);
    }
   }

  return (
    <div>
        <LoginForm login={login} 
        credentials={credentials} 
        currentUser={currentUser} 
        setCredentials={setCredentials} />
      <div >
        <section className="parent" >
          <div className="box">
            <span className='title'>Query Form</span>
            <QueryForm
            currentUser={currentUser}
              setFormObject={setQueryFormObject}
              formObject={queryFormObject}
              submitToParent={onFormSubmit} />
          </div>
          <div className="box">
            <span className='title'>Saved Queries</span>
            <SavedQueries savedQueries={savedQueries} 
              selectedQueryName={query.queryName} 
              onQuerySelect={onSavedQuerySelect}/>
          </div>
          <div className="box">
            <span className='title'>Articles List</span>
            <Articles query={query} data={data} />
          </div>
        </section>
      </div>
    </div>
  )
}