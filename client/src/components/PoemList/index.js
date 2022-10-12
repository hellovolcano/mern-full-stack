import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import React from "react";
import { Link } from 'react-router-dom';

const PoemList = ({ poems, title }) => {
    if (!poems.length) {
        return <h3>No poems yet</h3>;
    };

    return (
         <div>
            <h3>{title}</h3> 
            {poems &&
            poems.map(poem => (
                <Card 
                key={poem._id}
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, .6)",
                        '&:hover': {
                            backgroundColor: "rgba(255, 255, 255, .9)",
                        },
                    padding: 1,
                    margin: 1
                }}
                variant="outlined">

                        
 
                    <CardContent>
                        <Link
                            to={`/profile/${poem.username}`}
                            style={{ fontWeight: 700 }}
                            className="text-light"
                            >
                            {poem.username}
                        </Link>{' '}
                                poem on {poem.createdAt}
                                <Link to={`/poem/${poem._id}`}><p className='poem-body'>{poem.poemText}</p></Link>
                    </CardContent>
                    <CardActions>
                        
                            
                    <Link to={`/poem/${poem._id}`}>
                                Riff: {poem.riffCount} || Click to{' '}
                                {poem.riffCount ? 'see' : 'start'} the discussion!
                        </Link>
                    </CardActions>
                </Card>
            ))}      
        </div>
     );
};

export default PoemList;