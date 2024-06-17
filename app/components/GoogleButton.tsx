"use client";

import { useEffect } from "react";
import Image from "next/image";
import Script from "next/script";

export default function GoogleButton() {
  // useEffect(() => {
  //   function handleCredentialResponse(response: any) {
  //     location.href = `/api/google/callback?token=${response.credential}${location.href.split("?token=").length > 1 ? "&link=" + location.href.split("?token=")[1].split("&")[0] : ""}`;
  //   }

  //   const initializeGoogleSignIn = () => {
  //     (window as any)?.google?.accounts.id.initialize({
  //       client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  //       callback: (response: any) => {
  //         location.href = `/api/google/callback?token=${response.credential}${location.href.split("?token=").length > 1 ? "&link=" + location.href.split("?token=")[1].split("&")[0] : ""}`;
  //       },
  //       login_uri: process.env.DOMAIN,
  //     });

  //     (window as any)?.google?.accounts.id.disableAutoSelect();

  //     // if (typeof window !== "undefined" ) {
  //     //   (window as any)?.google?.accounts.id.renderButton(
  //     //     document.getElementById("buttonDiv"),
  //     //     {
  //     //       type: "stander",
  //     //       theme: "filled_white",
  //     //       size: "large",
  //     //       shape: "rectangular",
  //     //       width: "300px",
  //     //       height: "50px",
  //     //       logo_alignment: "center",
  //     //       font_family: "Arial, sans-serif",
  //     //       font_size: "18px",
  //     //       padding: "0px",
  //     //       position: "relative",
  //     //     },
  //     //   );
  //     // }
  //   };

  //   if (typeof window !== "undefined" && (window as any)?.google) {
  //     initializeGoogleSignIn();
  //   }
  // }, []);

  return (
    <div>
      {/* <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any)?.google) {
            // Initialize the Google Sign-In only after the script has loaded
            (window as any)?.google?.accounts.id.initialize({
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
              callback: (response: any) => (response: any) => {
                location.href = `/api/google/callback?token=${response.credential}${location.href.split("?token=").length > 1 ? "&link=" + location.href.split("?token=")[1].split("&")[0] : ""}`;
              },
              login_uri: process.env.DOMAIN,
            });
            // todo
            // not working with next build
            // not working properly
            // (window as any)?.google?.accounts.id.renderButton(
            //   document.getElementById("buttonDiv"),
            //   {
            //     type: "stander",
            //     theme: "filled_white",
            //     size: "large",
            //     shape: "rectangular",
            //     width: "300px",
            //     height: "50px",
            //     logo_alignment: "center",
            //     font_family: "Arial, sans-serif",
            //     font_size: "18px",
            //     padding: "0px",
            //     position: "relative",
            //   },
            // );
          }
        }}
      /> */}

      <div
        id="buttonDiv"
        className={`w-[300px] flex justify-center p-2 mt-3 rounded-xl text-3xl`}
      >
        <div className="flex justify-center bg-[#202020] text-white w-[300px] h-[50px] pl-2 pr-2 text-lg rounded-xl">
          <Image
            src="/images/google.svg"
            alt="Google Logo"
            width={20}
            height={20}
            className="mb-1"
          />
          <span className="mt-2 ml-2">Sign in with Google</span>
        </div>
      </div>
    </div>
  );
}
