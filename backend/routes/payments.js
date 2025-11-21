import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const router = express.Router();

// Configurar Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

// Crear preferencia de pago
router.post('/create-preference', async (req, res) => {
  try {
    const { items, order, customerEmail } = req.body;

    // Validaciones básicas
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No hay items en el carrito' });
    }

    if (!order || !order.id) {
      return res.status(400).json({ error: 'Falta información de la orden' });
    }

    // Mapear items para Mercado Pago
    const mpItems = items.map(item => ({
      title: item.nombre,
      quantity: item.cantidad,
      unit_price: item.precio,
      currency_id: 'CLP' // Chile - cambiar según país
    }));

    // Crear preferencia
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: mpItems,
        payer: {
          email: customerEmail,
        },
        back_urls: {
          success: `${process.env.FRONTEND_URL}/checkout?status=success&payment_id={payment_id}`,
          failure: `${process.env.FRONTEND_URL}/checkout?status=failure`,
          pending: `${process.env.FRONTEND_URL}/checkout?status=pending`,
        },
        auto_return: 'approved',
        external_reference: order.id,
        notification_url: `${process.env.BACKEND_URL}/api/payments/webhook`,
      },
    });

    res.json({
      preferenceId: result.id,
      initPoint: result.init_point,
      sandboxInitPoint: result.sandbox_init_point,
    });
  } catch (error) {
    console.error('Error creando preferencia:', error);
    res.status(500).json({ error: 'Error al crear preferencia de pago' });
  }
});

// Webhook para notificaciones de Mercado Pago
router.post('/webhook', async (req, res) => {
  try {
    const { type, data } = req.query;

    if (type === 'payment') {
      console.log('Notificación de pago recibida:', data);
      // Aquí procesar el pago confirmado
      // Guardar en base de datos, actualizar estado de orden, etc.
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error en webhook:', error);
    res.status(500).json({ error: 'Error procesando webhook' });
  }
});

// Procesar pago (simulación por ahora)
router.post('/process-payment', async (req, res) => {
  try {
    const { order, items, customer } = req.body;

    // Simulación: aceptar el pago
    const payment = {
      id: 'SIM-' + Date.now(),
      orderId: order.id,
      amount: items.reduce((total, item) => total + (item.precio * item.cantidad), 0),
      status: 'approved',
      customerEmail: customer.email,
      createdAt: new Date(),
    };

    console.log('Pago procesado (simulado):', payment);

    res.json({
      success: true,
      payment: payment,
      message: 'Pago procesado exitosamente',
    });
  } catch (error) {
    console.error('Error procesando pago:', error);
    res.status(500).json({ error: 'Error al procesar pago' });
  }
});

export default router;
