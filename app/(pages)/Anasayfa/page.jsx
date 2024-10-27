import NavBar from '@/app/components/NavBar';
import React from 'react';

const Page = () => {
  return (
    <div className="grid grid-rows">
      <div className="grid grid-cols-1">
      </div>

      <div className="py-4">
        <h2>Search Bar</h2>
      </div>

      <div className="py-4">
        <h2>İçerikler</h2>
      </div>

      <div className="py-4">
        <h2>Fikirler</h2>
      </div>

      <footer className="py-4">
        <h2>Footer</h2>
      </footer>
    </div>
  );
};

export default Page;
