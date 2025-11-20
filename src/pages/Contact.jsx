import React, { useState } from 'react';
import '../styles/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Gracias por tu mensaje. Nos pondremos en contacto pronto.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page py-5">
      <div className="container">
        <h1 className="section-title">Contáctanos</h1>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="mb-3">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Mensaje</label>
                <textarea
                  className="form-control"
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
          </div>
          <div className="col-md-6">
            <div className="contact-info">
              <h3>Información de Contacto</h3>
              <p><strong>Email:</strong> info@kbtstore.com</p>
              <p><strong>Teléfono:</strong> +56 9 1234 5678</p>
              <p><strong>Dirección:</strong> Calle Principal 123, Santiago</p>
              <p><strong>Horario:</strong> Lunes a Viernes 9:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
