import App from '../App';
import style from './Quote.module.css';
import quotes from '../data/data';
import {useState} from "react";



function Quote(props) {
  return (
    <>
      <div className={style.text}>
        Texte : {props.text}
      </div >
      <div className={style.auteur}>
        Auteur : {props.author}
      </div >
    </ >);
}


function AllQuotes() {
  return (

    <div className=" App ">
      {quotes.map(
        c => < Quote key={c.id} {...c} />)}
    </div >

  )
}



export default function OneQuote() {
  const [currIndex, setCurrIndex] = useState(0);
  const currentQuote = quotes[currIndex];
  const jsxQuote = <Quote text={currentQuote.text} author={
    currentQuote.author} />;
  return (
    <div className=" App ">
      {jsxQuote}
    </div >
  );
}


