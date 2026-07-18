import { useState } from 'react';

import CardService from '../CardService/CardService';
import SectionTitle from '../SectionTitle/SectionTitle';
import ServiceRequestModal from '../ServiceRequestModal/ServiceRequestModal';
import './Services.scss';

import { services } from '../../data/service';


const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleRequest = (title: string) => {
    setSelectedService(title);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

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
              onRequest={handleRequest}
            />
          ))}
        </div>
      </div>
      <ServiceRequestModal
        serviceTitle={selectedService}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Services;