import axios from "axios";

// Définir un type pour les données des publications que vous attendez
interface Post {
  id: string;
  message: string;
  created_time: string;
  // Ajoutez d'autres propriétés en fonction de la réponse que vous attendez
}

// Définir un type pour la structure de la réponse Axios
interface FacebookResponse {
  data: Post[];
}

const fetchPosts = async (
  pageId: string,
  accessToken: string
): Promise<Post[]> => {
  try {
    const response = await axios.get<FacebookResponse>(
      `https://graph.facebook.com/v21.0/${pageId}/posts`,
      {
        params: {
          access_token: accessToken,
        },
      }
    );
    // Le type `response.data` est maintenant correctement inféré
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
    return [];
  }
};

export default fetchPosts;
