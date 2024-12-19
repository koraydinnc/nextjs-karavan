"use client"

import HomeListCard from '@/app/components/HomeListCard';
import LoadingSpin from '@/app/components/LoadingSpin';
import { useListQuery } from '@/store/services/listService';
import React from 'react';

const Page = () => {
  const { data, isLoading, error } = useListQuery();

  if (isLoading) return <LoadingSpin/>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-4">
      {data && data.map((item) => (
        <HomeListCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Page;
