import type { Metadata } from "next";
import { AllOnEducationPage } from "@/components/pages/AllOnEducationPage";
import { fetchAllOnPage } from "@/lib/sanity.fetch";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchAllOnPage();
  return {
    title: data.seo.title,
    description: data.seo.description,
    openGraph: {
      title: data.seo.ogTitle,
      description: data.seo.ogDescription,
    },
  };
}

export default async function AllOn4Page() {
  const data = await fetchAllOnPage();
  return <AllOnEducationPage data={data} />;
}
