"use client";
import { useEffect } from 'react';
import GoogleIcon from 'public/images/google.svg';
import Script from 'next/script';
import Image from 'next/image';


export default function GoogleButton() {
    useEffect(() => {
        function handleCredentialResponse(response: any) {
          // console.log(response.credential);
        //   console.log("Encoded JWT ID token: " + response.credential);
            // var myHeaders = new Headers();
            location.href = `/api/google/callback?token=${response.credential}${location.href.split("?token=").length>1 ? '&link='+location.href.split("?token=")[1].split("&")[0]: ''}`;
        }
    
        // Execute code when the component is mounted
        (window as any)?.google?.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          login_uri: process.env.DOMAIN,
        });

        (window as any)?.google?.accounts.id.disableAutoSelect();
    
        
        (window as any)?.google?.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { type: "stander", theme: "filled_white", size: "large", shape: "rectangular", width: "300px", height:"50px", logo_alignment: "center" ,font_family:"Arial, sans-serif", font_size:"18px", padding:"0px", position:"relative"  } // customization attributes
        );
    
        // document.getElementById("nsm7Bb-HzV7m-LgbsSe-MJoBVe")?.classList.add("rounded-none");
        // (window as any)?.google?.accounts.id.prompt(); // also display the One Tap dialog
      }, []);

    return <div>
       
        
        <div id="buttonDiv" className={`w-[300px]]   flex justify-center p-2 mt-3 rounded-xl text-3xl`}>
          <div className='flex justify-center bg-[#202020] text-white w-[300px] h-[50px] pl-2 pr-2 text-lg rounded-xl'><img src="/images/google.svg" alt="Google Logo" width={20} height={20} className="mb-1" /><span className='mt-2 ml-2'>sign in with Google</span></div>
        </div>
{/* <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" async /> */}
    </div>
}