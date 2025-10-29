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
  const getWorkEnvironment = (code: string): string => {
    const environments: Record<string, string> = {
      'R': 'Làm việc thực hành với công cụ, máy móc hoặc môi trường ngoài trời. Coi trọng kết quả thực tế và hoạt động thể chất.',
      'I': 'Phòng thí nghiệm, môi trường học thuật hoặc vai trò phân tích. Ưa thích làm việc độc lập và thách thức trí tuệ.',
      'A': 'Studio sáng tạo, nhà hát, công ty thiết kế. Coi trọng sự tự do thể hiện và tư duy đổi mới.',
      'S': 'Chăm sóc sức khỏe, giáo dục, trung tâm tư vấn. Thích môi trường hợp tác tập trung vào giúp đỡ người khác.',
      'E': 'Văn phòng kinh doanh, sàn bán hàng, vị trí lãnh đạo. Phát triển trong môi trường cạnh tranh, hướng đến mục tiêu.',
      'C': 'Văn phòng với nhiệm vụ có cấu trúc, quản lý dữ liệu, vai trò hành chính. Đánh giá cao quy trình rõ ràng và tổ chức.'
    };
    return environments[code] || 'Môi trường làm việc đa dạng tùy thuộc vào vai trò cụ thể.';
  };

  const getCareerPaths = (code: string): string[] => {
    const careers: Record<string, string[]> = {
      'R': ['Kỹ sư', 'Thợ cơ khí', 'Thợ điện', 'Thợ mộc', 'Phi công', 'Nông dân', 'Đầu bếp'],
      'I': ['Nhà khoa học', 'Nhà nghiên cứu', 'Chuyên viên phân tích', 'Nhà toán học', 'Lập trình viên', 'Dược sĩ', 'Kiến trúc sư'],
      'A': ['Nghệ sĩ', 'Nhà thiết kế', 'Nhà văn', 'Nhạc sĩ', 'Diễn viên', 'Nhiếp ảnh gia', 'Giám đốc nghệ thuật'],
      'S': ['Giáo viên', 'Y tá', 'Cố vấn', 'Nhân viên xã hội', 'Nhà trị liệu', 'Quản lý nhân sự', 'Huấn luyện viên'],
      'E': ['Quản lý', 'Nhân viên bán hàng', 'Doanh nhân', 'Luật sư', 'Giám đốc Marketing', 'Chính trị gia'],
      'C': ['Kế toán', 'Kiểm toán viên', 'Thư ký', 'Chuyên viên phân tích dữ liệu', 'Thủ thư', 'Giao dịch viên ngân hàng', 'Thanh tra']
    };
    return careers[code] || [];
  };

  const getCategoryDescriptionTV = (code: string) => {
    const desc: Record<string, string> = {
      R: '- Thực tế, hành động, thích “làm” hơn “nói”.\n- Tư duy cụ thể, quan sát tốt, phản ứng nhanh với tình huống thực tiễn.\n- Thích dùng công cụ, máy móc, thao tác bằng tay chân.\n- Kiên nhẫn, bền bỉ, có tính kỷ luật và trật tự.\n- Thường ít nói, khiêm tốn, nhưng đáng tin cậy. Không thích công việc trừu tượng, lý thuyết hay giao tiếp quá nhiều.',
      I: '- Tò mò, ham học hỏi, thích đặt câu hỏi “Tại sao?”, “Như thế nào?”.\n- Hướng nội, thích làm việc độc lập.\n- Tư duy logic, phân tích, có khả năng suy luận và phản biện tốt.\n- Thích khám phá, phân tích dữ liệu, đọc – viết – nghiên cứu. Có xu hướng cầu toàn và yêu thích tri thức.\n- Thường dè dặt, ít thể hiện cảm xúc, nhưng sâu sắc.',
      A: '- Giàu cảm xúc, tưởng tượng phong phú, thích tự do.\n- Trực giác mạnh, nhạy cảm với cái đẹp, âm thanh, ngôn ngữ.\n- Không thích quy tắc gò bó; dễ “bay bổng” trong ý tưởng.\n- Dễ xúc động, đôi khi thay đổi cảm xúc nhanh.\n- Thích thể hiện bản thân và khác biệt.',
      S: '- Hướng ngoại, ấm áp, dễ đồng cảm và thấu hiểu người khác.\n- Thích giúp đỡ, giảng dạy, chia sẻ kinh nghiệm.\n- Giao tiếp tốt, dễ tạo sự tin tưởng.\n- Thích làm việc nhóm, không thích cạnh tranh gay gắt.\n- Nhạy bén với cảm xúc người khác, có khả năng “đọc” tâm lý tốt.',
      E: '- Tự tin, năng động, thích ảnh hưởng và thuyết phục người khác.\n- Hướng ngoại, nhiệt huyết, thích cạnh tranh và thành tích.\n- Quyết đoán, mạo hiểm, không ngại thử thách.\n- Có khả năng tổ chức, lãnh đạo, đưa ra tầm nhìn.\n- Thường hướng tới quyền lực, vị thế, và thành công vật chất.',
      C: '- Tỉ mỉ, cẩn thận, trung thực và đáng tin cậy.\n- Thích quy tắc, trình tự, làm việc có kế hoạch rõ ràng.\n- Không thích rủi ro hay mơ hồ; thích sự ổn định.\n- Giỏi quản lý thông tin, dữ liệu, hồ sơ.\n- Tôn trọng quyền hạn và quy trình.'
    };
    return desc[code] || '';
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' , paddingLeft: '1rem', paddingRight: '1rem'}}>
      <div className="card text-center mb-4" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
        border: 'none'
      }}>
        <h1 style={{ 
          color: 'white', 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          marginBottom: '1rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Kết quả đánh giá nghề nghiệp của bạn
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'rgba(255,255,255,0.9)', 
          marginTop: '1rem',
          marginBottom: '1.5rem'
        }}>
          Dựa trên câu trả lời của bạn, loại tính cách hàng đầu của bạn là:
        </p>
        <div style={{
          background: 'white',
          display: 'inline-block',
          padding: '1.5rem 3rem',
          borderRadius: '50px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
        }}>
          <p style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            color: '#667eea', 
            margin: 0,
            letterSpacing: '0.1em'
          }}>
            {result.riasecCode || 'N/A'}
          </p>
        </div>
      </div>

      {/* RIASEC Profile Card */}
      <div className="card mb-4" style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: 'none'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '3px solid #f0f0f0'
        }}>
          <span style={{ fontSize: '2.5rem', marginRight: '1rem' }}>📊</span>
          <h2 style={{ margin: 0, color: '#333', fontSize: '2rem', fontWeight: 'bold' }}>
            Hồ sơ RIASEC của bạn
          </h2>
        </div>
        {result.details && Object.keys(result.details).length > 0 ? (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {Object.entries(result.details)
              .sort(([,a],[,b]) => b - a)
              .map(([code, score], index) => (
                <div key={code} style={{
                  display:'flex',
                  justifyContent:'space-between',
                  alignItems:'center',
                  padding:'1.5rem',
                  background: index === 0 ? 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' : '#f8f9fa',
                  borderRadius:'12px',
                  border: index === 0 ? '2px solid #2196f3' : 'none',
                  boxShadow: index === 0 ? '0 4px 12px rgba(33, 150, 243, 0.2)' : 'none',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      {index === 0 && <span style={{ marginRight: '0.5rem' }}>⭐</span>}
                      <strong style={{ fontSize: '1.2rem', color: '#333' }}>
                        {getCategoryName(code)} ({code})
                      </strong>
                    </div>
                    <div style={{ fontSize:'0.95rem', color:'#666', lineHeight: '1.5' }}>
                      {getCategoryDescription(code)}
                    </div>
                  </div>
                  <div style={{
                    minWidth: '80px',
                    textAlign: 'center',
                    marginLeft: '1rem'
                  }}>
                    <div style={{ 
                      fontSize:'2rem', 
                      fontWeight:'bold', 
                      color: index === 0 ? '#2196f3' : '#007bff'
                    }}>
                      {score || 0}%
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: '#e0e0e0',
                      borderRadius: '10px',
                      marginTop: '0.5rem',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${score || 0}%`,
                        height: '100%',
                        background: index === 0 ? 'linear-gradient(90deg, #2196f3, #64b5f6)' : 'linear-gradient(90deg, #007bff, #4dabf7)',
                        borderRadius: '10px',
                        transition: 'width 0.5s ease'
                      }}></div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        ) : (
          <p style={{ color:'#666', textAlign: 'center', fontSize: '1.1rem' }}>
            Không có chi tiết điểm số khả dụng.
          </p>
        )}
      </div>

      {/* Career Guidance Card */}
      <div className="card mb-4" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '1rem',
        borderRadius: '16px',
        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
        border: 'none'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            margin: 0,
            textAlign: 'center',
            color: 'white', 
            fontSize: '2rem', 
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Hướng dẫn nghề nghiệp cho kết quả của bạn
          </h2>
        </div>
        {result.riasecCode ? (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {result.riasecCode.split('').map((code, index) => (
              <div key={index} style={{
                padding: '1.2rem',
                background: 'white',
                borderRadius: '16px',
                boxShadow: index === 0 ? '0 10px 30px rgba(0,0,0,0.2)' : '0 6px 15px rgba(0,0,0,0.1)',
                border: index === 0 ? '3px solid #ffd700' : 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = index === 0 ? '0 10px 30px rgba(0,0,0,0.2)' : '0 6px 15px rgba(0,0,0,0.1)';
              }}>
                {index === 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                    color: '#333',
                    padding: '0.75rem 1.5rem',
                    borderBottomLeftRadius: '16px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}>
                    ⭐ Kết quả chính
                  </div>
                )}
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  paddingTop: index === 0 ? '0.5rem' : '0'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    marginRight: '1.5rem',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                  }}>
                    {code}
                  </div>
                  <h3 style={{ 
                    color: '#333', 
                    margin: 0,
                    fontSize: '1.8rem',
                    fontWeight: 'bold'
                  }}>
                    {getCategoryName(code)}
                  </h3>
                </div>

                <div style={{ 
                  marginBottom: '1.5rem',
                  padding: '1.5rem',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  borderLeft: '4px solid #667eea'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>👤</span>
                    <strong style={{ color: '#333', fontSize: '1.15rem' }}>Đặc điểm tính cách</strong>
                  </div>
                  <p style={{ color: '#555', margin: 0, lineHeight: '1.7', fontSize: '1rem', whiteSpace: 'pre-line' }}>
                    {getCategoryDescriptionTV(code)}
                  </p>
                </div>

                <div style={{ 
                  marginBottom: '1.5rem',
                  padding: '1.5rem',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  borderLeft: '4px solid #764ba2'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>🏢</span>
                    <strong style={{ color: '#333', fontSize: '1.15rem' }}>Môi trường làm việc lý tưởng</strong>
                  </div>
                  <p style={{ color: '#555', margin: 0, lineHeight: '1.7', fontSize: '1rem' }}>
                    {getWorkEnvironment(code)}
                  </p>
                </div>

                <div style={{
                  padding: '1.5rem',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  borderLeft: '4px solid #667eea'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>💼</span>
                    <strong style={{ color: '#333', fontSize: '1.15rem' }}>Con đường sự nghiệp điển hình</strong>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {getCareerPaths(code).map((career, i) => (
                      <span key={i} style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '30px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                      }}>
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '12px'
          }}>
            <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>🤔</span>
            <p style={{ color: 'white', fontSize: '1.2rem', margin: 0 }}>
              Không có thông tin hướng nghiệp khả dụng.
            </p>
          </div>
        )}
      </div>

      {/* Recommended Careers Card */}
      {careers.length > 0 && (
        <div className="card mb-4" style={{ 
          background: 'white', 
          padding: '2.5rem',
          borderRadius: '16px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
          border: 'none'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '2rem',
            paddingBottom: '1.5rem',
            borderBottom: '3px solid #f0f0f0'
          }}>
            <span style={{ fontSize: '2.5rem', marginRight: '1rem' }}>🎓</span>
            <h2 style={{ margin: 0, color: '#333', fontSize: '2rem', fontWeight: 'bold' }}>
              Nghề nghiệp được đề xuất
            </h2>
          </div>
          <div style={{ display:'grid', gap:'1.5rem' }}>
            {careers.map((c, idx) => (
              <div key={c._id} style={{ 
                padding:'2rem', 
                borderRadius:'16px', 
                background: idx % 2 === 0 
                  ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' 
                  : 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
                boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                e.currentTarget.style.borderColor = idx % 2 === 0 ? '#667eea' : '#e0c3fc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = 'transparent';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1.25rem',
                    fontSize: '1.8rem',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}>
                    💡
                  </div>
                  <h3 style={{ 
                    color:'#333', 
                    margin: 0, 
                    fontSize: '1.6rem', 
                    fontWeight: 'bold'
                  }}>
                    {c.name}
                  </h3>
                </div>
                {c.description && (
                  <p style={{ 
                    color:'#555', 
                    lineHeight: '1.7', 
                    marginBottom: '1.5rem',
                    fontSize: '1.05rem',
                    paddingLeft: '1rem',
                    borderLeft: '3px solid rgba(0,0,0,0.1)'
                  }}>
                    {c.description}
                  </p>
                )}
                {c.skills && c.skills.length > 0 && (
                  <div>
                    <strong style={{ 
                      color: '#333', 
                      marginBottom: '0.75rem', 
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '1.1rem'
                    }}>
                      <span style={{ marginRight: '0.5rem' }}>🛠️</span>
                      Kỹ năng cần thiết:
                    </strong>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem' }}>
                      {c.skills.map((skill,i)=>(
                        <span key={i} style={{ 
                          background:'white', 
                          padding:'0.65rem 1.25rem', 
                          borderRadius:'25px', 
                          fontSize:'0.95rem',
                          color: '#333',
                          fontWeight: '500',
                          boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 5px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.1)';
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="text-center mt-4" style={{ paddingBottom: '2rem' }}>
        <button 
          onClick={()=>navigate('/quiz')} 
          className="btn btn-secondary" 
          style={{ 
            marginRight:'1.5rem',
            padding: '1rem 2.5rem',
            fontSize: '1.15rem',
            borderRadius: '30px',
            border: 'none',
            background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
            color: 'white',
            fontWeight: '600',
            boxShadow: '0 6px 15px rgba(108, 117, 125, 0.3)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(108, 117, 125, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(108, 117, 125, 0.3)';
          }}>
          Làm lại bài test
        </button>
        <button 
          onClick={()=>navigate('/')} 
          className="btn"
          style={{
            marginRight:'1.75rem',
            marginTop: '20px',
            padding: '1rem 2.5rem',
            fontSize: '1.15rem',
            borderRadius: '30px',
            border: 'none',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: '600',
            boxShadow: '0 6px 15px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(102, 126, 234, 0.3)';
          }}>
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Result;