import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TestConnection from '../components/TestConnection';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container">
      
      <div className="card text-center">
        <h1 className="mb-4">Career Compass</h1>
        <p className="mb-4" style={{ fontSize: '1.2rem', color: '#666' }}>
          Khám phá con đường sự nghiệp lý tưởng của bạn với bài đánh giá nghề nghiệp dựa trên RIASEC của chúng tôi
        </p>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3>RIASEC là gì?</h3>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
            RIASEC là mô hình đánh giá nghề nghiệp phân loại con người thành sáu loại tính cách:
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem', 
            marginTop: '1rem' 
          }}>
            <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
              <strong>R - Realistic:</strong> Practical, hands-on, mechanical
            </div>
            <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
              <strong>I - Investigative:</strong> Analytical, scientific, intellectual
            </div>
            <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
              <strong>A - Artistic:</strong> Creative, expressive, original
            </div>
            <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
              <strong>S - Social:</strong> Helpful, cooperative, caring
            </div>
            <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
              <strong>E - Enterprising:</strong> Leadership, persuasive, ambitious
            </div>
            <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
              <strong>C - Conventional:</strong> Organized, detail-oriented, structured
            </div>
          </div>
        </div>

        {isAuthenticated ? (
          <div>
            <Link to="/quiz" className="btn btn-success" style={{ marginRight: '1rem' }}>
              Bắt đầu làm bài test đánh giá
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/register" className="btn btn-success" style={{ marginRight: '1rem' }}>
              Nhấn để bắt đầu
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;