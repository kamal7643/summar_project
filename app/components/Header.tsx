"use client";
import { AppBar, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { MdMenu } from "react-icons/md";
import { useState } from 'react';
import Link from 'next/link';
const Header: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <AppBar position="relative">
            <Toolbar className="flex space-x-4 ">
                {
                    isMobile ? <div className='flex items-center space-x-4'>
                        <Link href="/" legacyBehavior>
                            <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
                                <MdMenu onClick={() => setIsOpen(!isOpen)} />
                            </Typography>
                        </Link>
                        <Link href="/" legacyBehavior>
                            <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer text-[18px]">
                                Alpha Second
                            </Typography>
                        </Link>
                    </div> : <div className='w-full flex justify-between'>
                        <Link href="/" legacyBehavior>
                            <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer text-[18px]">
                                Alpha Second
                            </Typography>
                        </Link>
                        <div className='flex space-x-4'>
                            <Link href="/" legacyBehavior>
                                <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
                                    Home
                                </Typography>
                            </Link>
                            <Link href="/about" legacyBehavior>
                                <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
                                    About
                                </Typography>
                            </Link>
                            <Link href="/signin" legacyBehavior>
                                <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
                                    Signin
                                </Typography>
                            </Link>
                        </div>
                    </div>
                }

            </Toolbar>
            {
                isOpen && <Toolbar>

                    <div className='space-y-4 mb-[20px]'>
                        <Link href="/" legacyBehavior>
                            <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
                                Home
                            </Typography>
                        </Link>
                        <Link href="/about" legacyBehavior>
                            <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
                                About
                            </Typography>
                        </Link>
                        <Link href="/signin" legacyBehavior>
                            <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
                            Signin
                            </Typography>
                        </Link>
                    </div>

                </Toolbar>
            }

        </AppBar>
    )
}

export default Header;