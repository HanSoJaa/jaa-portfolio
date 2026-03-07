import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: 'red', color: 'white', zIndex: 9999, position: 'relative' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.error && this.state.error.stack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from './contexts/ThemeContext';
import Preloader from './components/Preloader.jsx';
import './index.css';

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderFinished = () => {
    setIsLoading(false);
  };

  return (
    <React.Suspense fallback={null}>
      <ThemeProvider>
        <BrowserRouter>
          <ErrorBoundary>
            {isLoading ? (
              <Preloader onFinished={handlePreloaderFinished} />
            ) : (
              <App />
            )}
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </React.Suspense>
  );
};

// Render Main component into the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
