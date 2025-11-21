import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Crear transportador de correo
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Enviar email de confirmación
router.post('/send-confirmation', async (req, res) => {
  try {
    const { email, nombre, items, total, orderId } = req.body;

    // Validar email
    if (!email || !nombre || !items || !orderId) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Crear HTML del email
    const itemsHTML = items
      .map(
        (item) =>
          `<tr>
            <td>${item.nombre}</td>
            <td align="center">${item.cantidad}</td>
            <td align="right">$${item.precio.toLocaleString('es-ES')}</td>
            <td align="right">$${(item.precio * item.cantidad).toLocaleString('es-ES')}</td>
          </tr>`
      )
      .join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; border: 1px solid #ddd; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background-color: #f0f0f0; padding: 10px; text-align: left; border-bottom: 2px solid #ddd; }
            td { padding: 10px; border-bottom: 1px solid #eee; }
            .total { font-size: 18px; font-weight: bold; color: #667eea; }
            .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 5px 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Confirmación de Compra</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${nombre}</strong>,</p>
              <p>Gracias por tu compra en KBT Store. Aquí está el resumen de tu pedido:</p>
              
              <p><strong>Número de Orden:</strong> ${orderId}</p>
              <p><strong>Email:</strong> ${email}</p>
              
              <table>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Total</th>
                </tr>
                ${itemsHTML}
                <tr>
                  <td colspan="3" style="text-align: right; font-weight: bold;">TOTAL:</td>
                  <td style="text-align: right;" class="total">$${total.toLocaleString('es-ES')}</td>
                </tr>
              </table>
              
              <p>Tu pedido será procesado pronto. Si tienes alguna pregunta, no dudes en contactarnos.</p>
              <p>Saludos,<br><strong>KBT Store Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 KBT Store. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Confirmación de Compra - Orden ${orderId}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: `Email enviado exitosamente a ${email}`,
    });
  } catch (error) {
    console.error('Error enviando email:', error);
    res.status(500).json({ error: 'Error al enviar email de confirmación' });
  }
});

// Enviar email de contacto
router.post('/send-contact', async (req, res) => {
  try {
    const { nombre, email, asunto, mensaje } = req.body;

    if (!nombre || !email || !asunto || !mensaje) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de contacto: ${asunto}`,
      html: `
        <h2>Nuevo Mensaje de Contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Mensaje enviado. Te responderemos pronto.',
    });
  } catch (error) {
    console.error('Error enviando email de contacto:', error);
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
});

export default router;
