import type { ReactNode } from 'react';

import Header from '../Header/Header';

import './LegalPage.scss';

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

const LegalPage = ({
  title,
  lastUpdated,
  children,
}: LegalPageProps) => {
  return (
    <>
      <Header />

      <main className="legal-page">
        <div className="container">
          <div className="legal-page__content">
            <p className="legal-page__subtitle">
              VDV CONSTRUCTION
            </p>

            <h1 className="legal-page__title">
              {title}
            </h1>

            <p className="legal-page__updated">
              Last updated: {lastUpdated}
            </p>

            <div className="legal-page__body">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LegalPage;