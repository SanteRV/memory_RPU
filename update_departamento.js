const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'intercambio_nacional',
  password: 'santerv',
  port: 5432,
});

async function updateDepartamento() {
  const client = await pool.connect();

  try {
    console.log('📋 Antes del cambio:');
    const before = await client.query('SELECT id, nombre, departamento FROM experiencias ORDER BY id');
    before.rows.forEach(row => {
      console.log(`ID ${row.id}: ${row.nombre} - ${row.departamento}`);
    });

    console.log('\n✏️ Cambiando departamento de Loreto a Huánuco...');
    const updateResult = await client.query(
      `UPDATE experiencias
       SET departamento = 'Huánuco'
       WHERE departamento = 'Loreto'
       RETURNING id, nombre, departamento`
    );

    console.log('✅ Departamento actualizado:');
    updateResult.rows.forEach(row => {
      console.log(`ID ${row.id}: ${row.nombre} - ${row.departamento}`);
    });

    console.log('\n📋 Después del cambio:');
    const after = await client.query('SELECT id, nombre, departamento FROM experiencias ORDER BY id');
    after.rows.forEach(row => {
      console.log(`ID ${row.id}: ${row.nombre} - ${row.departamento}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

updateDepartamento();
