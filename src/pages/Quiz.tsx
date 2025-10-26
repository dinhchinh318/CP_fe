import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { questionService, testService } from '../services/services';
import { Question, TestAnswer } from '../types';

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    loadQuestions();
  }, [isAuthenticated, navigate]);

  const loadQuestions = async () => {
    try {
      const questionsData = await questionService.getQuestions();
      setQuestions(questionsData);
      // Initialize answers array
      const initialAnswers = questionsData.map(q => ({
        questionId: q._id,
        score: 0
      }));
      setAnswers(initialAnswers);
    } catch (err) {
      setError('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex].score = score;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitTest = async () => {
    if (!user) return;

    setSubmitting(true);
    try {
      const response = await testService.submitTest(user.id, answers);

      const resultId = response.result._id;

      navigate(`/result/${resultId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit test');
    } finally {
      setSubmitting(false);
    }
  };



  if (loading) {
    return (
      <div className="container">
        <div className="card text-center">
          <h2>Loading questions...</h2>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container">
        <div className="card text-center">
          <h2>No questions available</h2>
          <p>Please contact an administrator to add questions.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];

  return (
    <div className="container">
      <div className="card">
        <div className="text-center mb-4">
          <h2>Career Assessment Quiz</h2>
          <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
          <div style={{ 
            width: '100%', 
            background: '#e9ecef', 
            borderRadius: '10px', 
            height: '8px',
            marginTop: '1rem'
          }}>
            <div style={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              background: '#007bff',
              height: '100%',
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="mb-4">
          <h3 style={{ marginBottom: '1rem' }}>{currentQuestion.content}</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[1, 2, 3, 4, 5].map((score) => (
              <label key={score} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '0.75rem',
                border: currentAnswer.score === score ? '2px solid #007bff' : '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer',
                background: currentAnswer.score === score ? '#f8f9ff' : 'white'
              }}>
                <input
                  type="radio"
                  name={`question-${currentQuestion._id}`}
                  value={score}
                  checked={currentAnswer.score === score}
                  onChange={() => handleAnswerChange(score)}
                  style={{ marginRight: '0.5rem' }}
                />
                <span>
                  {score === 1 && 'Strongly Disagree'}
                  {score === 2 && 'Disagree'}
                  {score === 3 && 'Neutral'}
                  {score === 4 && 'Agree'}
                  {score === 5 && 'Strongly Agree'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            onClick={prevQuestion}
            className="btn btn-secondary"
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          
          <div>
            {currentQuestionIndex === questions.length - 1 ? (
              <button 
                onClick={submitTest}
                className="btn btn-success"
                disabled={submitting || currentAnswer.score === 0}
              >
                {submitting ? 'Submitting...' : 'Submit Test'}
              </button>
            ) : (
              <button 
                onClick={nextQuestion}
                className="btn"
                disabled={currentAnswer.score === 0}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
