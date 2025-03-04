import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Question from './Question';
import Results from './Results';

const windowWidth = Dimensions.get('window').width;

type QuizProps = {
  questions: {
    id: number;
    flag: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
};

export default function Quiz({ questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null); 

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          handleNextQuestion(); 
          return 15; 
        }
        return prevTime - 1; 
      });
    }, 1000);

    return () => clearInterval(timerRef.current as NodeJS.Timeout); 
  }, [currentQuestion]); 

  const handleAnswer = (answer: string) => {
    if (!isAnswered) {
      clearInterval(timerRef.current as NodeJS.Timeout); 
      setIsAnswered(true);
      setSelectedAnswer(answer);
      if (answer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimeLeft(15);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setTimeLeft(15);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Global Flags Quiz</Text>
      {showResults ? (
        <Results score={score} totalQuestions={questions.length} onRestart={restartQuiz} />
      ) : (
        <>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>Time left : </Text>
            <Text style={styles.timerValue}>{timeLeft}</Text>
          </View>
          <Question
            questionData={questions[currentQuestion]}
            onAnswerSelect={handleAnswer}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            currentQuestion={currentQuestion + 1}
            totalQuestions={questions.length}
          />
          {isAnswered && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
              <Text style={styles.nextButtonText}>Next Question</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    width: windowWidth > 500 ? 500 : '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d2691e',
    textAlign: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timerText: {
    fontSize: 18,
    color: '#ffa500',
  },
  timerValue: {
    fontSize: 18,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#ffe4b5',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 230,
    marginTop: 20,
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
