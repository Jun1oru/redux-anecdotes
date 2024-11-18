import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    );
};

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter === '') {
            return anecdotes;
        }
        return anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        );
    });
    [...anecdotes].sort(function (a, b) {
        return b.votes - a.votes;
    });

    const handleVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote));
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
    }

    return (
        <>
            {[...anecdotes]
                .sort(function (a, b) {
                    return b.votes - a.votes;
                })
                .map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() =>
                            handleVote(anecdote)
                        }
                    />
                )
            }
            <h2>create new</h2>
        </>
    );
};

export default AnecdoteList;