import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '40px 24px',
          textAlign: 'center',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          color: 'var(--navy)',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ marginBottom: 8, fontSize: '1.3rem' }}>
            {this.props.title || 'Something went wrong'}
          </h2>
          <p style={{ color: 'var(--gray)', marginBottom: 20, maxWidth: 400, lineHeight: 1.6 }}>
            {this.props.message || 'An unexpected error occurred. Please try refreshing the page.'}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '10px 24px',
              border: '2px solid var(--navy)',
              background: 'var(--white)',
              color: 'var(--navy)',
              fontFamily: 'inherit',
              fontSize: '0.85rem',
              fontWeight: 600,
              borderRadius: 10,
              cursor: 'pointer',
            }}
          >
            {this.props.retryText || 'Try Again'}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
