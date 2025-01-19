"use client";
import { supabase } from "@/lib/supabaseClient";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importer les styles de toast
import * as Yup from "yup";
interface FileWithPreview extends File {
  preview: string;
}

const Formulaire: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedImage((prevSelected) => {
      const newFiles = acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      }));
      const combinedFiles = [...prevSelected, ...newFiles].slice(0, 4);
      return combinedFiles;
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const selected_images = selectedImage.map((file) => (
    <div key={file.preview} className="rounded-lg overflow-hidden">
      <Image src={file.preview} width={150} height={150} alt="image produit" />
    </div>
  ));

  const initialValues = {
    productId: "",
    deliveryFee: "",
    price: "",
    question1: "",
    question2: "",
    question3: "",
    images: [] as File[], // Initialisation pour les images
  };
  const validationSchema = Yup.object({
    productId: Yup.string().required("L'ID produit est requis."),
    deliveryFee: Yup.string().required("Les frais de livraison sont requis."), // Modifié pour accepter une phrase
    price: Yup.number()
      .typeError("Veuillez entrer un nombre.")
      .required("Le prix est requis."),
    question1: Yup.string().required("Question 1 est requise."),
    question2: Yup.string().required("Question 2 est requise."),
    question3: Yup.string().required("Question 3 est requise."),
  });

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("stores")
        .upload(`products/${fileName}`, file);

      if (error) {
        console.error("Erreur lors de l'upload:", error.message);
        throw new Error("Upload échoué");
      }

      // Récupération de l'URL publique
      const { data: publicUrlData } = supabase.storage
        .from("stores")
        .getPublicUrl(`products/${fileName}`);

      if (publicUrlData?.publicUrl) {
        uploadedUrls.push(publicUrlData.publicUrl);
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      // Upload des images
      const imageUrls = await uploadImages(values.images);

      // Insertion des données dans la table
      const { error } = await supabase.from("products").insert({
        product_id: values.productId,
        delivery_fee: values.deliveryFee,
        price: values.price,
        question_1: values.question1,
        question_2: values.question2,
        question_3: values.question3,
        images: imageUrls, // URL des images
      });

      if (error) {
        toast.error("Erreur lors de l'ajout du produit.");
      } else {
        toast.success("Produit ajouté avec succès !"); // Affiche une notification de succès
      }
    } catch (error) {
      // Vérification explicite pour garantir que 'error' est bien une instance d'Error
      if (error instanceof Error) {
        toast.error("Erreur lors de l'ajout du produit.");
      } else {
        toast.error("Erreur lors de l'ajout du produit.");
      }
    }
    console.log("Données validées :");
    // Ici, envoyer les données validées à la base de données
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="bg-white w-[500px] max-md:w-full p-4 rounded-lg">
            {/* ID Produit */}
            <div className="form-contront flex flex-col">
              <label className="capitalize">ID produit</label>
              <Field
                name="productId"
                type="text"
                placeholder="ID Produit"
                className="border-2 rounded-lg my-2 p-2"
              />
              <ErrorMessage
                name="productId"
                component="p"
                className="text-sm text-red-500 italic"
              />
            </div>

            {/* Frais de Livraison */}
            <div className="form-contront flex flex-col">
              <label className="capitalize">frais de livraison</label>
              <Field
                name="deliveryFee"
                type="text"
                placeholder="Frais de livraison du produit"
                className="border-2 rounded-lg my-2 p-2"
              />
              <ErrorMessage
                name="deliveryFee"
                component="p"
                className="text-sm text-red-500 italic"
              />
            </div>

            {/* Prix */}
            <div className="form-contront flex flex-col">
              <label className="capitalize">Prix</label>
              <Field
                name="price"
                type="number"
                placeholder="Prix du Produit"
                className="border-2 rounded-lg my-2 p-2"
              />
              <ErrorMessage
                name="price"
                component="p"
                className="text-sm text-red-500 italic"
              />
            </div>

            {/* Questions */}
            {["question1", "question2", "question3"].map((question, index) => (
              <div key={question} className="form-contront flex flex-col">
                <label className="capitalize">{`question ${index + 1}`}</label>
                <Field
                  name={question}
                  type="text"
                  placeholder={`Question ${index + 1}`}
                  className="border-2 rounded-lg my-2 p-2"
                />
                <ErrorMessage
                  name={question}
                  component="p"
                  className="text-sm text-red-500 italic"
                />
              </div>
            ))}

            {/* Zone de dépôt */}
            <div
              {...getRootProps()}
              className="text-center border-2 border-dashed border-gray-300 my-4"
            >
              <input {...getInputProps()} />
              <p>Déposez les fichiers ici ...</p>
            </div>
            <div className="flex gap-4 justify-end items-center my-4 rounded-lg overflow-hidden">
              {selected_images}
            </div>

            {/* Bouton Ajouter */}
            <button
              type="submit"
              className="bg-[#4C5459] w-full rounded-lg text-white py-2 capitalize"
            >
              ajouter
            </button>
          </Form>
        )}
      </Formik>

      <ToastContainer />
    </>
  );
};

export default Formulaire;
