import React from 'react';
import FeedbackSystem from './components/app/FeedbackSystem';
import Routes from './routes/Routes';
import Loading from './components/base/Loading';
import Header from './components/app/Header';

function App() {
  return (
    <section className="App relative" >
      <Loading />
      <Header />
      <main className="app-wrapper" >
        <FeedbackSystem />
        <div className="routes" >
          <Routes />
        </div>
      </main>
    </section>
  );
}

export default App;
