import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

type QuestionProps = {
  questionData: {
    flag: string;
    question: string;
    options: string[];
    correctAnswer: string;
  };
  onAnswerSelect: (answer: string) => void;
  selectedAnswer: string | null;
  isAnswered: boolean;
  currentQuestion: number;
  totalQuestions: number;
};

export default function Question({ 
  questionData, 
  onAnswerSelect, 
  selectedAnswer, 
  isAnswered, 
  currentQuestion, 
  totalQuestions 
}: QuestionProps) {
  const getOptionStyle = (option: string) => {
    if (!isAnswered) return styles.option;
    if (option === questionData.correctAnswer) return [styles.option, styles.correctOption];
    if (option === selectedAnswer && option !== questionData.correctAnswer) return [styles.option, styles.wrongOption];
    return [styles.option, styles.disabledOption];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>Question {currentQuestion} out of {totalQuestions}</Text>
      <Text style={styles.flag}>{questionData.flag}</Text>
      <Text style={styles.question}>{questionData.question}</Text>
      <ScrollView style={styles.optionsContainer} contentContainerStyle={styles.optionsContentContainer}>
        {questionData.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(option)}
            onPress={() => !isAnswered && onAnswerSelect(option)}
            disabled={isAnswered}
          >
            <Text style={[
              styles.optionText,
              isAnswered && option === questionData.correctAnswer && styles.correctOptionText,
              isAnswered && option === selectedAnswer && option !== questionData.correctAnswer && styles.wrongOptionText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  progress: {
    fontSize: 19,
    fontWeight:'bold',
    marginBottom: 10,
    color: '#000000',
  },
  flag: {
    fontSize: 100,
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#daa520',
  },
  optionsContainer: {
    width: '100%',
    maxHeight: 300,
  },
  optionsContentContainer: {
    paddingBottom: 20,
  },
  option: {
    backgroundColor: '#ffe4b5',
    padding: 15,
    borderRadius: 18,
    marginBottom: 10,
    width: '100%',
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionText: {
    fontSize: windowWidth < 375 ? 14 : 16,
    fontWeight:'bold',
    color: '#333',
    textAlign: 'center',
  },
  correctOption: {
    backgroundColor: '#e6ffe6',
    borderColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#ffe6e6',
    borderColor: '#F44336',
  },
  disabledOption: {
    opacity: 0.2,
  },
  correctOptionText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  wrongOptionText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
});