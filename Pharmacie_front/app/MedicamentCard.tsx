import React, { useState } from 'react';
import { Medicament } from './types';

interface Props {
  medicament: Medicament;
}

const MedicamentCard: React.FC<Props> = ({ medicament }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="mx-auto w-full lg:w-2/3 xl:w-1/2 glass mb-30">
      <div className="h-96 carousel carousel-vertical rounded-box">
        <div className="carousel-item h-full">
          {medicament.images.map((imageUrl, index) => (
            <div key={index} className="carousel-item h-full">
              <img src={imageUrl} alt={`Carousel Item ${index + 1}`} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="card-body p-4">
        <h2 className="card-title text-xl font-bold">{medicament.name}</h2>
        {showDescription && <p className="text-sm">{medicament.description}</p>}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary" onClick={() => setShowDescription(!showDescription)}>
            {showDescription ? 'Hide Description' : 'Learn More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicamentCard;
