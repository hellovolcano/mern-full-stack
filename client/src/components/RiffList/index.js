

import React from "react";
import { Link } from 'react-router-dom';

const RiffsList = ({ riffs, title }) => {
    if (!riffs.length) {
        return <h3>No riffs yet</h3>;
    }
function RiffList() {
    return (
        <div>
            <h3>{title}</h3>
            {riffs &&
                riffs.map(riff => (
                    <div key={riff._id} className="card mb-3">
                        <p className="card-header">
                            <Link
                            to={`/profile/${riff.username}`}
                            style={{ fontWeight: 700 }}
                            className="text-light"
                            >
                                {riff.username}
                             </Link>{' '}
                            riff on {riff.createdAt}
                        </p>
                        <div className="card-body">
                        <Link to={`/riff/${riff._id}`}>
                            <p>{riff.riffText}</p>
                            <p className="mb-0">
                                Reactions: {riff.reactionCount} || Click to{' '}
                                {riff.reactionCount ? 'see' : 'start'} the discussion!
                            </p>
                        </Link>
                        </div>
                    </div>
                ))}
        </div>
        
    );
};
    return(
        <nav>
            <ul>
            </ul>

        </nav>
    )
}
export default RiffList