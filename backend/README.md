# Backend - KBT Store

Backend para la tienda e-commerce KBT Store, construido con Node.js y Express.

## Instalación

```bash
npm install
```

## Configuración de Variables de Entorno

1. Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Completa las variables en `.env` con tus credenciales:
   - `MERCADOPAGO_ACCESS_TOKEN`: Tu token de acceso de Mercado Pago
   - `MERCADOPAGO_PUBLIC_KEY`: Tu llave pública de Mercado Pago
   - `EMAIL_USER`: Tu correo Gmail
   - `EMAIL_PASSWORD`: Contraseña de aplicación (ver instrucciones abajo)
   - `FRONTEND_URL`: URL del frontend (default: http://localhost:5174)

### Obtener Credenciales de Mercado Pago

1. Ve a https://www.mercadopago.com/developers
2. Inicia sesión con tu cuenta
3. Ve a "Credenciales" y copia tu ACCESS_TOKEN y PUBLIC_KEY

### Configurar Gmail App Password

1. Habilita "Verificación en dos pasos" en tu cuenta Google
2. Ve a https://myaccount.google.com/apppasswords
3. Genera una contraseña de aplicación para "Correo"
4. Usa esa contraseña en `EMAIL_PASSWORD`

## Uso

### Desarrollo (con nodemon)
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor se ejecutará en `http://localhost:5000` (o el puerto definido en `.env`)

## API Endpoints

### Health Check
- `GET /api/health` - Verificar que el backend está funcionando

### Pagos
- `POST /api/payments/create-preference` - Crear preferencia de pago en Mercado Pago
- `POST /api/payments/process-payment` - Procesar pago (simulado)
- `POST /api/payments/webhook` - Webhook para notificaciones de Mercado Pago

### Emails
- `POST /api/email/send-confirmation` - Enviar email de confirmación de compra
- `POST /api/email/send-contact` - Enviar email de contacto

## Estructura del Proyecto

```
backend/
├─ server.js                 # Archivo principal
├─ package.json              # Dependencias
├─ .env.example              # Variables de entorno de ejemplo
├─ .gitignore                # Archivos a ignorar
├─ routes/
│  ├─ payments.js            # Rutas de pagos
│  └─ email.js               # Rutas de emails
├─ utils/                    # Funciones utilitarias
└─ README.md                 # Este archivo
```

## Dependencias

- **express**: Framework web
- **cors**: Manejo de CORS
- **dotenv**: Variables de entorno
- **nodemailer**: Envio de emails
- **mercadopago**: SDK oficial de Mercado Pago
- **express-validator**: Validación de datos

## Desarrollo

### Agregar nuevas rutas

1. Crea un nuevo archivo en `routes/`
2. Exporta el router
3. Impórtalo en `server.js` y registralo

### Deploy

Este backend puede ser desplegado en:
- Render.com
- Railway
- Heroku
- DigitalOcean
- AWS

