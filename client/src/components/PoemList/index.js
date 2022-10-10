
import React from "react";
import { Link } from 'react-router-dom';

const PoemList = ({ poems, title }) => {
    if (!poems.length) {
        return <h3>No poems yet</h3>;
    };

    return (
         <nav>
            <h3>{title}</h3> 
            {poems &&
            poems.map(poem => (
                <div key={poem._id} className="card mb-3">
                    <p className="card-header">
                        <Link
                        to={`/profile/${poem.username}`}
                        style={{ fontWeight: 700 }}
                        className="text-light"
                        >
                            {poem.username}
                        </Link>{' '}
                        poem on {poem.createdAt}
                    </p>
                    <div className="card-body">
                        <Link to={`/poem/${poem._id}`}>
                            <p>{poem.poemText}</p>
                            <p className="mb-0">
                                Riff: {poem.riffCount} || Click to{' '}
                                {poem.riffCount ? 'see' : 'start'} the discussion!
                            </p>
                        </Link>
                    </div>
                </div>      
            ))}      
        </nav>
     );
};

export default PoemList;