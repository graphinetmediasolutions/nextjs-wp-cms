"use client";

import Image from "next/image";
import SafeHeading from "../safeHtml/SafeHeading";

export default function Hero({ data }: any) {
    return (
        <div className="relative w-full h-[38rem]">
            {/* Background image */}
            <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                alt="Hero Background"
                fill
                priority
                className="object-cover object-center"
            />


            {/* Overlay */}
            <div className="relative z-10 w-full h-full bg-gray-900/40 flex items-center justify-start">
                <div className="container">
                    <div className="">
                        {/* <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                            Build your new <span className="text-blue-400">SaaS</span> Project
                        </h1> */}

                        <SafeHeading
                        as="h1"
                        className="text-3xl font-semibold text-white lg:text-4xl"
                            html={data?.title || ""}
                        />

                
                    </div>
                </div>

            </div>
        </div>
    );
}
