import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const LoginAvatar = () => {
  return (
    <div>
      <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    </div>
  )
}

export default LoginAvatar
