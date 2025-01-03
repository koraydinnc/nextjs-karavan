import { ListCity } from "./ListCity";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useState } from "react";

const SearchBar = () => {
   const [gidisTarihi, setGidisTarihi] = useState();
   const [cikisTarihi, setCikisTarihi] = useState();

   return (
      <form className="flex items-center justify-center border  max-w-xl gap-4 p-2 rounded-lg"> 
           <div className="text-sm text-gray-500 mr-4">
               <ListCity />
           </div>
           <div className="h-8 w-[1px] bg-gray-200" />
           <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className={cn("w-[180px] justify-start text-left font-normal", !gidisTarihi && "text-muted-foreground")}>
                    <div className="flex flex-col">
                      <span className="text-xs">Gidiş Tarihi</span>
                      <span className="text-sm">{gidisTarihi ? format(gidisTarihi, "d MMMM yyyy", { locale: tr }) : "Tarih Seçin"}</span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={gidisTarihi}
                    onSelect={setGidisTarihi}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className={cn("w-[180px] justify-start text-left font-normal", !cikisTarihi && "text-muted-foreground")}>
                    <div className="flex flex-col">
                      <span className="text-xs">Çıkış Tarihi</span>
                      <span className="text-sm">{cikisTarihi ? format(cikisTarihi, "d MMMM yyyy", { locale: tr }) : "Tarih Seçin"}</span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={cikisTarihi}
                    onSelect={setCikisTarihi}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
           </div>
      </form>
   )
}

export default SearchBar;