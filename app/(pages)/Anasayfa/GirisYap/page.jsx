"use client"

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email("Geçerli bir email adresi giriniz.").min(6, {
    message: "Email adresinizi giriniz."
  }),
  password: z.string().min(6, "Şifreniz en az 6 karakter olmalıdır.")
});

const Page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className='max-w-md mx-auto rounded-lg shadow-sm'>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email Adresinizi Girin." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Şifrenizi Girin." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
         <Button className="my-4 mr-4" type="submit">Giriş Yap</Button>
        <Link href={"/Anasayfa/KayitOl"}>
        <Button className="my-4" type="submit">Kayıt Ol</Button>
        </Link>

      </form>
    </Form>
  );
};

export default Page;
