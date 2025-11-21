# Configurar Credenciales para el Backend

## 1. Configurar Mercado Pago

### Paso 1: Acceder a Mercado Pago Developers
1. Ve a https://www.mercadopago.com/developers
2. Inicia sesión con tu cuenta de Mercado Pago (o crea una si no tienes)
3. Haz clic en "Mis Integraciones"
4. Selecciona la aplicación o crea una nueva

### Paso 2: Obtener Credenciales
1. En el dashboard, busca la sección "Credenciales"
2. Encontrarás dos tokens:
   - **ACCESS_TOKEN**: Token de acceso (empieza con "APP_USR-")
   - **PUBLIC_KEY**: Llave pública
3. Copia ambos valores

### Paso 3: Agregar a .env
En el archivo `backend/.env`, reemplaza:
```
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_aqui
MERCADOPAGO_PUBLIC_KEY=tu_public_key_aqui
```

Con tus valores copiados.

## 2. Configurar Gmail para Emails

### Opción A: Usar Gmail (Recomendado)

#### Paso 1: Habilitar Verificación en Dos Pasos
1. Ve a https://myaccount.google.com/
2. En la izquierda, haz clic en "Seguridad"
3. Busca "Verificación en dos pasos" y haz clic en ella
4. Sigue los pasos para habilitarla

#### Paso 2: Generar App Password
1. Ve a https://myaccount.google.com/apppasswords
2. Si no aparece el formulario, verifica que tengas "Verificación en dos pasos" activada
3. En "Selecciona la app" elige "Correo"
4. En "Selecciona el dispositivo" elige "Windows, Mac o Linux"
5. Google te mostrará una contraseña de 16 caracteres
6. Copia esa contraseña

#### Paso 3: Agregar a .env
```
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASSWORD=tu_app_password_aqui
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

### Opción B: Usar Otro Proveedor de Email
Si prefieres usar otro proveedor (Outlook, SendGrid, etc.), cambia:
- `EMAIL_HOST`: SMTP del proveedor
- `EMAIL_PORT`: Puerto SMTP (generalmente 587 o 465)
- `EMAIL_USER`: Tu correo/usuario
- `EMAIL_PASSWORD`: Tu contraseña o API key

## 3. Crear el archivo .env

1. Dentro de la carpeta `backend/`, copia el archivo `.env.example`:
```bash
cd backend
cp .env.example .env
```

2. Abre el archivo `.env` en tu editor favorito

3. Reemplaza los valores de placeholder con tus credenciales reales:
```
PORT=5000
NODE_ENV=development

# Mercado Pago Credentials
MERCADOPAGO_ACCESS_TOKEN=APP_USR-1234567890123456-XXXXXX
MERCADOPAGO_PUBLIC_KEY=APP_USR_XXXXXX

# Email Configuration (Gmail)
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Frontend URL
FRONTEND_URL=http://localhost:5174

# Database (para uso futuro)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kbt_store
DB_USER=postgres
DB_PASSWORD=password
```

## 4. Iniciar el Backend

```bash
cd backend
npm install  # Si no lo hiciste aún
npm run dev  # Para desarrollo
# o
npm start    # Para producción
```

Debería ver un mensaje como:
```
Servidor corriendo en puerto 5000
Modo: development
```

## 5. Probar que el Backend Funciona

Haz una petición GET a:
```
http://localhost:5000/api/health
```

Debería responder:
```json
{"status": "Backend funcionando correctamente"}
```

## Troubleshooting

### Error: "MERCADOPAGO_ACCESS_TOKEN is not defined"
- Asegúrate de que el archivo `.env` existe
- Verifica que los valores estén correctos (sin espacios extra)
- Reinicia el servidor después de cambiar `.env`

### Error: "Cannot send mail - EAUTH"
- Verifica que las credenciales de Gmail sean correctas
- Asegúrate de tener "Verificación en dos pasos" habilitada
- Usa una "App Password" de 16 caracteres, no tu contraseña normal

### Error: "Connection refused"
- El frontend está intentando conectar pero el backend no corre
- Inicia el backend primero
- Verifica que esté en puerto 5000

