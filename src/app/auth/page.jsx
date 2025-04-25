'use client'
import Login from '@/components/Login'
import { auth } from '@/libs/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, {useEffect} from 'react'

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/')
      }
    })

    return () => unsubscribe();
  }, [router])

  return (
    <div className='body-login'>
      <Login/>
    </div>
  )
}

export default page
