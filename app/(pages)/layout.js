"use client";

import { Provider } from 'react-redux';
import store from '@/store';
import './globals.css'
import NavBar from '../components/NavBar';
import { Toaster } from '@/components/ui/toaster';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Provider store={store}>
          <div className="min-h-screen bg-white">
          <Toaster/>
            <NavBar />
            <div className="flex">
              <main className="flex-1 ml-0  p-8">
                <div className="flex justify-between items-center mb-6">
                </div>
                <div className="bg-white rounded-lg  p-6">
                    {children}
                </div>
              </main>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
