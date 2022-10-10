import React from 'react';
import { Link } from 'react-router-dom';

const RiffList = ({ riffs }) => {
  return (
    <div className="card mb-3">
        <div className="card-header">
            <span className="text-light">Riffs</span>
        </div>
        <div className="card-body">
            {riffs &&
            riffs.map(riff => (
            <p className="pill mb-3" key={riff._id}>
                {riff.riffBody} {'// '}
                <Link to={`/profile/${riff.username}`} style={{ fontWeight: 700 }}>
                {riff.username} on {riff.createdAt}
                </Link>
            </p>
            ))}
        </div>
    </div>
  );
};

export default RiffList;