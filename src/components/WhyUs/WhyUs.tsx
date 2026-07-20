import { whyUsCards } from '../../data/whyUsCards';

import SectionTitle from '../SectionTitle/SectionTitle';
import WhyUsCard from '../WhyUsCard/WhyUsCard';

import './WhyUs.scss';

const WhyUs = () => {
  return (
    <section
      className="whyUs"
    >
      <div className="container">
        <div className="whyUs__wrapper">

          <div className="whyUs__intro">

            <SectionTitle
              subtitle="WHY CHOOSE US"
              title="Built on Quality. Focused on Detail."
              centered={false}
              showDivider={false}
            />

          </div>

          {whyUsCards.map((item) => (
            <WhyUsCard
              key={item.title}
              {...item}
            />
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyUs;