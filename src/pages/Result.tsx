// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { careerService } from '../services/services';
// import { TestResult, Career } from '../types';

// const Result: React.FC = () => {
//   const [result, setResult] = useState<TestResult | null>(null);
//   const [careers, setCareers] = useState<Career[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  
//   const { user, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }
    
//     // For demo purposes, we'll create a mock result
//     // In a real app, you'd fetch this from the backend
//     const mockResult: TestResult = {
//       _id: 'mock-result',
//       userId: user?.id || '',
//       riasecCode: 'RIA',
//       details: {
//         R: 85,
//         I: 90,
//         A: 75,
//         S: 60,
//         E: 45,
//         C: 30
//       },
//       createdAt: new Date().toISOString()
//     };
    
//     setResult(mockResult);
//     loadCareers(mockResult.riasecCode);
//   }, [isAuthenticated, navigate, user]);

//   const loadCareers = async (code: string) => {
//     try {
//       const careersData = await careerService.getCareersByCode(code);
//       setCareers(careersData);
//     } catch (err) {
//       setError('Failed to load career recommendations');
//     } finally {
//       setLoading(false);
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

//   const getCategoryDescription = (code: string) => {
//     const descriptions: { [key: string]: string } = {
//       'R': 'Practical, hands-on, mechanical',
//       'I': 'Analytical, scientific, intellectual',
//       'A': 'Creative, expressive, original',
//       'S': 'Helpful, cooperative, caring',
//       'E': 'Leadership, persuasive, ambitious',
//       'C': 'Organized, detail-oriented, structured'
//     };
//     return descriptions[code] || '';
//   };

//   if (loading) {
//     return (
//       <div className="container">
//         <div className="card text-center">
//           <h2>Loading your results...</h2>
//         </div>
//       </div>
//     );
//   }

//   if (!result) {
//     return (
//       <div className="container">
//         <div className="card text-center">
//           <h2>No results found</h2>
//           <p>Please take the quiz first.</p>
//           <button onClick={() => navigate('/quiz')} className="btn">
//             Take Quiz
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const sortedScores = Object.entries(result.details)
//     .sort(([,a], [,b]) => b - a);

//   return (
//     <div className="container">
//       <div className="card text-center mb-4">
//         <h1>Your Career Assessment Results</h1>
//         <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '1rem' }}>
//           Based on your responses, your top personality type is: <strong>{result.riasecCode}</strong>
//         </p>
//       </div>

