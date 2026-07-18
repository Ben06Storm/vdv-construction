
import { reviewsCards } from '../../data/reviews';

import SectionTitle from '../SectionTitle/SectionTitle';
import ReviewCard from '../ReviewCard/ReviewCard';

import './Reviews.scss';

const Reviews = () => {
  return (
<section className="reviews" id="reviews">
  <div className="container">
    <SectionTitle
      subtitle="WHAT OUR CLIENTS SAY"
      title="Trusted by Our Clients"
      centered={true}
      showDivider={true}
    />
    <div className="reviews__list">
      {reviewsCards.map((item) => (
        <ReviewCard
          key={item.id}
          {...item}
        />
      ))}
    </div>
  </div>
</section>
  );
};
export default Reviews;