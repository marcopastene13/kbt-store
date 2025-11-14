import Carousel from 'react-bootstrap/Carousel';

export default function CarouselJumbo() {
  return (
    <Carousel>
      <Carousel.Item>
        <div style={{background:'#FFD700', height:'350px', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <h1 style={{color:'#212529'}}>Bienvenido a KBT Store</h1>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{background:'#2A7FFF', height:'350px', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <h1 style={{color:'#FFF'}}>Ofertas de Verano</h1>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{background:'#CED4DA', height:'350px', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <h1 style={{color:'#212529'}}>Descubre nuestros best sellers</h1>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
