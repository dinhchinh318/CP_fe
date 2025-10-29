// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { questionService } from '../services/services';
// import { Question } from '../types';

// const Admin: React.FC = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newQuestion, setNewQuestion] = useState({
//     content: '',
//     category: 'R' as 'R' | 'I' | 'A' | 'S' | 'E' | 'C'
//   });
  
//   const { user, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/admin');
//       return;
//     }
    
//     if (user?.role !== 'admin') {
//       navigate('/');
//       return;
//     }
    
//     loadQuestions();
//   }, [isAuthenticated, navigate, user]);

//   const loadQuestions = async () => {
//     try {
//       const questionsData = await questionService.getQuestions();
//       setQuestions(questionsData);
//     } catch (err) {
//       setError('Failed to load questions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddQuestion = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newQuestion.content.trim()) return;

//     try {
//       setLoading(true);
//       setError('');

//       const payload = {
//         content: newQuestion.content,
//         category: newQuestion.category
//       };

//       const created = await questionService.createQuestion(payload);

//       setQuestions([...questions, created]);

//       setNewQuestion({ content: '', category: 'R' });
//       setShowAddForm(false);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to add question to database');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteQuestion = async (id: string) => {
//     try {
//       await questionService.deleteQuestion(id);
//       setQuestions(prev => prev.filter(q => q._id !== id));
//     } catch (err: any) {
//       console.log("Delete Error:", err.response?.data || err);
//       setError(err.response?.data?.error || 'Failed to delete question');
//     }
//   };



//   const getCategoryName = (code: string) => {
//     const names: { [key: string]: string } = {
//       'R': 'Realistic',
//       'I': 'Investigative', 
//       'A': 'Artistic',
//       'S': 'Social',
//       'E': 'Enterprising',
//       'C': 'Conventional'
//     };
//     return names[code] || code;
//   };

//   if (loading) {
//     return (
//       <div className="container">
//         <div className="card text-center">
//           <h2>Loading admin panel...</h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <div className="card">
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
//           <h1>Admin Panel</h1>
//           <button 
//             onClick={() => setShowAddForm(!showAddForm)}
//             className="btn btn-success"
//           >
//             {showAddForm ? 'Cancel' : 'Add Question'}
//           </button>
//         </div>

//         {error && <div className="alert alert-error">{error}</div>}

//         {showAddForm && (
//           <div className="card mb-4" style={{ background: '#f8f9fa' }}>
//             <h3>Add New Question</h3>
//             <form onSubmit={handleAddQuestion}>
//               <div className="form-group">
//                 <label className="form-label">Question Content</label>
//                 <textarea
//                   className="form-input"
//                   value={newQuestion.content}
//                   onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
//                   rows={3}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">Category</label>
//                 <select
//                   className="form-input"
//                   value={newQuestion.category}
//                   onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value as any })}
//                 >
//                   <option value="R">Realistic</option>
//                   <option value="I">Investigative</option>
//                   <option value="A">Artistic</option>
//                   <option value="S">Social</option>
//                   <option value="E">Enterprising</option>
//                   <option value="C">Conventional</option>
//                 </select>
//               </div>
              
//               <button type="submit" className="btn">
//                 Add Question
//               </button>
//             </form>
//           </div>
//         )}

//         <div>
//           <h2>Questions ({questions.length})</h2>
//           <div style={{ display: 'grid', gap: '1rem' }}>
//             {questions.map((question) => (
//               <div key={question._id} style={{
//                 padding: '1rem',
//                 border: '1px solid #ddd',
//                 borderRadius: '8px',
//                 background: 'white',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center'
//               }}>
//                 <div style={{ flex: 1, marginRight: '1rem' }}>
//                   <p style={{ marginBottom: '0.5rem' }}>{question.content}</p>
//                   <span style={{
//                     background: '#e9ecef',
//                     padding: '0.25rem 0.5rem',
//                     borderRadius: '4px',
//                     fontSize: '0.9rem',
//                     color: '#666'
//                   }}>
//                     {getCategoryName(question.category)} ({question.category})
//                   </span>
//                 </div>

//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDeleteQuestion(question._id!)}
//                   style={{ marginLeft: '1rem' }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { questionService, resultService } from '../services/services';
import { Question } from '../types';

interface UserResult {
  _id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
  resultCount?: number;

