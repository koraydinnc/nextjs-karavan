import NavBar from '@/app/components/NavBar';
import React from 'react';

const Page = () => {
  return (
    <div className="grid grid-rows">
      {/* Navbar kısmı */}
      <div className="grid grid-cols-1">
        <NavBar />
      </div>

      {/* Diğer içerikler */}
      <div className="py-4">
        <h2>Search Bar</h2>
        {/* Search Bar component burada olabilir */}
      </div>

      <div className="py-4">
        <h2>İçerikler</h2>
        {/* Ana içerikler burada gösterilebilir */}
      </div>

      <div className="py-4">
        <h2>Fikirler</h2>
        {/* Fikirler ile ilgili içerikler */}
      </div>

      <footer className="py-4">
        <h2>Footer</h2>
        {/* Footer içerikleri burada */}
      </footer>
    </div>
  );
};

export default Page;
