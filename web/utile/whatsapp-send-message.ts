import { config } from "dotenv";
import twilio from "twilio";
// Charger les variables d'environnement
config();

// Valider les variables d'environnement
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error(
    "Les variables TWILIO_ACCOUNT_SID et TWILIO_AUTH_TOKEN doivent être définies."
  );
}

// Initialiser le client Twilio
const client = twilio(accountSid, authToken); // Pas besoin de typer explicitement

/**
 * Fonction pour envoyer un message sur WhatsApp
 * @param message - Le contenu du message à envoyer
 * @param senderID - L'ID du destinataire (WhatsApp)
 */
export const sendMessage = async (
  message: string,
  senderID: string
): Promise<void> => {
  try {
    await client.messages.create({
      to: senderID,
      body: message,
      from: `whatsapp:+14155238886`, // Remplacer par votre numéro Twilio WhatsApp
    });
    console.log(`Message envoyé à ${senderID}`);
  } catch (error) {
    console.error(`Erreur lors de l'envoi du message --> ${error}`);
  }
};

// Exporter le client Twilio pour d'autres utilisations
export default client;
