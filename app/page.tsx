import { SanityHomeBlocks } from "@/components/home/SanityHomeBlocks";
import { Hero } from "@/components/sections/Hero";
import { TrustSignals } from "@/components/sections/TrustSignals";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSignals />
      <SanityHomeBlocks />
    </>
  );
}
