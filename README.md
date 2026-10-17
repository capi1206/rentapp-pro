# RentApp PRO 3.0

**RentApp PRO** es una plataforma intuitiva e integral de cálculo financiero y toma de decisiones, diseñada específicamente para pequeños emprendedores y dueños de negocio en América Latina. Permite a los usuarios analizar la economía unitaria de sus productos, establecer márgenes de ganancia objetivos, simular escenarios financieros, definir metas de ventas y consultar un asesor financiero impulsado por Inteligencia Artificial utilizando métricas en moneda local (COP).

## 🛠 Características y Capacidades

* **Calculadora de Rentabilidad Financiera (`/calculator`)**: Calcula costos variables, asignación de costos fijos, costo real por unidad, margen de utilidad actual y precios de venta recomendados según el margen objetivo.

* **Simulador de Escenarios Interactivo (`/scenarios`)**: Prueba cambios de precio, volumen de unidades y variaciones de costos de forma dinámica antes de aplicarlos a tu negocio.

* **Planificador de Metas de Utilidad (`/goals`)**: Convierte metas mensuales de utilidad en dinero en objetivos concretos de unidades a vender.

* **Asesor Financiero IA (`/advisor`)**: Consulta a un asesor financiero impulsado por la API de OpenAI para recibir recomendaciones estratégicas sobre precios y margen.

* **Dashboard Ejecutivo (`/dashboard`)**: Visualiza de un vistazo los indicadores clave de rendimiento, estadísticas de productos activos y precios recomendados.

* **Integración de Suscripciones vía Webhook (`/api/hotmart/webhook`)**: Conexión nativa con webhooks de Hotmart para activar y revocar accesos automáticamente mediante validación segura de Hottok.

* **Aislamiento Seguro de Datos**: Seguridad basada en políticas de Row Level Security (RLS) en Supabase para garantizar la privacidad total de la información de cada usuario.

## 📂 Arquitectura del Proyecto y Estructura de Archivos

```
RentApp_PRO/
├── app/
│   ├── api/
│   │   ├── advisor/
│   │   │   └── route.ts             # Endpoint Serverless para consultas al Asesor IA
│   │   └── hotmart/
│   │       └── webhook/
│   │           └── route.ts         # Endpoint para procesamiento de webhooks de Hotmart
│   ├── calculator/
│   │   └── page.tsx                 # Calculadora interactiva de costos y rentabilidad
│   ├── dashboard/
│   │   └── page.tsx                 # Dashboard ejecutivo (Server Component)
│   ├── goals/
│   │   └── page.tsx                 # Planificador de metas de ventas basadas en utilidad
│   ├── login/
│   │   └── page.tsx                 # Autenticación de usuarios con cliente Supabase
│   ├── scenarios/
│   │   └── page.tsx                 # Simulador interactivo de decisiones en tiempo real
│   ├── globals.css                  # Estilos globales y tokens de diseño
│   └── layout.tsx                   # Root Layout de Next.js
├── supabase/
│   └── schema.sql                   # Esquema SQL, triggers y políticas RLS para Supabase
├── test-scenarios.js                # Suite de pruebas unitarias e integración para fórmulas y API
├── next.config.ts                   # Configuración del proyecto Next.js
├── package.json                     # Dependencias del proyecto y scripts ejecutables
└── README.md                        # Documentación del proyecto

```

## 🧮 Funcionamiento y Fórmulas Clave

1. **Costo Real por Unidad (**$C_r$**)**:
   

   $$
   C_r = \text{Costo Variable por Unidad} + \frac{\text{Total Costos Fijos Mensuales}}{\text{Unidades Producidas al Mes}}
   $$

2. **Ganancia por Unidad (**$P$**)**:
   

   $$
   P = \text{Precio de Venta} - C_r
   $$

3. **Precio de Venta Recomendado (**$P_{rec}$**)** según un Porcentaje de Margen Objetivo ($M_{target}$):
   

   $$
   P_{rec} = \frac{C_r}{1 - \left(\frac{M_{target}}{100}\right)}
   $$

4. **Punto de Equilibrio en Unidades (**$BE$**)**:
   

   $$
   BE = \left\lceil \frac{\text{Total Costos Fijos Mensuales}}{\text{Precio de Venta} - \text{Costo Variable por Unidad}} \right\rceil
   $$

5. **Meta de Ventas Necesaria (**$Q_{goal}$**)** para obtener una Utilidad Deseada ($T$):
   

   $$
   Q_{goal} = \left\lceil \frac{T}{P} \right\rceil
   $$

## ⚙️ Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```
# Claves Públicas de Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-supabase
NEXT_PUBLIC_APP_URL=https://tu-dominio.com

# Credenciales Privadas del Servidor
SUPABASE_SERVICE_ROLE_KEY=tu-clave-service-role-supabase
HOTMART_HOTTOK=tu-token-hottok-secret-hotmart
OPENAI_API_KEY=sk-proj-tu-clave-api-openai

```

## 🚀 Desarrollo Local y Pruebas

1. **Instalar Dependencias**:

   ```
   npm install
   
   ```

2. **Ejecutar Suite de Pruebas**:
   Valida las fórmulas matemáticas, cálculos de metas y comportamiento de endpoints:

   ```
   node test-scenarios.js
   
   ```

3. **Iniciar Servidor de Desarrollo**:

   ```
   npm run dev
   
   ```

   Abre <http://localhost:3000> en tu navegador.

## 📦 Inicialización de la Base de Datos (Supabase)

Ejecuta el contenido del archivo `supabase/schema.sql` en el Editor SQL de tu panel de Supabase:

* Crea las tablas `profiles`, `products` y `entitlements`.

* Habilita **Row Level Security (RLS)** para garantizar la privacidad de los datos entre usuarios.

* Activa el trigger automático (`handle_new_user`) que crea un perfil al registrarse un nuevo usuario.

## 🌐 Despliegue en Producción (ej. Vercel)

1. **Subir al Repositorio Remoto**: Sube el código fuente a tu repositorio (GitHub, GitLab o Bitbucket).

2. **Conectar con la Plataforma de Hosting**: Importa el proyecto desde tu cuenta de Vercel u otra plataforma.

3. **Configurar Variables de Entorno**: Agrega todas las variables especificadas en la sección de Variables de Entorno en el panel de administración del servidor.

4. **Desplegar**: Ejecuta la compilación y publicación de la aplicación.

5. **Configurar Webhook en Hotmart**: Apunta la URL de notificaciones webhook de Hotmart a `https://tu-dominio.com/api/hotmart/webhook` y asegúrate de que el token `Hottok` coincida con la variable `HOTMART_HOTTOK`.