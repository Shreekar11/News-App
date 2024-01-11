"use client";
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from "next/navigation";
import { Nunito } from 'next/font/google';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseApp';
import { signOut } from 'firebase/auth';
import { Toaster, toast } from 'sonner';


const inter = Nunito({ subsets: ['latin'] });

export default function Navbar() {
    const router = useRouter();

    const [isClick, setisClick] = useState(false);
    const toggleNavbar = () => {
        setisClick(!isClick);
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Sign-out successful");
            toast.success("Sign-out Successful");
            router.push('/');
        } catch (error) {
            console.log("An error happened");
            toast.error("An error occurred during logout");
        }
    };

    const [user] = useAuthState(auth);

    // console.log(user?.displayName);

    return (
        <div className={inter.className}>
            <nav className='bg-slate-200'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className=" flex items-center">
                            <div className="flex-shrink-0 text-4xl">
                                <Link href="/" className=' font-extrabold'>News<span className='font-extrabold text-red-500'>App.</span></Link>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-5 text-xl flex items-center space-x-2 gap-4">
                                <Link href="/" onClick={() => router.push('/')} className='hover:text-red-500'>Home</Link>
                                {user && <Link href="/saved-news" onClick={() => router.push('/saved-news')} className='hover:text-red-500 '>Saved News</Link>}
                                {user && <p className='text-red-500 font-semibold hover:text-black hover:cursor-pointer'>{user.displayName}</p>}
                                {user && <div>|</div>}

                                {
                                    !user ? (
                                        <button onClick={() => router.push('/sign-in')} className='hover:text-red-500'>Sign In</button>
                                    ) : (
                                        <button onClick={handleSignOut} className='hover:text-red-500'>Sign Out</button>
                                    )
                                }
                                <Toaster richColors position="top-center" />


                            </div>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button
                                className='inline-flex items-center justify-center p-2 rounded-md md:text-black hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-inset'
                                onClick={toggleNavbar}
                            >
                                {isClick ? (
                                    <svg
                                        className='h-6 w-6'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M6 18L18 6M6 6l12 12'
                                        />

                                    </svg>
                                ) : (
                                    <svg
                                        className='h-6 w-6'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M4 6h16M4 12h16m-7 6h7'
                                        />

                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {isClick && (
                    <div className="md:hidden">
                        <div className="flex flex-col items-start px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link href="/" onClick={() => router.push('/')} className='hover:text-red-500 '>Home</Link>
                            {user && <Link href="/saved-news" onClick={() => router.push('/saved-news')} className='hover:text-red-500 '>Saved News</Link>}

                            {user && <h1 className='text-red-500 font-semibold'>{user.displayName}</h1>}

                            {
                                !user ? (
                                    <button onClick={() => router.push('/sign-in')} className='hover:text-red-500'>Sign In</button>
                                ) : (
                                    <button onClick={handleSignOut} className='hover:text-red-500'>Sign Out</button>
                                )
                            }
                            <Toaster richColors position='top-center' />
                        </div>
                    </div>
                )}
            </nav>

        </div>
    )
}
