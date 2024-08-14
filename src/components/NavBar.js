import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = ({ title, links }) => {
  return (
    <>

    <div className='border-b border-black '>

    
    <nav className='w-10/12 mx-auto py-5 flex justify-between items-center'>
        <div className='flex items-center gap-2 '>

            <div>
            <Image src="/logo.svg" width={50} height={50} alt='logo img'/>
            </div>

            <div className='hidden md:block'>
            <Link href="/" className='text-[27.37px] font-semibold text-[#2D0050]'>{ title }</Link>
            </div>
            
        </div>

        <ul className='flex flex-col-reverse lg:flex-row gap-3 lg:gap-10 items-center'>

        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className='lg:text-[22px] text-[#292929]'>{link.label}</Link>
          </li>
        ))}

            

            <div>
                <Image src="/profile.svg" width={50} height={50} alt='profile dp' />
            </div> 

        </ul>
        
    </nav>

    </div>


        
    </>
  )
}

export default NavBar