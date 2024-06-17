"use client";
import { useLoadingContext } from "./context/Loading";
import dynamic from "next/dynamic";
const Carousel = dynamic(() => import("./components/Carousel"), { ssr: false });
export default function Home() {
  const { loading, startLoading, stopLoading } = useLoadingContext();
  const handleClick = () => {
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, 3000);
  };
  return (
    <div>
      <Carousel />
      we are live!{" "}
      <button
        className="border p-2 w-[60px] ml-4 shadow bg-blue-400 rounded-xl"
        onClick={handleClick}
      >
        click
      </button>
      <div>
        <button
          className="bg-blue-300 p-2 border border-black shadow"
          onClick={() => (location.href = "/profile")}
        >
          profile
        </button>
      </div>
    </div>
  );
}
