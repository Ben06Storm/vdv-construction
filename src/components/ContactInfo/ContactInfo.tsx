import type { LucideIcon } from 'lucide-react';

import './ContactInfo.scss';

type ContactInfoProps = {
  icon: LucideIcon;
  text: string;
};

const ContactInfo = ({
  icon: Icon,
  text,
}: ContactInfoProps) => {
  return (
    <div className="contactInfo">

      <Icon
        size={20}
        className="contactInfo__icon"
      />

      <span className="contactInfo__text">
        {text}
      </span>

    </div>
  );
};

export default ContactInfo;