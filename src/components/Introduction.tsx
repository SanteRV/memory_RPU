import { motion } from "motion/react";
import { Heart, Users, Star } from "lucide-react";

export function Introduction() {
  const features = [
    {
      icon: Heart,
      title: "Conexiones Verdaderas",
      description: "Amistades que trascienden fronteras"
    },
    {
      icon: Users,
      title: "Unidad Nacional",
      description: "Diferentes culturas, un solo corazón"
    },
    {
      icon: Star,
      title: "Momentos Inolvidables",
      description: "Experiencias que marcan para siempre"
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-6 text-[var(--color-primary)]">
            Un Viaje que Cambió Nuestras Vidas
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-[var(--color-accent)]"></div>
          <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
            El Intercambio Nacional no fue solo un evento, fue el comienzo de algo mucho más grande. 
            Fue el espacio donde estudiantes de todo el país se reunieron para compartir, aprender y 
            crecer juntos. Cada conversación, cada risada, cada momento compartido se convirtió en 
            un lazo que nos unió más allá de las distancias. Aquí celebramos la diversidad, 
            la amistad y la pasión por construir un futuro mejor, juntos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-8 rounded-2xl shadow-lg bg-[var(--color-light)]"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[var(--color-primary)]">
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="mb-3 text-[var(--color-primary)]">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
