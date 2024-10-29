"use client";

import React, { useEffect } from 'react';
import { useRegisterMutation } from '@/store/services/authService';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, { message: "Ad en az 2 karakter olmalıdır." }),
  surname: z.string().min(1, { message: "Soyad en az 2 karakter olmalıdır." }),
  email: z.string().email("Geçersiz email adresi"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
  confirmPassword: z.string().min(6, "Şifre onayı en az 6 karakter olmalıdır.")
}).refine(data => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor.",
  path: ["confirmPassword"],
});

const RegisterForm = () => {
  const [register, {data, isLoading, error }] = useRegisterMutation();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
   data && console.log(data)

   useEffect(() => {
       if (error) {
          toast({
            variant: "destructive",
            title:'Hata',
            description:error.data.message
          })
       }
   },[data, error])

  const handleForm = async (values) => {
    try {
      const response = await register(values).unwrap();
      console.log(data)
      toast({ description: response.message });
      form.reset();
      response.status === 1 && router.push('/Anasayfa/GirisYap');
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    toast({ description: error.data.message });
  }

  return (
    <Form {...form}>
      <Toaster />
        <form onSubmit={form.handleSubmit(handleForm)} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad</FormLabel>
                <FormControl>
                  <Input placeholder="Adınızı girin" {...field} />
                </FormControl>
                <FormDescription>Bu, kamuya açık adınız olacaktır.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soyad</FormLabel>
                <FormControl>
                  <Input placeholder="Soyadınızı girin" {...field} />
                </FormControl>
                <FormDescription>Bu, kamuya açık soyadınız olacaktır.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email adresinizi girin" {...field} />
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
                  <Input type="password" placeholder="Şifrenizi girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şifre Onay</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Şifrenizi onaylayın" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button loading={isLoading} type="submit" disabled={isLoading} className="w-full mt-4">
            Kayıt Ol
          </Button>
        </form>
    </Form>
  );
};

export default RegisterForm;
