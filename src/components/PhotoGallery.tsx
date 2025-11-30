import { motion } from "motion/react";
import Masonry from "react-responsive-masonry";
import { Image } from "./Image";

export function PhotoGallery() {
  const photos = [
    {
      url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnRzJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzY0NDA2Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Estudiantes felices"
    },
    {
      url: "https://images.unsplash.com/photo-1737322908139-84ea69ba6cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGV4Y2hhbmdlJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzY0NDA0NzU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Intercambio cultural"
    },
    {
      url: "https://images.unsplash.com/photo-1763651961188-17479f1760e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwY2VsZWJyYXRpbmclMjB0b2dldGhlcnxlbnwxfHx8fDE3NjQzOTk0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Celebración"
    },
    {
      url: "https://images.unsplash.com/photo-1762158007836-25d13ab34c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHdvcmtzaG9wJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzY0NDA2Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Taller de aprendizaje"
    },
    {
      url: "https://images.unsplash.com/photo-1763637675793-da207ba1fe18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMHBob3RvJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzY0NDA2Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Foto grupal"
    },
    {
      url: "https://images.unsplash.com/photo-1758270704524-596810e891b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBkaXZlcnNlfGVufDF8fHx8MTc2NDQwNjc3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Estudiantes diversos"
    },
    {
      url: "https://images.unsplash.com/photo-1752650736215-0130f82db4fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMHN0dWRlbnRzJTIwcHJvamVjdHxlbnwxfHx8fDE3NjQ0MDY3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Trabajo en equipo"
    },
    {
      url: "https://images.unsplash.com/photo-1758797316165-986ec92e7ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGV4Y2hhbmdlJTIwZ3JvdXB8ZW58MXx8fHwxNzY0NDA2Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Grupo de intercambio"
    }
  ];

  return (
    <section className="py-20 px-6 bg-[var(--color-light)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-6 text-[var(--color-primary)]">
            Galería de Momentos
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-[var(--color-accent)]"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
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
