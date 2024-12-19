"use client"

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
import { useSearchMutation } from '../../store/services/searchService';
import { ListCity } from './ListCity';
import { useToast } from '@/hooks/use-toast';
import LoadingSpin from './LoadingSpin';
import { Toaster } from '@/components/ui/toaster';

const SearchBar = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showSearchText, setShowSearchText] = useState(false);
  const [search, { data, isLoading }] = useSearchMutation();
  const { toast } = useToast();
  const formRef = useRef();


  const form = useForm({
    defaultValues: {
      location: '',
      checkIn: null,
      checkOut: null,
      person: 1,
    }
  });

  if (isLoading) {
     <LoadingSpin/>
  }



  const handleForm = async (value) => {
    if (checkOutDate && checkInDate && checkOutDate < checkInDate) {
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Çıkış tarihi giriş tarihinden önce olamaz.',
      });
      return;
    }

    if (!value.checkOut || !value.checkIn || !value.location || !value.person) {
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Tüm alanları doldurduğunuzdan emin olun.',
      });
      return;
    }

    const searchData = {
      searchType: "caravan",
      startDate: checkInDate ? format(checkInDate, "yyyy-MM-dd") : null,
      endDate: checkOutDate ? format(checkOutDate, "yyyy-MM-dd") : null,
      person: Number(value.person),
      location: value.location,
    };

    try {
      const response = await search({ searchData }).unwrap();
        toast({
          variant: 'destructive',
          title: 'Hata',
          description: response.message,
      })

      form.reset(); 
    } catch (err) {
      console.error('Arama hatası:', err);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Arama sırasında bir hata oluştu.',
      });
    }
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
            <FormItem className='mx-4 flex flex-col'>
              <FormLabel className="font-bold text-sm text-gray-500">Yer</FormLabel>
              <FormControl>
              <ListCity 
                  value={form.getValues("location")} 
                  onChange={(value) => form.setValue("location", value)} 
                />
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
          name="person"
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
