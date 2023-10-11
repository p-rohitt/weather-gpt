'use client';
import CityPicker from "@/components/CityPicker";
import { Card, Text, Divider, Subtitle,Metric } from "@tremor/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffffff] to-[#e8e8e8] p-10 flex flex-col items-center justify-center">
      <Card className="max-w-4xl mx-auto">
        <Metric className="text-6xl font-bold text-center text-white" >Weather-GPT</Metric>
        <Subtitle className="text-sm text-center">
          Powered by OpenAI, Next.js 13.4, TailwindCSS, Tremor 2.0 + More!
        </Subtitle>
        <Divider className="my-10" />

        <Card className="bg-gradient-to-br from-[#ffffff] to-[#e8e8e8] ">

          <CityPicker/>
        </Card>
      </Card>
    </div>
  );
}
