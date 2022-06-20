import React,{useState} from "react";
import Results from "./Results";
import axios from "axios";
import "./Dictionary.css";

export default function Dictionary(props){
    let[keyword,setKeyword]=useState(props.defaultKeyword);
    let[results,setResults]=useState(null);
    let[loaded,setLoaded]=useState(false);

    function handleResponse(response){
        setResults(response.data[0]);
    }
    function Search(){
          //documentation:https://dictionaryapi.dev/
         let apiUrl=`https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
         axios.get(apiUrl).then(handleResponse);
    }
    function handleSubmit(event){
            event.preventDefault();
            Search();
        }

    function handleKeyWordChange(event){
         setKeyword(event.target.value);
    }
    function load(){
        setLoaded(true);
        Search();
    }

    if(loaded){
         return(
        <div className="Dictionary">
            <section>
                <h1>What word do you want to look up?</h1>
                <form onSubmit={handleSubmit}>
                   <input type="search" onChange={handleKeyWordChange} defaultValue={props.defaultKeyword}/>
                </form>
                <div className="hint">
                    sugested words: sunset, wine, yoga, plant... 
                </div>
            </section>
           
           <Results results={results}/>
        </div>
    ) ;
}else{
    load();
    return "Loading";
}
    }
   