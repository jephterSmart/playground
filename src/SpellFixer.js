import axios from "axios";
import React, {useState,useEffect} from "react";
import LoadingSpinner from "./LoadingSpinner";
import ShowCorrected from "./ShowCorrected";



const SpellingFixer = ({corpus}) => {
    const [corrected, setCorrected] = useState('');
    const url = "https://us-east1-serverless-306422.cloudfunctions.net/spellchecker";
    useEffect(()=>{
      setCorrected('');
      const words = corpus.split(' ');
      Promise.all(words.map(word => {
        return axios.get(`${url}/misspelled?word=${word}`)
        .then(({data}) =>{
            
          if(data.misspelled){
           return  axios.get(`${url}/corrections?word=${data.word}`)
          }
          else return Promise.resolve({data:{
            corrections:[data.word]
          }});
        })
         .then(({data}) => {
            console.log(data)
          return data.corrections[0];
        })
       
      }))
      .then(correctWords => {
        console.log(correctWords)
        setCorrected(correctWords.join(' '));
        
      }).catch(err => {
        setCorrected("There was an error, click send again")
      });
      axios.post(`${url}/checkspelling`,{
                 "data": "{\"corpus\":\""+ corpus +"\"}"
               })
      .then(res =>{
        console.log(res.data);
      })
    },[corpus]);
    
    return (
      <>
        {corrected == null
           ? <LoadingSpinner />
           : <ShowCorrected text={corrected} />
        }
      </>
    );
  }


export default SpellingFixer;