import { useState } from "react";
import { DetailsArticles } from "./DetailsArticles";

export function Articles(params) {
  let [detailsClass, setDetailsClass] = useState(true);
  let [itemDetail, setItemDetail] = useState({});
    let articles = (params.data.articles)?params.data.articles:[];
    let queryName = (params.query.queryName)?params.query.queryName:"na";
    let articleCount = (params.data.totalResults)?params.data.totalResults:0;
    console.log("detailsClass:%s",detailsClass)
    function onClickCollapsible(item){
      console.log("detailsClass:%s",detailsClass)
      if(item.title===itemDetail.title){
        setDetailsClass(!detailsClass);
      }else{
        setDetailsClass(false);
      }
        
      setItemDetail(item);
    }
    return (
      <div>
        Query: {queryName}
        <br/>Count: {articleCount}
        <div className={(detailsClass) ? "moreHidden" : "moreVisible"}>
                      <DetailsArticles item={itemDetail}/>
         </div>
        <ol >{
            articles.map((item, idx) => {
              if(item){
                if(item.title){
                  if(item.title === "[Removed]"){
                    return (<li key={idx} >Was Removed</li>);
                  }
                  let trimTitle = item.title.substring(0,30);
                  return (<li key={idx} className={(!detailsClass&&item.title===itemDetail.title) ? "selected" : ""} 
                  onClick={()=>onClickCollapsible(item)}>{trimTitle} 
                  &nbsp;
                  <a href={item.url} target="_blank" rel="noreferrer" >&nbsp;Link</a></li>);    
                }else{
                  return (<li key={idx}>No Title</li>);
                }
              }else{
                return (<li key={1} >No Item</li>);
              }
            })
        }</ol>
      </div>
    )
  
  }