import React from 'react';
import FeedbackSystem from './components/app/FeedbackSystem';
import Routes from './routes/Routes';
import Loading from './components/base/Loading';
import Header from './components/app/Header';

function App() {
  return (
    <div className="App relative" >
      <Loading />
      <Header />
      <div className="app-wrapper" >
        <FeedbackSystem />
        <div className="routes" >
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default App;
