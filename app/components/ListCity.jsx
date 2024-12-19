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

export function ListCity({ value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedCity, setSelectedCity] = React.useState(null);

  const handleSelect = (city) => {
    onChange(city.name);
    setSelectedCity(city);
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedCity ? <>{selectedCity.name}</> : <>Şehirler</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <CityList onSelect={handleSelect} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedCity ? <>{selectedCity.name}</> : <>Şehirler</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CityList onSelect={handleSelect} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CityList({ onSelect }) {
  return (
    <Command>
      <CommandInput placeholder="Şehir ara..." />
      <CommandList>
        <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
        <CommandGroup>
          {CitiesList.map((city) => (
            <CommandItem
              key={city.id}
              value={city.name}
              onSelect={() => onSelect(city)}
            >
              {city.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
