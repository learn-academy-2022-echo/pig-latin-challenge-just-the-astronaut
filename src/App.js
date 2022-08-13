import React, { useState } from 'react'
import './App.css'
import butcherPigImage from './assets/butcherPig.jpeg'

const App = () => {

  // ACTION ITEM: to make the development process easier there are some preassigned words in the input field, when you are ready for your full user experience delete the test words passed to useState and pass an empty string
  const [userInput, setUserInput] = useState("apple through queen squeal fry fluent")
  const [inputTranslated, setInputTranslated] = useState("")

  // ACTION ITEM: the "myPigLatinCodeHere" function is where you will put your logic to translate the sentence entered by the user into Pig Latin
  const myPigLatinCodeHere = () => {

    // NO MODIFICATION NEEDED: the variable "arrayOfUserInput" will contain the text input from the user split into an array of words
    const arrayOfUserInput = userInput.split(" ")
    console.log("arrayOfUserInput:", arrayOfUserInput)

    // NO MODIFICATION NEEDED: now that we have an array of words, we can map over the array and look at each word
    const translatedWordsArray = arrayOfUserInput.map(eachWord => {
      console.log("eachWord:", eachWord)

      // NO MODIFICATION NEEDED: this code will look at each word and identify the vowels
      const vowelsArray = eachWord.split("").filter(vowel => {
        return (
          vowel === "a" || 
          vowel === "e" || 
          vowel === "i" || 
          vowel === "o" || 
          vowel === "u"
        )
      })
      console.log("vowelsArray:", vowelsArray)

      // ACTION ITEM: your Pig Latin logic goes here!
      
      // qu - find the index of where qu begins in the string
      let quPosition = eachWord.search(/qu/i)
    
      // y - find the index of where y begins in the string
      let yPosition = eachWord.search(/y/i)

      // vowels - compare 0th index of string with 0th index of array
      if(eachWord[0]===vowelsArray[0]) {
        return eachWord + "way"
      // qu - determine if word has qu and then slice at the index that u will be located did joined that portion that was omitted to the end of the word
      } else if(eachWord.includes("qu")) {
        return eachWord.slice(quPosition + 2) + eachWord.substring(0, quPosition+2) + "ay"
        // y at the end of the word
      } else if(eachWord.endsWith("y")) {
        return eachWord.slice(yPosition) + eachWord.substring(0, yPosition) + "ay"
      } 

      // ACTION ITEM: this return will be the output of your Pig Latin'd code
      return eachWord
    })

    // NO MODIFICATION NEEDED: once the code has been modified it gets joined from an array back to a string
    const translatedWords = translatedWordsArray.join(" ")
    console.log("translatedWords:", translatedWords)

    // NO MODIFICATION NEEDED: this will update the inputTranslated variable in state
    setInputTranslated(translatedWords)
  }

  // ACTION ITEM: this method restarts the game by setting the original state, when you are ready for your full user experience delete the test words in setUserInput and pass an empty string
  const restartGame = () => {
    setUserInput("apple through queen squeal fry fluent")
    setInputTranslated("")
  }

  // NO MODIFICATION NEEDED: this method prevents React from refreshing the page unnecessarily
  const setUpPreventDefault = (e) => {
    e.preventDefault()
    myPigLatinCodeHere()
  }

  // NO MODIFICATION NEEDED: this method takes the value of the input and saves it in state
  const handleInput = (e) => {
    setUserInput(e.target.value)
  }

  return (
    <>
      <h1>Pig Latin Translator</h1>
      <img
        src={butcherPigImage}
        alt="pig with butcher cut names in pig latin"
        className="butcher-pig-image"
      />
      <div className="input-section">
        <h4>Enter phrase to be translated:</h4>
        <input
          type="text"
          className="user-input"
          onChange={handleInput}
          value={userInput}
        />
        <br />
        <button onClick={setUpPreventDefault}>Submit</button>
        <button onClick={restartGame}>Clear</button>
      </div>
      <p>{inputTranslated}</p>
      <footer>&copy; 2022 | Coded by: Your Names Here!</footer>
    </>
  )
}

export default App