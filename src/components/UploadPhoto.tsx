import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, X, Camera } from "lucide-react";

interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
  caption: string;
}

export function UploadPhoto() {
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (previewUrl && name) {
      const newPhoto: UploadedPhoto = {
        id: Date.now().toString(),
        url: previewUrl,
        name,
        caption
      };
      setUploadedPhotos([newPhoto, ...uploadedPhotos]);
      setPreviewUrl(null);
      setName("");
      setCaption("");
      const fileInput = document.getElementById("photo-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  const removePhoto = (id: string) => {
    setUploadedPhotos(uploadedPhotos.filter(photo => photo.id !== id));
  };

  return (
    <section className="py-20 px-6 bg-[var(--color-primary)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-6">
            Comparte Tu Experiencia
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-[var(--color-accent)]"></div>
          <p className="text-white/90 max-w-2xl mx-auto">
            ¿Tienes una foto especial del intercambio? ¡Compártela con todos! Sube tu imagen y deja tu huella en este muro de recuerdos.
          </p>
        </motion.div>

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-12 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="photo-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[var(--color-accent)]/50 rounded-2xl cursor-pointer transition-all hover:border-opacity-100"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="mb-4 text-[var(--color-primary)]" size={48} />
                    <p className="mb-2 text-[var(--color-primary)]">
                      Haz clic para subir una foto
                    </p>
                    <p className="text-gray-500">PNG, JPG hasta 10MB</p>
                  </div>
                )}
                <input
                  id="photo-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-[var(--color-primary)]">
                Tu nombre *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                placeholder="Ingresa tu nombre"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="caption" className="block mb-2 text-[var(--color-primary)]">
                Frase corta (opcional)
              </label>
              <textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all resize-none"
                placeholder="Comparte un pensamiento o recuerdo..."
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={!previewUrl || !name}
              className="w-full py-4 rounded-xl text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-[var(--color-accent)]"
            >
              <Upload size={20} />
              Subir Foto
            </button>
          </form>
        </motion.div>

        {/* Uploaded Photos Wall */}
        {uploadedPhotos.length > 0 && (
          <div>
            <h3 className="text-white text-center mb-8">Muro de Recuerdos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {uploadedPhotos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-xl relative"
                  >
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors z-10"
                      aria-label="Eliminar foto"
                    >
                      <X size={16} />
                    </button>
                    <img src={photo.url} alt={photo.name} className="w-full h-64 object-cover" />
                    <div className="p-4">
                      <p className="text-[var(--color-primary)]">{photo.name}</p>
                      {photo.caption && (
                        <p className="text-gray-600 italic mt-2">"{photo.caption}"</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