  // 👇 thêm phần này
  results?: {
    _id?: string;
    riasecCode?: string;
    details?: {
      R: number;
      I: number;
      A: number;
      S: number;
      E: number;
      C: number;
    };
    createdAt?: string;
  }[];
}


const Admin: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [users, setUsers] = useState<UserResult[]>([]);
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
      navigate('/admin');
      return;
    }

    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }

    loadAllData();
  }, [isAuthenticated, navigate, user]);

  const loadAllData = async () => {
  try {
    setLoading(true);
    const [questionsData, usersData] = await Promise.all([
      questionService.getQuestions(),
      resultService.getAllUsers()
    ]);

    console.log('✅ Questions:', questionsData);
    console.log('✅ Users:', usersData);

    // Gán dữ liệu chính xác
    setQuestions(Array.isArray(questionsData) ? questionsData : []);

    if (Array.isArray(usersData?.data)) {
      setUsers(usersData.data); // ✅ chính xác
    } else {
      console.error('❌ Unexpected users data format:', usersData);
      setUsers([]);
    }

  } catch (err) {
    console.error(err);
    setError('Failed to load admin data');
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
      setError('Failed to add question');
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
      R: 'Realistic',
      I: 'Investigative',
      A: 'Artistic',
      S: 'Social',
      E: 'Enterprising',
      C: 'Conventional'
    };
    return names[code] || code;
  };

  if (loading) {
    return (
      <div className="container text-center">
        <h2>Loading admin panel...</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '2rem',
      maxWidth: '1400px',
      marginInline: 'auto',
      padding: '0 1rem'
 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'flex-start'
        }}
      >
        {/* ----------------- LEFT SIDE: Question Management ----------------- */}
        <div className="card" style={{ background: '#fff' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}
          >
            <h1>Manage Questions</h1>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn btn-success"
            >
              {showAddForm ? 'Cancel' : 'Add Question'}
            </button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {showAddForm && (
            <div
              className="card mb-4"
              style={{ background: '#f8f9fa', padding: '1rem' }}
            >
              <h3>Add New Question</h3>
              <form onSubmit={handleAddQuestion}>
                <div className="form-group">
                  <label className="form-label">Question Content</label>
                  <textarea
                    className="form-input"
                    value={newQuestion.content}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, content: e.target.value })
                    }
                    rows={3}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-input"
                    value={newQuestion.category}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        category: e.target.value as any
                      })
                    }
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

          <h2>Questions ({questions.length})</h2>
          <div style={{ display: 'grid', gap: '1rem', maxHeight: '70vh',
                  overflowY: 'auto',
                  paddingRight: '0.5rem' }}>
            {questions.map((question) => (
              <div
                key={question._id}
                style={{
                  padding: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  background: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ flex: 1, marginRight: '1rem' }}>
                  <p style={{ marginBottom: '0.5rem' }}>{question.content}</p>
                  <span
                    style={{
                      background: '#e9ecef',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      color: '#666'
                    }}
                  >
                    {getCategoryName(question.category)} ({question.category})
                  </span>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteQuestion(question._id!)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ----------------- RIGHT SIDE: User Results ----------------- */}
        <div className="card" style={{ background: '#fff' }}>
          <h1>User Results</h1>
          <p style={{ color: '#555', marginBottom: '1rem' }}>
            Total users: {users?.length || 0}
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxHeight: '70vh',
              overflowY: 'auto'
            }}
          >
            {users.map((u, index) => (
              <div
                key={u._id}
                style={{
                  border: '1px solid #ddd',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: '#fafafa'
                }}
              >
                <h3 style={{ margin: 0 }}>
                  {index + 1}. {u.name || 'Unknown User'}
                </h3>
                <p style={{ margin: '0.25rem 0', color: '#666' }}>{u.email}</p>
                <p>
                  <strong>Result:</strong>{' '}
                  <span
                    style={{
                      background: '#e9ecef',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px'
                    }}
                  >
                    {u.results?.[0]?.riasecCode || 'N/A'}
                  </span>
                </p>
                {u.results?.[0]?.details && (
                  <div style={{ fontSize: '0.85rem', color: '#444' }}>
                    <p style={{ margin: 0 }}>
                      R:{u.results[0].details.R} I:{u.results[0].details.I} A:{u.results[0].details.A}{' '}
                      S:{u.results[0].details.S} E:{u.results[0].details.E} C:{u.results[0].details.C}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive layout: stack on mobile */}
      <style>
        {`
          @media (max-width: 900px) {
            .container > div {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Admin;
