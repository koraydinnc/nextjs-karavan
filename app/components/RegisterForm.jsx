"use client"
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRegisterMutation } from '@/store/services/authService'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

const RegisterForm = () => {

  const [register,{data, isLoading, error}] = useRegisterMutation()
  const form = useForm()

  const handleForm = (values) => {
       console.log(values)
  }
  

  useEffect(() => {
      register()
  },[data])
   

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleForm)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kullanıcı Adı</FormLabel>
              <FormControl>
                <Input placeholder="Kullanıcı Adı" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default RegisterForm
