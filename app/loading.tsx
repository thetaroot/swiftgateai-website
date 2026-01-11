export default function Loading() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0C2312',
          zIndex: 9999,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              border: '3px solid rgba(245, 243, 237, 0.2)',
              borderTop: '3px solid #F5F3ED',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <div
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: '#F5F3ED',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            }}
          >
            Lädt...
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `,
        }}
      />
    </>
  );
}
