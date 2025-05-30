import React from 'react';

const LoadingScreen = () =>{
  return (
    <div className="h-full w-full bg-slate-900 flex flex-col items-center justify-center text-slate-100">
      <div className="w-30 h-30 border-12 border-slate-700 border-t-sky-400 rounded-full animate-spin mb-6"></div>
      <p className="text-xl tracking-wide">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
