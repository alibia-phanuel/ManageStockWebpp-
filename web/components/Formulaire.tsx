"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient"; // Importer le client Supabase

// Validation avec Zod
const schema = z.object({
  productId: z.string().min(1, "Product ID est requis"),
  images: z
    .array(z.instanceof(File))
    .max(4, "Vous pouvez télécharger jusqu'à 4 images")
    .refine(
      (files) => files.length > 0,
      "Veuillez télécharger au moins une image"
    ),
  fraisLivraison: z.string().min(1, "Les frais de livraison sont requis"),
  question1: z.string().min(1, "Réponse à la question 1 est requise"),
  question2: z.string().min(1, "Réponse à la question 2 est requise"),
  question3: z.string().min(1, "Réponse à la question 3 est requise"),
});

const Formulaire = () => {
  const [formData, setFormData] = useState({
    productId: "",
    fraisLivraison: "",
    question1: "",
    question2: "",
    question3: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<any>({}); // Ajout de l'état pour les erreurs

  // Gérer le téléchargement d'images
  const onDrop = (acceptedFiles: File[]) => {
    setImages(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  // Fonction pour télécharger les images sur Supabase
  const uploadImages = async (files: File[]) => {
    const uploadedImages = [];
    for (const file of files) {
      const { data, error } = await supabase.storage
        .from("images") // Nom du bucket
        .upload(`uploads/${file.name}`, file);
      if (error) {
        toast.error(
          `Erreur lors du téléchargement de l'image: ${error.message}`
        );
        return [];
      }
      uploadedImages.push(data?.path); // Récupérer le chemin de l'image téléchargée
    }
    return uploadedImages;
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des données
    try {
      schema.parse({
        ...formData,
        images: images,
      });

      // Télécharger les images sur Supabase
      const uploadedImages = await uploadImages(images);
      if (uploadedImages.length === 0) return; // Si l'upload échoue, ne pas soumettre les données

      // Envoi des données dans Supabase
      const { data, error } = await supabase
        .from("form_data") // Nom de la table dans Supabase
        .insert([
          {
            productId: formData.productId,
            fraisLivraison: formData.fraisLivraison,
            question1: formData.question1,
            question2: formData.question2,
            question3: formData.question3,
            images: uploadedImages, // Enregistrer les chemins des images
          },
        ]);

      if (error) {
        toast.error(
          `Erreur lors de l'enregistrement des données: ${error.message}`
        );
        return;
      }

      toast.success("Formulaire soumis avec succès!");
      console.log(data); // Affiche les données enregistrées
      setErrors({}); // Réinitialiser les erreurs si la validation réussit
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: any = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message; // Ajouter le message d'erreur pour chaque champ
        });
        setErrors(newErrors); // Mettre à jour l'état des erreurs
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white rounded-lg shadow-lg p-4"
    >
      <div>
        <Label htmlFor="productId">Product ID</Label>
        <Input
          id="productId"
          type="text"
          value={formData.productId}
          onChange={(e) =>
            setFormData({ ...formData, productId: e.target.value })
          }
        />
        {errors.productId && <p className="text-red-500">{errors.productId}</p>}
      </div>

      <div>
        <Label htmlFor="images">Télécharger des images</Label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed p-4 flex justify-center items-center"
        >
          <input {...getInputProps()} />
          <FaUpload size={24} />
          <p>Glissez et déposez des images ou cliquez pour en sélectionner</p>
        </div>
        <div className="mt-2">
          {images.map((file, index) => (
            <p key={index}>{file.name}</p>
          ))}
        </div>
        {errors.images && <p className="text-red-500">{errors.images}</p>}
      </div>

      <div>
        <Label htmlFor="fraisLivraison">Frais de livraison</Label>
        <Textarea
          id="fraisLivraison"
          value={formData.fraisLivraison}
          onChange={(e) =>
            setFormData({ ...formData, fraisLivraison: e.target.value })
          }
        />
        {errors.fraisLivraison && (
          <p className="text-red-500">{errors.fraisLivraison}</p>
        )}
      </div>

      <div>
        <Label htmlFor="question1">Question 1</Label>
        <Input
          id="question1"
          type="text"
          value={formData.question1}
          onChange={(e) =>
            setFormData({ ...formData, question1: e.target.value })
          }
        />
        {errors.question1 && <p className="text-red-500">{errors.question1}</p>}
      </div>

      <div>
        <Label htmlFor="question2">Question 2</Label>
        <Input
          id="question2"
          type="text"
          value={formData.question2}
          onChange={(e) =>
            setFormData({ ...formData, question2: e.target.value })
          }
        />
        {errors.question2 && <p className="text-red-500">{errors.question2}</p>}
      </div>

      <div>
        <Label htmlFor="question3">Question 3</Label>
        <Input
          id="question3"
          type="text"
          value={formData.question3}
          onChange={(e) =>
            setFormData({ ...formData, question3: e.target.value })
          }
        />
        {errors.question3 && <p className="text-red-500">{errors.question3}</p>}
      </div>

      <Button type="submit" className="w-full">
        Envoyer
      </Button>
    </form>
  );
};

export default Formulaire;
