// components/NoPageModal.jsx
const NoPageModal = ({ onClose }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: '#f8d7da',
        color: '#721c24',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <span style={{ fontSize: '24px' }}>!</span>
      </div>
      <h3 style={{
        margin: '0 0 16px 0',
        color: '#333',
        fontWeight: '600'
      }}>No Pages are Activated</h3>
      <button
        onClick={onClose}
        style={{
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
          cursor: 'pointer',
          fontWeight: '500',
          marginTop: '8px'
        }}
      >
        Close
      </button>
    </div>
  </div>
);
export default NoPageModal;
