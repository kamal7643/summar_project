"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import { useUser } from "../context/User";

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useUser();

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="py-2 bg-light border-bottom">
      <div className="container d-flex flex-wrap">
        <ul className="nav me-auto">
          <li className="nav-item">
            <a
              href="/"
              className="nav-link link-dark px-2 active"
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/ai" className="nav-link link-dark px-2">
              AI
            </a>
          </li>
          <li className="nav-item">
            <a href="/watch" className="nav-link link-dark px-2">
              Watch
            </a>
          </li>
          <li className="nav-item">
            <a href="/chat" className="nav-link link-dark px-2">
              Chat
            </a>
          </li>
          <li className="nav-item">
            <a href="/article" className="nav-link link-dark px-2">
              Atricles
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link link-dark px-2">
              About
            </a>
          </li>
        </ul>
        <ul className="nav">
          <li className="nav-item">
            <a
              href={user ? "/profile" : "/signin"}
              className="nav-link link-dark px-2"
            >
              {user ? (
                <div>
                  <Avatar sx={{ width: 24, height: 24 }}>{user.name[0]}</Avatar>
                </div>
              ) : (
                "Login"
              )}
            </a>
          </li>
          <li className="flex align-middle items-center">{user?.name}</li>
        </ul>
      </div>
    </nav>
  );

  // return (
  //   <AppBar position="relative">
  //     <Toolbar className="flex space-x-4">
  //       {isMobile ? (
  //         <div className="flex items-center space-x-4">
  //           <MdMenu className="text-white hover:text-indigo-300 cursor-pointer" onClick={handleMenuToggle} />
  //           <Link href="/" passHref>
  //             <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer text-[18px]">
  //               Alpha Second
  //             </Typography>
  //           </Link>
  //         </div>
  //       ) : (
  //         <div className="w-full flex justify-between">
  //           <Link href="/" passHref>
  //             <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer text-[18px]">
  //               Alpha Second
  //             </Typography>
  //           </Link>
  //           <div className="flex space-x-4">
  //             <Link href="/" passHref>
  //               <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
  //                 Home
  //               </Typography>
  //             </Link>
  //             <Link href="/about" passHref>
  //               <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
  //                 About
  //               </Typography>
  //             </Link>
  //             <Link href={user ? "/profile" : "/signin"} passHref>
  //               <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
  //                 {user ? "Profile" : "Signin"}
  //               </Typography>
  //             </Link>
  //             <Link href="/gemini" passHref>
  //               <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
  //               Gemini
  //               </Typography>
  //             </Link>
  //           </div>
  //         </div>
  //       )}
  //     </Toolbar>
  //     {isOpen && (
  //       <Toolbar>
  //         <div className="space-y-4 mb-[20px]">
  //           <Link href="/" passHref>
  //             <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
  //               Home
  //             </Typography>
  //           </Link>
  //           <Link href="/about" passHref>
  //             <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
  //               About
  //             </Typography>
  //           </Link>
  //           <Link href={user ? "/profile" : "/signin"} passHref>
  //             <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
  //               {user ? "Profile" : "Signin"}
  //             </Typography>
  //           </Link>
  //           <Link href="/gemini" passHref>
  //             <Typography variant="body1" className="text-white hover:text-indigo-300 cursor-pointer">
  //             Gemini
  //             </Typography>
  //           </Link>
  //         </div>
  //       </Toolbar>
  //     )}
  //   </AppBar>
  // );
};

export default Header;
