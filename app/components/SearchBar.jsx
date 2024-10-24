"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Search } from 'lucide-react'; 
import { tr } from 'date-fns/locale';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const SearchBar = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showSearchText, setShowSearchText] = useState(false);
  const formRef = useRef();
  const form = useForm({
    defaultValues: {
      location: '',
      checkIn: null,
      checkOut: null,
      guests: 1,
    }
  });

  const handleForm = (value) => {
    console.log(value);
  };

  const handleFocus = () => setShowSearchText(true);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowSearchText(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Form {...form}>
      <form 
        ref={formRef} 
        onSubmit={form.handleSubmit(handleForm)} 
        className="shadow-md rounded-full bg-white p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center"
      >
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className='mx-4'>
              <FormLabel className="font-bold text-sm text-gray-500">Yer</FormLabel>
              <FormControl>
                <Input className='rounded-lg' placeholder="Gidilecek yerleri arayın" {...field} onFocus={handleFocus} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkIn"
          render={({ field }) => (
            <FormItem className='mx-4'>
              <FormLabel className="font-bold text-sm text-gray-500">Giriş</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full rounded-full" onFocus={handleFocus}>
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      {checkInDate ? format(checkInDate, "PPP", { locale: tr }) : 'Tarih ekleyin'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <CalendarPicker 
                      mode='single'
                      selected={checkInDate} 
                      onSelect={(date) => {
                        setCheckInDate(date);
                        field.onChange(date);
                      }}
                      initialFocus
                      locale={tr} 
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkOut"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-sm text-gray-500">Çıkış</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full rounded-full" onFocus={handleFocus}>
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      {checkOutDate ? format(checkOutDate, 'PPP', { locale: tr }) : 'Tarih ekleyin'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <CalendarPicker 
                      mode='single'
                      selected={checkOutDate} 
                      onSelect={(date) => {
                        setCheckOutDate(date);
                        field.onChange(date);
                      }}
                      initialFocus
                      locale={tr}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem className='mx-2'>
              <FormLabel className="font-bold text-sm text-gray-500">Kişiler</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Misafir ekleyin" 
                  {...field} 
                  value={field.value ?? ''} 
                  onFocus={handleFocus}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="col-span-1 flex justify-center">
          <Button
            type="submit"
            className="bg-green-600 text-white rounded-full p-3 hover:bg-white hover:text-green-700 hover:border"
          >
            <div className="flex items-center gap-2">
              {showSearchText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className='font-bold'>Arama</span>
                </motion.div>
              )}
              <Search className="h-5 w-5" />
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchBar;
