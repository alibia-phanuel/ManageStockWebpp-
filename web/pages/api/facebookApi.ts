import axios from "axios";

// Définir un type pour les données des publications que vous attendez
interface Post {
  id: string;
  message: string;
  created_time: string;
  // Ajoutez d'autres propriétés en fonction de la réponse que vous attendez
}

const fetchPosts = async (
  pageId: string,
  accessToken: string
): Promise<Post[]> => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v21.0/${pageId}/posts`,
      {
        params: {
          access_token: accessToken,
        },
      }
    );
    return response.data.data as Post[]; // Type explicite pour la donnée des posts
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
    return [];
  }
};

export default fetchPosts;
