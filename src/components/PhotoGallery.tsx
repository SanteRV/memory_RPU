import { motion } from "motion/react";
import { useState, useEffect } from "react";
import Masonry from "react-responsive-masonry";
import { Image } from "./Image";
import { Loader2 } from "lucide-react";
import img1 from "../image/recuerdos/1.jpeg";
import img2 from "../image/recuerdos/2.jpeg";
import img3 from "../image/recuerdos/3.jpeg";
import img4 from "../image/recuerdos/4.jpg";
import img5 from "../image/recuerdos/5.jpg";
import img9 from "../image/recuerdos/9.jpeg";
import img10 from "../image/recuerdos/10.jpeg";
import img11 from "../image/recuerdos/11.jpeg";

interface Experiencia {
  id: number;
  nombre: string;
  departamento: string;
  experiencia: string;
  foto_url: string;
  created_at: string;
}

const API_URL = 'http://localhost:3003/api';

export function PhotoGallery() {
  const [uploadedPhotos, setUploadedPhotos] = useState<Experiencia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/experiencias`);
      const data = await response.json();

      if (data.success) {
        setUploadedPhotos(data.data);
      }
    } catch (error) {
      console.error('Error al cargar fotos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fotos estáticas originales
  const staticPhotos = [
    {
      url: img1,
      alt: "Momentos inolvidables",
      isStatic: true
    },
    {
      url: img2,
      alt: "Unidos por la amistad",
      isStatic: true
    },
    {
      url: img3,
      alt: "Celebrando juntos",
      isStatic: true
    },
    {
      url: img4,
      alt: "Compartiendo experiencias",
      isStatic: true
    },
    {
      url: img5,
      alt: "Recuerdos que perduran",
      isStatic: true
    },
    {
      url: img9,
      alt: "Lazos que nos unen",
      isStatic: true
    },
    {
      url: img10,
      alt: "Diversidad y unidad",
      isStatic: true
    },
    {
      url: img11,
      alt: "Un viaje compartido",
      isStatic: true
    }
  ];

  // Convertir fotos subidas al formato de la galería
  const dynamicPhotos = uploadedPhotos.map(photo => ({
    url: `http://localhost:3003${photo.foto_url}`,
    alt: `${photo.nombre} - ${photo.departamento}`,
    isStatic: false
  }));

  // Combinar fotos estáticas con dinámicas
  const allPhotos = [...staticPhotos, ...dynamicPhotos];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-[var(--color-primary)] via-blue-900 to-[var(--color-primary)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-6 text-white">
            Galería de Momentos
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-[var(--color-accent)]"></div>
          <p className="max-w-2xl mx-auto text-white/90 text-lg">
            Cada foto cuenta una historia. Revive con nosotros los momentos más especiales de nuestro intercambio.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="text-white animate-spin" size={48} />
          </div>
        ) : (
          <Masonry columnsCount={3} gutter="1.5rem">
            {allPhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-white"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-medium">{photo.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        )}
      </div>
    </section>
  );
}
