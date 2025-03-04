import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Results({ score, totalQuestions, onRestart }) {
  const percentage = Math.round((score / totalQuestions) * 100);
 
  const percentageColor = percentage < 50 ? '#FF0000' : '#4CAF50'; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Quiz is Completed!!!</Text>
      <Text style={styles.score}>You Scored: {score}/{totalQuestions}</Text>
      <Text style={[styles.percentage, { color: percentageColor }]}>{percentage}%</Text>
      <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
        <Text style={styles.restartButtonText}>Restart Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#deb887',
  },
  score: {
    fontSize: 20,
    marginBottom: 10,
    color: '#ff8c00',
  },
  percentage: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: '#ffe4b5',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 230,
  },
  restartButtonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
