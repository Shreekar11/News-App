'use client';
import { Nunito } from 'next/font/google';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../firebase/firebaseApp';
import { Toaster, toast } from 'sonner';


const inter = Nunito({ subsets: ['latin'] });

export default function Page() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const auth = getAuth();

  const handleRegister = async (e:any) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      toast.success('Registration Successful');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success('Registration Successful');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
    // console.log(result.user);
  };


  return (
    <main className={inter.className}>

      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="bg-slate-300 p-10 rounded-lg shadow-xl w-96">
          <h1 className='flex justify-center items-center  font-semibold text-2xl mb-5'>Sign In</h1>
          <input
            className='w-full p-3 mb-4 rounded outline-none placeholder-slate-500'
            type="email"
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='w-full p-3 mb-4 rounded outline-none placeholder-slate-500'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleRegister}
            className='w-full p-2 mb-3 bg-slate-200 rounded hover:bg-slate-100'>
            <p className='font-medium'>
              Sign up
              <Toaster richColors position="top-center" />
            </p>
          </button>
          <button
            onClick={handleGoogle}
            className='w-full p-2 mb-3 bg-slate-200 rounded hover:bg-slate-100'>
            <p className='font-medium'>
              Sign up with <p className='text-2xl font-semibold'><span className=' text-blue-600'>G</span><span className='text-red-600'>o</span><span className=' text-yellow-500'>o</span><span className='text-blue-600'>g</span><span className='text-green-600'>l</span><span className='text-red-600'>e</span></p>
              <Toaster richColors position="top-center" />
            </p>
          </button>

          {/* <Link href='/register' className='hover:text-red-500' onClick={() => router.push('/register')}>Click here to register</Link> */}
        </div>
      </div>

    </main>
  )
}