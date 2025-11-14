import { createContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const carritoInicial = JSON.parse(localStorage.getItem('carrito_kbt')) || [];
    const [carrito, setCarrito] = useState(carritoInicial);

    useEffect(() => {
        localStorage.setItem('carrito_kbt', JSON.stringify(carrito));
    }, [carrito]);

    // MEJORA: agregar producto suma cantidad si ya existe
    const agregarProducto = (producto) => {
        setCarrito(prev => {
            const existe = prev.find(p => p.id === producto.id);
            if (existe) {
                return prev.map(p =>
                    p.id === producto.id
                        ? { ...p, cantidad: (p.cantidad || 1) + 1 }
                        : p
                );
            } else {
                return [...prev, { ...producto, cantidad: 1 }];
            }
        });
    };
    // Sumar desde el carrito
    const sumarUnidadProducto = (id) => {
        setCarrito(prev =>
            prev.map(p =>
                p.id === id
                    ? { ...p, cantidad: (p.cantidad || 1) + 1 }
                    : p
            )
        );
    };

    const eliminarProducto = (id) => {
        setCarrito(prev => prev.filter(p => p.id !== id));
    };

    // Quitar una unidad y eliminar si llega a 0
    const quitarUnidadProducto = (id) => {
        setCarrito(prev =>
            prev.map(p =>
                p.id === id && p.cantidad > 1
                    ? { ...p, cantidad: p.cantidad - 1 }
                    : p
            )
        );
    };


    return (
        <CarritoContext.Provider value={{
            carrito,
            agregarProducto,
            eliminarProducto,
            quitarUnidadProducto,
            sumarUnidadProducto
        }}>
            {children}
        </CarritoContext.Provider>
    );
}
