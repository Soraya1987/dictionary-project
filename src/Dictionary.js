import React,{useState} from "react";
import Results from "./Results";
import Photos from "./Photos";
import axios from "axios";
import "./Dictionary.css";

export default function Dictionary(props){
    let[keyword,setKeyword]=useState(props.defaultKeyword);
    let[results,setResults]=useState(null);
    let[loaded,setLoaded]=useState(false);
    let[photos,setPhotos]=useState(null);

    function handleDictionaryResponse(response){
        setResults(response.data[0]);
    }
    function handlePexelResponse(response){
    setPhotos(response.data.photos);
    }

    function Search(){
          //documentation:https://dictionaryapi.dev/
         let apiUrl=`https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
         axios.get(apiUrl).then(handleDictionaryResponse);
         
         let pexelApiKey="563492ad6f917000010000017466488da88a48f98342cb0ca1fe5515";
         let pexelApiUrl=`https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
         let headers={Authorization:`Bearer ${pexelApiKey}`}
         axios.get(pexelApiUrl,{headers:headers}).then(handlePexelResponse);
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
           <Photos photos={photos}/>
        </div>
    ) ;
}else{
    load();
    return "Loading";
}
    }
    