//       <div className="card mb-4">
//         <h2 className="mb-4">Your RIASEC Profile</h2>
//         <div style={{ display: 'grid', gap: '1rem' }}>
//           {sortedScores.map(([code, score]) => (
//             <div key={code} style={{ 
//               display: 'flex', 
//               justifyContent: 'space-between', 
//               alignItems: 'center',
//               padding: '1rem',
//               background: '#f8f9fa',
//               borderRadius: '8px'
//             }}>
//               <div>
//                 <strong>{getCategoryName(code)} ({code})</strong>
//                 <div style={{ fontSize: '0.9rem', color: '#666' }}>
//                   {getCategoryDescription(code)}
//                 </div>
//               </div>
//               <div style={{ 
//                 fontSize: '1.2rem', 
//                 fontWeight: 'bold',
//                 color: '#007bff'
//               }}>
//                 {score}%
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {careers.length > 0 && (
//         <div className="card">
//           <h2 className="mb-4">Recommended Careers</h2>
//           <div style={{ display: 'grid', gap: '1rem' }}>
//             {careers.map((career) => (
//               <div key={career._id} style={{
//                 padding: '1.5rem',
//                 border: '1px solid #ddd',
//                 borderRadius: '8px',
//                 background: 'white'
//               }}>
//                 <h3 style={{ color: '#007bff', marginBottom: '0.5rem' }}>
//                   {career.name}
//                 </h3>
//                 {career.description && (
//                   <p style={{ marginBottom: '1rem', color: '#666' }}>
//                     {career.description}
//                   </p>
//                 )}
//                 {career.skills && career.skills.length > 0 && (
//                   <div>
//                     <strong>Key Skills:</strong>
//                     <div style={{ 
//                       display: 'flex', 
//                       flexWrap: 'wrap', 
//                       gap: '0.5rem',
//                       marginTop: '0.5rem'
//                     }}>
//                       {career.skills.map((skill, index) => (
//                         <span key={index} style={{
//                           background: '#e9ecef',
//                           padding: '0.25rem 0.5rem',
//                           borderRadius: '4px',
//                           fontSize: '0.9rem'
//                         }}>
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {error && <div className="alert alert-error">{error}</div>}

//       <div className="text-center mt-4">
//         <button onClick={() => navigate('/quiz')} className="btn btn-secondary" style={{ marginRight: '1rem' }}>
//           Retake Quiz
//         </button>
//         <button onClick={() => navigate('/')} className="btn">
//           Back to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Result;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { testService, careerService } from '../services/services';
import { TestResult, Career } from '../types';

const Result: React.FC = () => {
  const [result, setResult] = useState<TestResult | null>(null);
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
        setError("Result ID is missing");
        setLoading(false);
        return;
    }

    const loadResult = async () => {
        try {
          const data: TestResult = await testService.getResultById(id);

          if (!data || !data.riasecCode) {
            setError("Result not found");
            setLoading(false);
            return;
          }

          setResult(data);

          // Lấy career theo riasecCode
          if (data.riasecCode) {
            const careersData: Career[] = await careerService.getCareersByCode(data.riasecCode);
            setCareers(careersData);
          }
        } catch (err) {
          console.error('Error loading result:', err);
          setError("Failed to load test result");
        } finally {
          setLoading(false);
        }
    };

    loadResult();
  }, [id]);


  const getCategoryName = (code: string) => {
    const names: Record<string, string> = {
      R: 'Realistic',
      I: 'Investigative',
      A: 'Artistic',
      S: 'Social',
      E: 'Enterprising',
      C: 'Conventional'
    };
    return names[code] || code;
  };

  const getCategoryDescription = (code: string) => {
    const desc: Record<string, string> = {
      R: 'Practical, hands-on, mechanical',
      I: 'Analytical, scientific, intellectual',
      A: 'Creative, expressive, original',
      S: 'Helpful, cooperative, caring',
      E: 'Leadership, persuasive, ambitious',
      C: 'Organized, detail-oriented, structured'
    };
    return desc[code] || '';
  };

  if (loading) return <div className="container"><h2>Loading...</h2></div>;
  if (error) return <div className="container text-center"><h2>{error}</h2></div>;

  if (!result) {
    return (
      <div className="container text-center">
        <h2>No result found</h2>
        <button className="btn" onClick={() => navigate('/quiz')}>Take Quiz</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card text-center mb-4">
        <h1>Your Career Assessment Results</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '1rem' }}>
          Based on your responses, your top personality type is: <strong>{result.riasecCode || 'N/A'}</strong>
        </p>
      </div>

      <div className="card mb-4">
        <h2 className="mb-4">Your RIASEC Profile</h2>
        {result.details && Object.keys(result.details).length > 0 ? (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {Object.entries(result.details)
              .sort(([,a],[,b]) => b - a)
              .map(([code, score]) => (
                <div key={code} style={{
                  display:'flex',
                  justifyContent:'space-between',
                  alignItems:'center',
                  padding:'1rem',
                  background:'#f8f9fa',
                  borderRadius:'8px'
                }}>
                  <div>
                    <strong>{getCategoryName(code)} ({code})</strong>
                    <div style={{ fontSize:'0.9rem', color:'#666' }}>
                      {getCategoryDescription(code)}
                    </div>
                  </div>
                  <div style={{ fontSize:'1.2rem', fontWeight:'bold', color:'#007bff' }}>
                    {score || 0}%
                  </div>
                </div>
            ))}
          </div>
        ) : (
          <p style={{ color:'#666' }}>No score details available.</p>
        )}
      </div>

      {careers.length > 0 && (
        <div className="card mb-4">
          <h2 className="mb-4">Recommended Careers</h2>
          <div style={{ display:'grid', gap:'1rem' }}>
            {careers.map(c => (
              <div key={c._id} style={{ padding:'1rem', border:'1px solid #ddd', borderRadius:'8px', background:'white' }}>
                <h3 style={{ color:'#007bff', marginBottom:'0.5rem' }}>{c.name}</h3>
                {c.description && <p style={{ color:'#666' }}>{c.description}</p>}
                {c.skills && c.skills.length > 0 && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                    {c.skills.map((skill,i)=>(
                      <span key={i} style={{ background:'#e9ecef', padding:'0.25rem 0.5rem', borderRadius:'4px', fontSize:'0.9rem' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <button onClick={()=>navigate('/quiz')} className="btn btn-secondary" style={{ marginRight:'1rem' }}>
          Retake Quiz
        </button>
        <button onClick={()=>navigate('/')} className="btn">Back to Home</button>
      </div>
    </div>
  );
};

export default Result;