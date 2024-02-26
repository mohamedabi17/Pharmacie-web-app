import React from 'react';
import { Medicament } from './types';

interface Props {
  medicament: Medicament;
}

const MedicamentCard: React.FC<Props> = ({ medicament }) => {
  return (
    <div className="mx-auto card w-96 glass flex ">
      <figure><img src={medicament.images[0]} alt={medicament.name}/></figure>
      <div className="card-body">
        <h2 className="card-title">{medicament.name}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Learn more</button>
        </div>
      </div>
    </div>

  );
};

export default MedicamentCard;
