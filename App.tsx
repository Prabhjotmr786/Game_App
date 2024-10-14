import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [guess, setGuess] = useState('');
  const [randomNumber, setRandomNumber] = useState('');
  const [equal, setEqual] = useState(false);
  const [greater, setGreater] = useState(false);
  const [less, setLess] = useState(false)
  const [count, setCount] = useState(0);

  useEffect(() => {
    generateRandomNumber()
  }, [])

  const generateRandomNumber = () => {
      setRandomNumber(Math.floor(Math.random() * 10) + 1);
  };

  const handleGuess = () => {
    const parsedGuess = parseInt(guess)
    // Convert string value to integer

    if(parsedGuess === randomNumber){
      setEqual(true)
      setGreater(false)
      setLess(false)
    }

    else if(parsedGuess > randomNumber) {
      setEqual(false)
      setGreater(true)
      setLess(false)
    }
    else if(parsedGuess < randomNumber) {
      setEqual(false)
      setGreater(false)
      setLess(true)
    }

    setCount(count + 1)
    setGuess('')
  };

  const resetGame = () => {
    setCount(0)
    generateRandomNumber()
    setGuess('')
    setEqual(false)
    setGreater(false)
    setLess(false)
  };

  return (
    <SafeAreaView style = {styles.container} >
      <View style = {styles.content}>
        <Text> Game - Guess the number - Enter your guess between 1 - 10 </Text>

        <TextInput style = {StyleSheet.input} 
        placeholder='Enter Your Guess'
        keyboardType='numeric'
        value= {guess} 
        onChangeText={(text) => {
          setGuess(text)
          setEqual(false)
          setGreater(false)
        }} />

        <Button title='Submit' onPress={handleGuess} /> 
        <Button title='Reset Game' onPress={resetGame} /> 

      </View>

      <View style = {styles.result}>
        {equal && (
          <Text style = {styles.resultText}>
            You guessed the correct guess after {count} guesses...
          </Text>
        )}
        
        {greater && (
          <Text style = {styles.resultText}>
            You guessed a number greater than Random Number...
          </Text>
        )}

        {less && (
          <Text style = {styles.resultText}>
            You guessed a number less than Random Number...
          </Text>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
content: {
  marginBottom: 20,
},
input: {
  height: 40,
  borderColor: "#ccc",
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  marginBottom: 10,
},
result: {
  marginTop: 20,
},
resultText: {
  fontSize: 16,
  textAlign: "center",
  marginVertical: 5,
},

});
