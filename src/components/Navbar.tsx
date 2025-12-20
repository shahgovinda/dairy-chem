import React from 'react'
import { CheckSquare, CheckSquare2, Mail, Menu, Search, X } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from './ui/button'
import { motion, AnimatePresence } from "motion/react";
import  dairychem from '../data/dairychem.json';
import logo from '../assets/logo.jpeg'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'


const Navbar = () => {
    const navigate = useNavigate();

    const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false)
    return (
        <header className='bg-white border-b border-gray-800 z-40'>
            <div className=' '>

                {/* <div className='bg-primary py-2 md:py-1 px-4 md:px-10 lg:px-0'>
                    <div className='md:max-w-6xl text-white  mx-auto  flex items-center justify-between '>
                        <Link to={"mailto:" + dairychem[0].email} className='hidden md:flex text-sm items-center gap-2 font-bold '> <Mail size={15} />
                            {dairychem[0].email}</Link>
                        <span className='w-50 relative md:w-70 border rounded-lg cursor-text text-xs md:text-base flex items-center gap-3 justify-center text-white/80 h-6  md:h-7 border-white/60'  >
                            <Search size={15} /> Search 7000+ Chemicals
                        </span>

                        <span className='flex items-center gap-6'>
                            <img className='w-4 lg:w-5 cursor-pointer ' src="https://cdn.brandfetch.io/idJFz6sAsl/theme/dark/id745SkyD0.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" />
                            <img className='w-4 lg:w-5 cursor-pointer ' src="https://cdn.brandfetch.io/idpKX136kp/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" />
                            <a href="https://www.instagram.com/dairychem?igsh=bnc5dGdoZm5uM212ZQ" target="_blank"><img className='w-4 lg:w-5 cursor-pointer' src="https://cdn.brandfetch.io/ido5G85nya/theme/light/idmP9VWUNi.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" /></a>
                            <img className='w-4 lg:w-5 cursor-pointer' src="https://cdn.brandfetch.io/idS5WhqBbM/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" />
                            <img className='w-5 cursor-pointer' src="https://cdn.brandfetch.io/idVfYwcuQz/theme/light/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="" />
                        </span>
                    </div>
                </div> */}

                {/* brand */}
                <div className='px-3 lg:px-0 my-5  lg:max-w-6xl mx-auto flex md:flex-row flex-col items-center  justify-between '>
                    <div className='flex  w-full lg:w-auto items-center justify- gap-2' >
                        <Button size={'icon'} className='bg-primary lg:hidden text-white ' type='button' onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
                            <Menu size={23} />
                        </Button>
                        <Link to={"/"} className='flex items-center gap-2'>
                            <span className=' brightness-140 border-primary p-1'>
                                <img src={logo} className='size-14' alt="" />
                            </span>
                            <span>
                                <h1 className='text-lg md:text-2xl font-black text-primary'>DairyChem Pharma Machineries</h1>
                                <p className='text-[9px] font-semibold md:text-xs'>Manufacturers, Suppliers, and Exporters of all Types of Machinery to Set up a Plant</p>
                            </span>
                        </Link>

                    </div>

                    {/* Mobile Navigation Drawer */}
                    <AnimatePresence>
                        {isMobileNavOpen && (
                            <motion.aside
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'tween', duration: 0.3 }}
                                className="fixed top-0 left-0 z-50 w-screen h-full bg-primary shadow-lg flex flex-col"
                            >
                                <div className="flex  items-center justify-between p-4 border-b">
                                    <div className="flex items-center gap-2">
                                        <span className='border border-primary p-1'>
                                            <img src="/Brand Logo.png" className='size-10 rounded-sm' alt="" />
                                        </span>
                                        <h1 className='text-lg font-extrabold text-white'>LABPRO CHEM</h1>
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => setIsMobileNavOpen(false)}
                                        aria-label="Close menu"
                                    >
                                        <X size={21} />
                                    </Button>
                                </div>
                                <nav className="flex flex-col gap-6 p-4">
                                    {/* {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                            onClick={() => setIsMobileNavOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))} */}
                                    <Link
                                        to={'/'}
                                        className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to={'/about'}
                                        className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        About
                                    </Link>
                                    <Link
                                        to={'/companies'}
                                        className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        Companies
                                    </Link>

                                    <Accordion type="single" className='' collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="text-white focus:bg-violet-400 font-semibold py-2 text-base px-2 rounded hover:bg-violet-400">Laboratory Chemicals</AccordionTrigger>
                                            <AccordionContent className='bg-violet-500 p-4 text-primary flex flex-col gap-2 rounded-b-lg'>
                                                <Link
                                                    to={'/chemicals'}
                                                    className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                                    onClick={() => setIsMobileNavOpen(false)}
                                                >
                                                    All Chemicals
                                                </Link>
                                                <Link
                                                    to={'/categories'}
                                                    className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                                    onClick={() => setIsMobileNavOpen(false)}
                                                >
                                                    By Category
                                                </Link>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>

                                    {/* <Link
                                        to={'/events'}
                                        className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        Events
                                    </Link> */}
                                    <Link
                                        to={'/gallery'}
                                        className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        Gallery
                                    </Link>
                                    <Link
                                        to={'/contact'}
                                        className="text-white font-semibold py-2 px-2 rounded hover:bg-violet-400"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        Contact
                                    </Link>

                                </nav>
                            </motion.aside>
                        )}
                    </AnimatePresence>

                    {/* <div className='flex mx-auto md:mx-0 item-center md:gap-10 md:mt-0 mt-5 gap-4 text-[8px] md:text-base'>
                        <span className='flex flex-col items-start md:items-end font-semibold'>
                            <p className='flex items-center gap-1'><CheckSquare2 size={20} /> Certified</p>
                            <p>ISO 9001:2008 + more</p>
                        </span>
                        <span className='flex flex-col items-start md:items-end font-semibold'>
                            <p className='flex items-center gap-1'><CheckSquare2 size={20} /> The Best</p>
                            <p>Quality Control</p>
                        </span>
                        <span className='flex flex-col items-start md:items-end font-semibold'>
                            <p className='flex items-center gap-1'><CheckSquare2 size={20} /> Certified</p>
                            <p>ISO 9001:2008 + more</p>
                        </span>


                    </div> */}
                </div>



                {/* navigation */}
                <nav className='w-full bg-primary hidden lg:block'>
                    <div className='max-w-6xl mx-auto flex items-center justify-between  py-3'>
                        <NavigationMenu viewport={false} className=''>
                            <NavigationMenuList className=' text-white' >

                                <NavigationMenuItem className=''>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/">Home</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/about">About</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/companies">Companies</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Laboratory Chemicals</NavigationMenuTrigger>
                                    <NavigationMenuContent className='  '>
                                        <ul className=' p-1 font-bold  w-64 text-sm'>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <Link to="/chemicals">All Chemicals</Link>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <Link to="/categories">Browse By Category</Link>
                                                </NavigationMenuLink>
                                            </li>
                                            
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/downloads">Downloads</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/coa">COA</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                {/* <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/events">Events</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem> */}

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/gallery">Gallery</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to="/contact">Contact</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>


                            </NavigationMenuList>
                        </NavigationMenu>

                        {/* <Link to="/chemicals" className='text-white p-2 hover:bg-white rounded-lg hover:text-black cursor-pointer'><Search size={20} /></Link> */}
                    </div>
                </nav>




            </div>


        </header>
    )
}

export default Navbar