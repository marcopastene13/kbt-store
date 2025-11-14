import Carousel from 'react-bootstrap/Carousel';

export default function CarouselJumbo() {
  return (
    <Carousel>
      <Carousel.Item>
        <div style={{background:'#FFD700', height:'400px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <img src="/logo.png" alt="KBT Store logo" height="100" style={{marginBottom:'20px'}} />
          <h1 style={{color:'#212529'}}>Tienda KBT Store</h1>
          <p style={{color:'#212529', fontSize:'1.5rem', fontWeight:'bold'}}>Tendencias que marcan la diferencia</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{background:'#2A7FFF', height:'400px', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <h1 style={{color:'#FFF'}}>Ofertas Especiales de Verano</h1>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{background:'#CED4DA', height:'400px', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <h1 style={{color:'#212529'}}>Descubre nuestros best sellers</h1>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
