import Image from "next/image";
import { SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon } from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState);

    // console.log(session)
    
  return (
    <div className="shadow-sm border-b bg-white top-0 z-50 sticky">
        <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto">
            {/* left */}

            <div onClick={() => router.push('/')} className="relative hidden lg:inline-grid w-24 cursor-pointer">
                <Image
                    src='https://links.papareact.com/ocw'
                    alt="insta logo"
                    layout="fill"
                    objectFit="contain"
                />
            </div>

            <div onClick={() => router.push('/')} className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
            <Image
                    src='https://links.papareact.com/jjm'
                    alt="insta logo"
                    layout="fill"
                    objectFit="contain"
                />
            </div>

            {/* middle */}
            <div className="max-w-xs">
                <div className="relative mt-1 p-3 rounded-md">
                    <div className="absolute inset-y-0 flex pl-3 items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-500"/>
                    </div>
                    <input className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black" type="text" placeholder="Search" />
                </div>
            </div>

            {/* right */}
            <div className="flex items-center justify-end space-x-4">
                <HomeIcon className="navBtn" onClick={() => router.push('/')} />
                <MenuIcon className="h-6 md:hidden cursor-pointer" />

                {session ? (
                <>
                    <div className="relative navBtn">
                        <PaperAirplaneIcon className="navBtn rotate-45" />
                        <div className="absolute -top-1 -right-3 text-xs w-5 h-5 rounded-full bg-red-500 flex items-center justify-center animate-pulse text-white" >3</div>
                    </div>
                    <PlusCircleIcon onClick={() => setOpen(open => !open)} className="navBtn" />
                    <UserGroupIcon className="navBtn" />
                    <HeartIcon className="navBtn" />

                    <img onClick={signOut} src={session?.user?.image} className="h-10 rounded-full w-10 cursor-pointer" alt="profile pic" />
                </>
                ):(
                    <button onClick={signIn}>Sign In</button>
                )}
                
            </div>

        </div>
    </div>

    
  )
}

export default Header