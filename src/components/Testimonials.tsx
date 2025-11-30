import { motion } from "motion/react";
import { Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "María González",
      city: "Ciudad de México",
      quote: "Este intercambio me enseñó que las distancias son solo números. Las amistades que hice aquí son para toda la vida."
    },
    {
      name: "Carlos Ramírez",
      city: "Guadalajara",
      quote: "Nunca imaginé que en tan poco tiempo podría conectar tan profundamente con personas de todo el país. Fue mágico."
    },
    {
      name: "Ana Martínez",
      city: "Monterrey",
      quote: "Cada conversación, cada risa compartida me recordó que somos más parecidos de lo que pensamos. Esto es unidad."
    },
    {
      name: "Luis Hernández",
      city: "Puebla",
      quote: "El intercambio me abrió los ojos a nuevas perspectivas. Aprendí tanto de mis compañeros que ahora veo el mundo diferente."
    },
    {
      name: "Sofía Torres",
      city: "Querétaro",
      quote: "Llegué con expectativas, me voy con recuerdos invaluables. Esta experiencia me transformó de maneras que nunca olvidaré."
    },
    {
      name: "Diego Flores",
      city: "Mérida",
      quote: "Lo mejor del intercambio no fueron los lugares, sino las personas. Cada uno dejó una huella en mi corazón."
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-6 text-[var(--color-primary)]">
            Voces del Intercambio
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-[var(--color-accent)]"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Escucha lo que nuestros participantes tienen que decir sobre esta experiencia transformadora.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(4, 34, 81, 0.15)" }}
              className="bg-white rounded-2xl p-8 shadow-lg relative border border-gray-100"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-accent)]">
                <Quote className="text-white" size={24} />
              </div>

              <p className="text-gray-700 italic mb-6 mt-4">
                "{testimonial.quote}"
              </p>

              <div className="border-t border-[var(--color-light)] pt-4">
                <p className="text-[var(--color-primary)]">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-sm mt-1">{testimonial.city}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
