import { motion } from "motion/react";
import Masonry from "react-responsive-masonry";
import { Image } from "./Image";
import img1 from "../image/recuerdos/1.jpeg";
import img2 from "../image/recuerdos/2.jpeg";
import img3 from "../image/recuerdos/3.jpeg";
import img4 from "../image/recuerdos/4.jpg";
import img5 from "../image/recuerdos/5.jpg";
import img9 from "../image/recuerdos/9.jpeg";
import img10 from "../image/recuerdos/10.jpeg";
import img11 from "../image/recuerdos/11.jpeg";

export function PhotoGallery() {
  const photos = [
    {
      url: img1,
      alt: "Momentos inolvidables"
    },
    {
      url: img2,
      alt: "Unidos por la amistad"
    },
    {
      url: img3,
      alt: "Celebrando juntos"
    },
    {
      url: img4,
      alt: "Compartiendo experiencias"
    },
    {
      url: img5,
      alt: "Recuerdos que perduran"
    },
    {
      url: img9,
      alt: "Lazos que nos unen"
    },
    {
      url: img10,
      alt: "Diversidad y unidad"
    },
    {
      url: img11,
      alt: "Un viaje compartido"
    }
  ];

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

        <Masonry columnsCount={3} gutter="1.5rem">
          {photos.map((photo, index) => (
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
                  <p className="text-white">{photo.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>
    </section>
  );
}
