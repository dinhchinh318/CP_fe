import React, { useEffect, useState } from 'react';
import api from '../services/api';

const TestConnection: React.FC = () => {
  const [status, setStatus] = useState<string>('Testing...');
  const [apiResponse, setApiResponse] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic API connection
        const response = await api.get('/');
        setApiResponse(response.data);
        setStatus('✅ Backend connected successfully!');
      } catch (error: any) {
        setStatus(`❌ Connection failed: ${error.message}`);
        setApiResponse(error.response?.data || 'No response');
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h2>Connection Test</h2>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>API Response:</strong> {apiResponse}</p>
      <p><strong>API URL:</strong> {process.env.REACT_APP_API_URL || 'http://localhost:5000'}</p>
    </div>
  );
};

export default TestConnection;

