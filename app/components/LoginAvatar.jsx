"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  LifeBuoy,
  LogOut,
  Settings,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch } from 'react-redux'
import { clearUser } from '@/store/slices/authSlice'


const LoginAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(clearUser())
    console.log("Çıkış yapıldı!");
  };

  return (
    <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger asChild>
        <Button className='bg-transparent hover:bg-transparent flex items-center gap-1'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {isOpen ? (
            <ChevronUp className="text-gray-500" />
          ) : (
            <ChevronDown className="text-gray-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-lg border border-gray-200 mt-2">
        <DropdownMenuLabel className="font-semibold text-gray-700">Hesabım</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-gray-600 hover:bg-gray-100 rounded-md p-2">
            <User />
            <span>Profil</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-gray-600 hover:bg-gray-100 rounded-md p-2">
            <CreditCard />
            <span>Satışlar</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-gray-600 hover:bg-gray-100 rounded-md p-2">
            <Settings />
            <span>Ayarlar</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-gray-600 hover:bg-gray-100 rounded-md p-2">
            <LifeBuoy />
            <span>Destek</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={handleLogout} 
          className="cursor-pointer flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-md p-2"
        >
          <LogOut />
          <span>Çıkış Yap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LoginAvatar
