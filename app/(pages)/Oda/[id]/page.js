'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  
  const {id} = useParams()
  return <div>Test {id}</div>;
};

export default Page;
