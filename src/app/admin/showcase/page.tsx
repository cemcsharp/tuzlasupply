import { getReferences, getPartners, getSectionVisibility, createReference, createPartner, toggleReference, togglePartner, deleteReference, deletePartner, toggleSectionVisibility } from "@/app/actions/showcase";
import ShowcaseClient from "./ShowcaseClient";

export default async function ShowcasePage() {
  const [references, partners, visibility] = await Promise.all([
    getReferences(),
    getPartners(),
    getSectionVisibility(),
  ]);

  return (
    <ShowcaseClient 
      references={references} 
      partners={partners} 
      visibility={visibility} 
    />
  );
}
