"use client";

import * as React from "react";
import CitiesList from "../../app/CityList.json";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ListCity({ onFocus, onChange }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedCity, setSelectedCity] = React.useState(null);

  const handleSelect = (city) => {
    onChange(city.name);
    setSelectedCity(city);
    setOpen(false);
  };

  const CitySelectButton = (
    <Button 
      variant="ghost" 
      onFocus={onFocus} 
      className="w-[150px] justify-between"
      role="combobox"
      aria-expanded={open}
    >
      <div className="flex flex-col">
        <span className="text-start">Yer</span>
      <span className="text-gray-500">{selectedCity ? selectedCity.name : "Gidilecek Yerleri Arayın"}</span>
    
        </div>      
        
    </Button>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{CitySelectButton}</PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <CityList onFocus={onFocus} onSelect={handleSelect} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{CitySelectButton}</DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CityList onSelect={handleSelect} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CityList({ onSelect, onFocus }) {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput onFocus={onFocus} placeholder="Şehir ara..." className="border-none focus:ring-0" />
      <CommandList>
        <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
        <CommandGroup className="max-h-[200px] overflow-auto">
          {CitiesList.map((city) => (
            <CommandItem 
              key={city.id} 
              value={city.name} 
              onSelect={() => onSelect(city)}
              className="cursor-pointer hover:bg-gray-100"
            >
              {city.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
