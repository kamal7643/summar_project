"use client";
import React from "react";
import { LoadingProvider, useLoadingContext } from "./context/Loading";
import Loading from "./components/Loading";

function ChildWithLoading({ children }: { children: React.ReactNode }) {
    const { loading } = useLoadingContext();
    return <div>{children}
        {loading && <Loading />}
    </div>
}

export default function ParentProvider({
    children
}: {
    children: React.ReactNode
}){
    return <LoadingProvider>
        <ChildWithLoading>
            {children}
        </ChildWithLoading>
    </LoadingProvider>
}