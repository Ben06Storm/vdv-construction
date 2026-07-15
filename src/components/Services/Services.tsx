import CardService from '../CardService/CardService';
import SectionTitle from '../SectionTitle/SectionTitle';
import './Services.scss';

import { services } from '../../data/service';


const Services = () => {
  return (
    <section className="services" id='services'>
      <div className="services__container">
        <div className="services__title">
          <SectionTitle
            subtitle="OUR SERVICES"
            title="Expert Tile & Construction Services"
          />
        </div>
        <div className="services__grid">
          {services.map((service) => (
            <CardService
              key={service.id}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;