"use client"

import { useListQuery } from '@/store/services/listService';
import React from 'react';

const Page = () => {
  const { data, isLoading, error } = useListQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4">
      <h1>Your Reservations</h1>
      <ul>
        {data && data.map(reservation => (
          <li key={reservation.id}>
            <p>{reservation.name}</p>
            <p>{reservation.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
