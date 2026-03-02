import React from 'react';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <main className="flex flex-col min-h-screen">
        {children}
      </main>
      {/* Footer */}
      <footer className="bg-primary-900 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-primary-300">© 2026 FindMyLawyer - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};
