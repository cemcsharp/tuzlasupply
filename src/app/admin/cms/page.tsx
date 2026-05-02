import { getSiteContent, getHeroSlides } from "@/app/actions/cms";
import CMSForm from "./CMSForm";

export default async function CMSPage() {
  const [content, slides] = await Promise.all([
    getSiteContent(),
    getHeroSlides()
  ]);

  return <CMSForm initialContent={content} initialSlides={slides} />;
}
