const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'intercambio_nacional',
  password: 'santerv',
  port: 5432,
});

async function updateTestimonios() {
  const client = await pool.connect();

  try {
    // Ver los testimonios actuales
    console.log('📋 Testimonios actuales:');
    const result = await client.query('SELECT * FROM experiencias ORDER BY id');
    result.rows.forEach(row => {
      console.log(`ID ${row.id}: ${row.nombre} (${row.departamento}) - "${row.experiencia}"`);
    });

    // Actualizar el testimonio "fghfg" con una frase sobre el intercambio
    console.log('\n✏️ Actualizando testimonio con texto "fghfg"...');
    const updateResult = await client.query(
      `UPDATE experiencias
       SET experiencia = 'El intercambio nacional fue una experiencia inolvidable que nos permitió conocer la diversidad cultural de nuestro país y crear lazos de amistad que perdurarán para siempre.'
       WHERE experiencia LIKE '%fghfg%'
       RETURNING id, nombre, experiencia`
    );

    if (updateResult.rows.length > 0) {
      console.log('✅ Testimonio actualizado:');
      updateResult.rows.forEach(row => {
        console.log(`ID ${row.id}: ${row.nombre} - "${row.experiencia}"`);
      });
    } else {
      console.log('⚠️ No se encontró ningún testimonio con "fghfg"');
    }

    // Buscar y eliminar el testimonio "gaaa"
    console.log('\n🔍 Buscando testimonio con "gaaa"...');
    const findGaaa = await client.query(
      `SELECT id, nombre, departamento, experiencia, foto_url FROM experiencias WHERE experiencia LIKE '%gaaa%' OR nombre LIKE '%gaaa%'`
    );

    if (findGaaa.rows.length > 0) {
      console.log('📍 Testimonio encontrado:');
      findGaaa.rows.forEach(row => {
        console.log(`ID ${row.id}: ${row.nombre} (${row.departamento}) - "${row.experiencia}"`);
        console.log(`Foto: ${row.foto_url}`);

        // Intentar eliminar la imagen si existe
        if (row.foto_url) {
          const imagePath = path.join(__dirname, 'server', 'uploads', path.basename(row.foto_url));
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`🗑️ Imagen eliminada: ${imagePath}`);
          }
        }
      });

      // Eliminar el registro
      const deleteResult = await client.query(
        `DELETE FROM experiencias WHERE experiencia LIKE '%gaaa%' OR nombre LIKE '%gaaa%' RETURNING id, nombre`
      );

      console.log('✅ Testimonio eliminado:');
      deleteResult.rows.forEach(row => {
        console.log(`ID ${row.id}: ${row.nombre}`);
      });
    } else {
      console.log('⚠️ No se encontró ningún testimonio con "gaaa"');
    }

    // Mostrar testimonios finales
    console.log('\n📋 Testimonios después de los cambios:');
    const finalResult = await client.query('SELECT id, nombre, departamento, experiencia FROM experiencias ORDER BY id');
    finalResult.rows.forEach(row => {
      const exp = row.experiencia || '';
      console.log(`ID ${row.id}: ${row.nombre} (${row.departamento}) - "${exp.substring(0, 50)}..."`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

updateTestimonios();
