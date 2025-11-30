import { motion } from "motion/react";
import { Quote, MapPin, Sparkles } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "María González",
      city: "Ciudad de México",
      quote: "Este intercambio me enseñó que las distancias son solo números. Las amistades que hice aquí son para toda la vida.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      name: "Carlos Ramírez",
      city: "Guadalajara",
      quote: "Nunca imaginé que en tan poco tiempo podría conectar tan profundamente con personas de todo el país. Fue mágico.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      name: "Ana Martínez",
      city: "Monterrey",
      quote: "Cada conversación, cada risa compartida me recordó que somos más parecidos de lo que pensamos. Esto es unidad.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Luis Hernández",
      city: "Puebla",
      quote: "El intercambio me abrió los ojos a nuevas perspectivas. Aprendí tanto de mis compañeros que ahora veo el mundo diferente.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      name: "Sofía Torres",
      city: "Querétaro",
      quote: "Llegué con expectativas, me voy con recuerdos invaluables. Esta experiencia me transformó de maneras que nunca olvidaré.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      name: "Diego Flores",
      city: "Mérida",
      quote: "Lo mejor del intercambio no fueron los lugares, sino las personas. Cada uno dejó una huella en mi corazón.",
      gradient: "from-cyan-500 to-blue-500"
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
            Voces del Intercambio
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-[var(--color-accent)]"></div>
          <p className="max-w-2xl mx-auto text-white/90 text-lg">
            Escucha lo que nuestros participantes tienen que decir sobre esta experiencia transformadora.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ overflow: 'visible' }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -12,
                scale: 1.03,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-3xl p-8 shadow-2xl relative group"
              style={{
                borderRadius: '2rem',
                clipPath: 'none'
              }}
            >
              {/* Decorative corner shapes */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${testimonial.gradient} opacity-10 rounded-bl-full`}></div>
              <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${testimonial.gradient} opacity-10 rounded-tr-full`}></div>

              {/* Gradient border animation */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-100`}
                style={{
                  padding: '3px',
                  borderRadius: '2rem',
                  clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)',
                  zIndex: -1
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />

              {/* Quote icon with gradient */}
              <motion.div
                className={`absolute -top-5 -right-5 w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br ${testimonial.gradient} shadow-xl`}
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.6 }}
              >
                <Quote className="text-white" size={32} />

                {/* Pulsing ring */}
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${testimonial.gradient}`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 0, 0.6]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.4
                  }}
                />
              </motion.div>

              {/* Icon in corner - centered on top left corner */}
              <div
                className="absolute w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
                style={{
                  backgroundColor: '#F7C548',
                  zIndex: 30,
                  top: '-24px',
                  left: '-24px'
                }}
              >
                <Sparkles className="text-white" size={22} strokeWidth={2.5} />
              </div>

              <p className="text-[var(--color-primary)] italic mb-6 mt-6 leading-relaxed relative text-base" style={{ zIndex: 5 }}>
                "{testimonial.quote}"
              </p>

              {/* Golden line separator */}
              <div
                className="w-full mb-4 relative z-10"
                style={{
                  height: '2px',
                  backgroundColor: '#F7C548',
                  opacity: 1
                }}
              />

              <div className="relative z-10">
                <p className="text-[var(--color-primary)] font-bold text-lg mb-2">
                  {testimonial.name}
                </p>
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MapPin className={`bg-gradient-to-br ${testimonial.gradient} bg-clip-text text-transparent`} size={18} strokeWidth={2.5} style={{ filter: 'drop-shadow(0 0 8px rgba(247, 197, 72, 0.5))' }} />
                  </motion.div>
                  <p className="text-gray-600 text-sm font-medium">{testimonial.city}</p>
                </div>
              </div>

              {/* Decorative side accent */}
              <motion.div
                className={`absolute left-0 top-1/4 w-1.5 h-1/2 bg-gradient-to-b ${testimonial.gradient} rounded-r-full`}
                initial={{ height: "0%" }}
                whileInView={{ height: "50%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
