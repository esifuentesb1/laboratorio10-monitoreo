const express = require('express');
const client = require('prom-client');

const app = express();
const port = 3001;

// Habilitar CORS para que el Frontend (puerto 8080) pueda comunicarse con el Backend (puerto 3001)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configurar recolección de métricas por defecto (CPU, memoria del proceso de Node.js)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// Métrica personalizada para contar cuántas veces se interactúa con el botón de tráfico
const contadorPeticiones = new client.Counter({
    name: 'backend_peticiones_hello_total',
    help: 'Total de peticiones exitosas en /api/hello'
});

// Endpoint: Frontend tráfico
app.get('/api/hello', (req, res) => {
    console.log(`[INFO] ${new Date().toISOString()} - Procesando petición en /api/hello`);
    contadorPeticiones.inc();
    res.send('Hello World + botones de tráfico/carga activos');
});

// Endpoint: Métricas expuestas para Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// Endpoint: Simulación de alta carga de CPU para disparar la alerta > 50%
app.get('/api/load', (req, res) => {
    console.log(`[WARNING] ${new Date().toISOString()} - Generando estrés en el contenedor del Backend`);
    
    const tiempoFin = Date.now() + 15000; // Bloqueo intenso por 15 segundos
    while (Date.now() < tiempoFin) {
        Math.sqrt(Math.random() * 100.0); // Operación matemática pesada en bucle cerrado
    }
    
    console.log(`[INFO] ${new Date().toISOString()} - Simulación de carga pesada terminada`);
    res.send('Simulación de carga completada');
});

app.listen(port, () => {
    console.log(`[START] Backend escuchando en http://localhost:${port}`);
});