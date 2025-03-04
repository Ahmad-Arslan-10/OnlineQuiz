import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, ActivityIndicator, Dimensions } from 'react-native';
import Quiz from './Quiz';
import quizQuestions from './quizQuestions.json';

const windowWidth = Dimensions.get('window').width;

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setQuestions(quizQuestions.questions);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading questions...</Text>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <Quiz questions={questions} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizContainer: {
    flex: 1,
    width: windowWidth > 500 ? 500 : '100%',
    alignSelf: 'center',
  },
});
