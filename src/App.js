import React, { useState } from 'react'
import './App.css'
// import butcherPigImage from './assets/butcherPig.jpeg'

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
      // ensure that vowels are lower case so they can be included in the array 
      const vowelsArray = eachWord.toLowerCase().split("").filter(vowel => {
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
      let quPosition = eachWord.toLowerCase().search(/qu/i)
      console.log("quPosition:", quPosition)
      // last y - find the last index of y in the string
      let lastY = eachWord.toLowerCase().lastIndexOf('y')
      console.log("lastY:", lastY)
      // vowel - find index of where the first occurrence of a vowel begins
      let vowelPosition = eachWord.search(/[aeiouAEIOU]/gi)
      console.log("vowelPosition:", vowelPosition)

      // determine if punctuation is in a string
      // used regex syntax to determine last value in string is letter
      console.log("last char:", (/[a-zA-Z]/).test(eachWord[eachWord.length - 1]))
      // used regex syntax to locate punctuation with test method
      let herePunct = (/\p{P}/gu).test(eachWord[eachWord.length - 1])
      console.log("herePunct:", herePunct)
      let findPunct = eachWord.search(/\p{P}/gu)
      let rest = eachWord.substring(0, findPunct)
      let punct = eachWord.slice(findPunct)
      console.log("punct:", punct)
      console.log("rest:", rest)
      // error message if a punctuation is 
      let error = (/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g).test(eachWord)


      // STRETCH punctuation
      if(herePunct === true && eachWord[0].toLowerCase()===vowelsArray[0]){
        return rest + "way" + punct
        // qu - determine if word has qu and then slice at the index that u will be located did joined that portion that was omitted to the end of the word
      } else if(herePunct === true && eachWord.toLowerCase().includes("qu")) {
        return rest.slice(quPosition + 2) + rest.substring(0, quPosition+2) + "ay" + punct
      // locate vowel in string and slice at that index then add the omission to the end of string
      } else if(herePunct === true && vowelPosition !== -1) {
          return rest.slice(vowelPosition) + rest.substring(0, vowelPosition) + "ay" + punct
      // use else if to make return reachable on line 62
      // locate y and slice at that index then add the omission to the end of string
      } else if(herePunct === true && eachWord.toLowerCase().includes("y")) {
        return rest.slice(lastY) + rest.substring(0, lastY) + "ay" + punct
      } 

      // if punctuation is not at the last index of string
      // STRETCH error message
      if(error === true){
        return `Thank you for testing the limitation of my translator. Please consider using either a different word or a more readable version of ${eachWord}.`
      }


      // no punctuation
      // vowels - compare 0th index of string with 0th index of array
      if(eachWord[0].toLowerCase()===vowelsArray[0]) {
        return eachWord + "way"
      // qu - determine if word has qu and then slice at the index that u will be located did joined that portion that was omitted to the end of the word
      } else if(eachWord.toLowerCase().includes("qu")) {
        return eachWord.slice(quPosition + 2) + eachWord.substring(0, quPosition+2) + "ay"
      // locate vowel in string and slice at that index then add the omission to the end of string
      } else if(vowelPosition !== -1) {
          return eachWord.slice(vowelPosition) + eachWord.substring(0, vowelPosition) + "ay"
      // use else if to make return reachable on line 62
      // locate y and slice at that index then add the omission to the end of string
      } else if(eachWord.includes("y")) {
        return eachWord.slice(lastY) + eachWord.substring(0, lastY) + "ay"
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
      <p className="output-section">{inputTranslated}</p>
      </div>
      <footer>
      {/* <img
        src={butcherPigImage}
        alt="pig with butcher cut names in pig latin"
        className="butcher-pig-image"
      /> */}
        &copy; 2022 | Coded by: Syntactical Astronaut
      </footer>

    </>
  )
}

export default App