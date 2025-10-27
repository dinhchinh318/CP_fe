import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { questionService } from '../services/services';
import { Question } from '../types';

const Admin: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    content: '',
    category: 'R' as 'R' | 'I' | 'A' | 'S' | 'E' | 'C'
  });
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    
    loadQuestions();
  }, [isAuthenticated, navigate, user]);

  const loadQuestions = async () => {
    try {
      const questionsData = await questionService.getQuestions();
      setQuestions(questionsData);
    } catch (err) {
      setError('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.content.trim()) return;

    try {
      setLoading(true);
      setError('');

      const payload = {
        content: newQuestion.content,
        category: newQuestion.category
      };

      const created = await questionService.createQuestion(payload);

      setQuestions([...questions, created]);

      setNewQuestion({ content: '', category: 'R' });
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
      setError('Failed to add question to database');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    try {
      await questionService.deleteQuestion(id);
      setQuestions(prev => prev.filter(q => q._id !== id));
    } catch (err: any) {
      console.log("Delete Error:", err.response?.data || err);
      setError(err.response?.data?.error || 'Failed to delete question');
    }
  };



  const getCategoryName = (code: string) => {
    const names: { [key: string]: string } = {
      'R': 'Realistic',
      'I': 'Investigative', 
      'A': 'Artistic',
      'S': 'Social',
      'E': 'Enterprising',
      'C': 'Conventional'
    };
    return names[code] || code;
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card text-center">
          <h2>Loading admin panel...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>Admin Panel</h1>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-success"
          >
            {showAddForm ? 'Cancel' : 'Add Question'}
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {showAddForm && (
          <div className="card mb-4" style={{ background: '#f8f9fa' }}>
            <h3>Add New Question</h3>
            <form onSubmit={handleAddQuestion}>
              <div className="form-group">
                <label className="form-label">Question Content</label>
                <textarea
                  className="form-input"
                  value={newQuestion.content}
                  onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                  rows={3}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={newQuestion.category}
                  onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value as any })}
                >
                  <option value="R">Realistic</option>
                  <option value="I">Investigative</option>
                  <option value="A">Artistic</option>
                  <option value="S">Social</option>
                  <option value="E">Enterprising</option>
                  <option value="C">Conventional</option>
                </select>
              </div>
              
              <button type="submit" className="btn">
                Add Question
              </button>
            </form>
          </div>
        )}

        <div>
          <h2>Questions ({questions.length})</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {questions.map((question) => (
              <div key={question._id} style={{
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ flex: 1, marginRight: '1rem' }}>
                  <p style={{ marginBottom: '0.5rem' }}>{question.content}</p>
                  <span style={{
                    background: '#e9ecef',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    color: '#666'
                  }}>
                    {getCategoryName(question.category)} ({question.category})
                  </span>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteQuestion(question._id!)}
                  style={{ marginLeft: '1rem' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

