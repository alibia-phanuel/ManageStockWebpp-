import { SupabaseClient } from "@supabase/supabase-js";

const uploadImagesToSupabase = async (files: File[], db: SupabaseClient) => {
  const uploadedPaths: string[] = [];
  if (!files) {
    console.error("Aucun fichier fourni pour l'upload");
    return;
  }
  console.log("Fichier à uploader :", files);

  for (const file of files) {
    const { data, error } = await db.storage
      .from("products-images")
      .upload(`public/${Date.now()}-${file.name}`, file);

    if (error) {
      console.log("Résultat de l'upload :", { data, error });
      throw error;
    }

    // Récupérer le chemin du fichier uploadé
    uploadedPaths.push(data.path);
  }

  return uploadedPaths; // Retourne un tableau des chemins des fichiers
};
export default uploadImagesToSupabase;
