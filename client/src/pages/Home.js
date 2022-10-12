import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_POEMS } from '../utils/queries';
import PoemList from '../components/PoemList';
import PoemForm from '../components/PoemForm';

const Home = () => {
    const { loading, data } = useQuery(QUERY_POEMS);
    
    const poems = data?.poems || [];

    const loggedIn = Auth.loggedIn();
    return(
        <main>
            <div className='flex-row justify-space-between'>
                {loggedIn && (
                <div className='col-12 col-lg-4 mb-3'>
                    <PoemForm />
                </div>
                )}
            </div>
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
            {loading ? (
            <div>Loading...</div>
            ) : (
            <PoemList poems={poems} title="Poetry is thoughts that breathe, and words that burn. - Thomas Gray" />
            )}
        </div>

        </main>
    );
};

export default Home;



