"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { FaSearch, FaEye,  } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { getLocalStorageItem } from "@/lib/localStorage";

// page to watch videos 

function Watch() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id') || '';


    const [query, setQuery] = useState<string>('');
    const [videos, setVideos] = useState([]);
    const [update, setUpdate] = useState<boolean>(true);

    const handleSearch = async () => {

    }

    useEffect(() => {
        if (update) {

            fetch('/api/user/videos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getLocalStorageItem('token', ''),
                }
            }).then(response => response.json())
                .then(data => {
                    setVideos(data.data);

                })
            setUpdate(false);
        }
    })


    return <div>
        <div className="w-full flex justify-center mt-4 p-4 ">
            <input type="text"
                className="w-full p-2 text-gray-500 rounded"
                placeholder="Search here"
                value={query}
                onChange={(event: any) => setQuery(event.target.value)}
            />
            <button className="flex items-center relative left-[-25px] hover:shadow-xl"> <FaSearch /></button>
        </div>
        <div>
            {id}
        </div>
        <div className="flex flex-wrap">
            {
                videos.map((video:any, index) => <div key={index} className="w-full p-2 " onClick={()=>{
                    location.href="/watch?id="+video._id
                }}>
                    <div className="bg-white w-full h-full rounded max-w-[400px]">
                        {/* video here with no controls */}
                        <div className="p-2 border border-b-black">
                            <video src={video?.url}  />
                        </div>
                        {/* views and likes */}
                        <div className="flex pt-4 pl-4 items-center justify-left space-x-4">
                            <div className="flex items-center space-x-2 justify-left">{video?.views} <FaEye className="ml-2"/></div>
                            <div className="flex items-center space-x-2 justify-left">{video?.likes} <BiLike className="ml-2"/></div>

                        </div>
                        {/* title and description */}
                        <div className="p-4">
                            <h3 className="text-[22px]">{video?.title}</h3>
                            <p>{video?.description}</p>
                        </div>
                        
                    </div>
                </div>)
            }
        </div>
    </div>
}

export default function Page(){
    return <Suspense>
        <Watch/>
    </Suspense>
}