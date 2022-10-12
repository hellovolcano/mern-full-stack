import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper'

const RiffList = ({ riffs }) => {
  return (
    <div className="card mb-3">
        <div className="card-header">
            <span style={{ fontWeight: 700 }} className="text-light">
              Riffs</span>
        </div>
        <div className="card-body">
            {riffs &&
            riffs.map(riff => (
            <Paper 
            sx={{ p: 1, ml: 3 }}
            className="mb-3" 
            key={riff._id}
            >
                {riff.riffBody} {'// '}
                <Link to={`/profile/${riff.username}`} style={{ fontWeight: 700 }}>
                {riff.username} on {riff.createdAt}
                </Link>
            </Paper>
            ))}
        </div>
    </div>
  );
};

export default RiffList;