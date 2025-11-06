import { supabase } from "@/integrations/supabase/client";

interface GenerateImageResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export async function generateHeroImage(
  prompt: string,
): Promise<GenerateImageResult> {
  try {
    const { data, error } = await supabase.functions.invoke(
      "generate-hero-image",
      {
        body: { prompt },
      },
    );

    if (error) {
      console.error("Error generating hero image:", error);
      return { success: false, error: error.message };
    }

    return { success: true, imageUrl: data.imageUrl };
  } catch (error) {
    console.error("Error calling generate-hero-image function:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export const heroImagePrompts = [
  "A 16:9 ultra high resolution professional photo of a modern commercial building construction site in Toronto, Canada. Active construction workers in safety gear, construction cranes, scaffolding, bright daylight, dynamic composition. Show progress and professionalism. Photorealistic, architectural photography style.",

  "A 16:9 ultra high resolution professional photo of a luxury multi-family residential condo building exterior being renovated in the Greater Toronto Area. Clean modern architecture, building envelope restoration work, professional contractors, blue sky. Premium quality, architectural detail. Photorealistic, real estate photography style.",

  "A 16:9 ultra high resolution professional photo of an institutional building renovation project - modern school or hospital in Ontario. Professional construction management, safety protocols visible, high-quality craftsmanship, expert contractors at work. Professional construction photography, inspiring and trustworthy aesthetic.",
];
