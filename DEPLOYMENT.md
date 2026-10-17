# RentApp PRO — guía de puesta en producción

## Stack
- Next.js + TypeScript
- Supabase Auth + Postgres + RLS
- API de IA mediante servidor
- Webhook Hotmart para activar/desactivar acceso

Supabase permite autenticación con email/password y autorización mediante RLS. Hotmart envía eventos de compra/suscripción mediante webhook y autentica el webhook con `X-HOTMART-HOTTOK`.

## Pasos
1. Crear proyecto Supabase.
2. Ejecutar `supabase/schema.sql` en SQL Editor.
3. Crear `.env.local` a partir de `.env.example`.
4. Instalar dependencias: `npm install`.
5. Ejecutar: `npm run dev`.
6. Crear producto/suscripción en Hotmart.
7. Configurar el webhook de Hotmart apuntando a `/api/hotmart/webhook`.
8. Guardar el Hottok en `HOTMART_HOTTOK`.
9. Configurar el dominio público en `NEXT_PUBLIC_APP_URL`.
10. Añadir `OPENAI_API_KEY` para activar el asesor IA.
11. Probar compra aprobada, cancelación/reembolso y bloqueo de acceso.
12. Antes de cobrar, revisar términos, privacidad, manejo de datos y la lógica exacta de eventos de Hotmart.

## Nota de seguridad
Nunca expongas `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY` ni `HOTMART_HOTTOK` al navegador. Son variables exclusivamente del servidor.
