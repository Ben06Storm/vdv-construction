import type { LucideIcon } from 'lucide-react';

import './ContactInfo.scss';

type ContactInfoProps = {
  icon: LucideIcon;
  text: string;
  href: string;
};

const ContactInfo = ({
  icon: Icon,
  text,
  href,
}: ContactInfoProps) => {
  return (
    <div className="contactInfo">

      <Icon
        size={20}
        aria-hidden = "true"
        className="contactInfo__icon"
      />

{href ? (
  <a
    href={href}
    className="contactInfo__text"
  >
    {text}
  </a>
) : (
  <p className="contactInfo__text">
    {text}
  </p>
)}

    </div>
  );
};

export default ContactInfo;