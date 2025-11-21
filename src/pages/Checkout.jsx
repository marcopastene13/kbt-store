import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/checkout.css';
import AddressAutocomplete from '../components/AddressAutocomplete';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    telefono: '',
    direccion: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  const validateRUT = (rut) => {
    const cleanRut = rut.replace(/[^0-9kK]/g, '');
    if (cleanRut.length < 7) return false;
    return true;
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es obligatorio';
    if (!validateRUT(formData.rut)) errors.rut = 'RUT inválido';
    if (!validateEmail(formData.email)) errors.email = 'Email inválido';
    if (!formData.telefono.trim()) errors.telefono = 'El teléfono es obligatorio';
    if (!formData.direccion.trim()) errors.direccion = 'La dirección es obligatoria';
    
    return errors;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const sendConfirmationEmail = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/email/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          nombre: formData.nombre,
          items: cart,
          total: getTotalPrice(),
          orderId: orderId
        })
      });
      
      if (!response.ok) {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).join('\n'));
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulación: aceptar el pago
      const newOrderId = 'ORD-' + Date.now();
      setOrderId(newOrderId);
      
      // Guardar orden en localStorage
      const order = {
        id: newOrderId,
        cliente: formData,
        items: cart,
        total: getTotalPrice(),
        fecha: new Date().toLocaleDateString('es-ES'),
        hora: new Date().toLocaleTimeString('es-ES'),
        estado: 'Procesando Pago'
      };
      
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Enviar email de confirmación
      await sendConfirmationEmail();
      
      setOrderConfirmed(true);
      clearCart();
      
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error procesando tu pedido');
    } finally {
      setLoading(false);
    }
  };
  
  if (orderConfirmed) {
    return (
      <div className="checkout-confirmation">
        <div className="confirmation-card">
          <div className="confirmation-icon">✓</div>
          <h2>Gracias por tu compra</h2>
          <p>Tu pedido ha sido confirmado</p>
          <p className="order-id">Número de orden: {orderId}</p>
          <p className="confirmation-email">Te enviaremos un email a {formData.email} con los detalles</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }
  
  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Tu carrito está vacío</h2>
        <button className="btn btn-primary" onClick={() => navigate('/catalog')}>
          Seguir comprando
        </button>
      </div>
    );
  }
  
  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form-section">
          <h2>Finalizar compra</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Juan Pérez"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="rut">RUT *</label>
              <input
                type="text"
                id="rut"
                name="rut"
                value={formData.rut}
                onChange={handleChange}
                placeholder="12.345.678-9"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="telefono">Teléfono *</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+56912345678"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="direccion">Dirección de envío *</label>
<AddressAutocomplete
          value={formData.direccion}
          onChange={(value) => setFormData({...formData, direccion: value})}
          onAddressSelect={(coordinates) => {
            console.log('Dirección validada:', coordinates);
            setFormData({...formData, coordenadas: coordinates});
          }}
        />            >
                    </div>
<button type="submit" className="btn btn-primary">
              {loading ? 'Procesando...' : 'Confirmar Compra'}
            </button>
          </form>
        </div>
        
        <div className="checkout-summary-section">
          <div className="order-summary">
            <h3>Resumen del pedido</h3>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="item-details">
                    <p className="item-name">{item.nombre}</p>
                    <p className="item-quantity">Cantidad: {item.cantidad}</p>
                  </div>
                  <p className="item-price">${(item.precio * item.cantidad).toLocaleString('es-ES')}</p>
                </div>
              ))}
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <p>Total:</p>
              <p className="total-price">${getTotalPrice().toLocaleString('es-ES')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
