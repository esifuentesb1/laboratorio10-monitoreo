## Cuestionario del Laboratorio de Monitoreo

### 1. ¿Por qué usamos Loki si ya tenemos Prometheus?
* **Prometheus solo ve números:** Te avisa cuándo falla algo a nivel cuantitativo.
* **Loki ve texto:** Nos dice el por qué falló, porque te deja leer el mensaje de error real que botó la aplicación. 
* **Conclusión:** Necesitamos ambos para así tener el control total y saber qué es lo que falla tanto en números como en letras.

---

### 2. ¿Qué ventaja tiene crear las conexiones por código y no a mano?
En este laboratorio, yo configuré los paneles y las alertas a mano usando la interfaz visual de Grafana para entender el flujo, ver las opciones de manera más fácil y aprender cómo se conecta cada componente paso a paso. 

Sin embargo, la teoría nos dice que hacerlo por código tiene la ventaja de ser automático. Si tuviera que replicar este mismo monitoreo en 10 servidores diferentes, hacerlo a mano tomaría demasiado tiempo y podría equivocarme en algún clic; en cambio, con el aprovisionamiento por código, solo bastaría con copiar el archivo de configuración para que todo se conecte al instante y sin errores humanos.

---

### 3. El panel "CPU contenedor" y el panel "CPU host" pueden mostrar valores muy distintos. ¿Por qué? ¿Cuál usarías para alertar sobre una aplicación concreta?
Son valores distintos porque miden cosas diferentes: la CPU del Host mide el consumo total de toda la laptop (incluyendo Windows, el navegador y otros programas abiertos), mientras que la CPU del Contenedor mide únicamente el esfuerzo aislado de la aplicación backend. 

Para poner una alarma sobre una aplicación concreta usaría la CPU del Contenedor, ya que si la laptop se pone lenta por abrir otro programa externo, la métrica del host subirá y generará una alarma falsa, mientras que la del contenedor solo te avisará si tu aplicación es la que realmente está fallando.

---

### 4. ¿Qué diferencia hay entre el evaluation interval y el pending period de una alarma?
La diferencia es que el **evaluation interval (intervalo de evaluación)** es solo el tiempo que Grafana espera para ir a revisar el gráfico automáticamente (por ejemplo, mirar cada 1 minuto si hay un problema), mientras que el **pending period (periodo de gracia)** es el tiempo que el problema debe durar obligatoriamente fuera del límite antes de que la alarma suene de verdad, sirviendo para evitar alertas falsas por picos rápidos que se solucionan solos.