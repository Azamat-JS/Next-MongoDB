"use client"

import Image from 'next/image'
import { useState } from 'react';
import { Button } from './ui/button';

const ImagesSection = () => {
    const [activeTab, setActiveTab] = useState<string>("computers");

    return (
        <section className="flex flex-col items-center justify-center gap-4 mx-auto h-125 mb-60">
            <div className="flex gap-3">
                <Button onClick={() => setActiveTab('computers')} className={`p-5 ${activeTab === "computers" ? "bg-black" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Computers</Button>
                <Button onClick={() => setActiveTab('appliances')} className={`p-5 ${activeTab === "appliances" ? "bg-black" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Appliances</Button>
                <Button onClick={() => setActiveTab('phones')} className={`p-5 ${activeTab === "phones" ? "bg-black" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Smartphones</Button>
            </div>
            <div>
                {activeTab === "computers" && <Image width={700} height={600} src="/images/computers.avif" alt="computers" />}
                {activeTab === "appliances" && <Image width={700} height={600} src="/images/appliances.jpg" alt="appliances" />}
                {activeTab === "phones" && <Image width={700} height={600} src="/images/smartphones.jpeg" alt="smartphones" />}
            </div>
        </section>
    )
}

export default ImagesSection