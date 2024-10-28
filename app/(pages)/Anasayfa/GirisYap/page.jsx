"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';
import { useLoginMutation } from '@/store/services/authService';


const formSchema = z.object({
  email: z.string().email("Geçersiz email adresi"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
});

const Page = () => {

   const [login, {isLoading, error}] = useLoginMutation()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleFormSubmit = async (values) => {
      try {
         const response = await login(values).unwrap()
         console.log(response)
         toast({
          description: response.message
         })
      } catch (error) {
          console.log(error)
          toast({
            variant: "destructive",
            title: "Bir şeyler yanlış gitti.",
            description: error?.data?.message ,
          });
      }
  };

  return (
    <Form {...form}>
      <Toaster/>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="max-w-md mx-auto rounded-lg shadow-sm">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email Adresinizi Girin." {...field} />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="my-4 mr-4" type="submit">Giriş Yap</Button>
        <Link href="/Anasayfa/KayitOl">
          <Button className="my-4" type="button" variant="outline">Kayıt Ol</Button>
        </Link>
      </form>
    </Form>
  );
};

export default Page;
