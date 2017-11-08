import React from 'react';
import ArrowDownIcon from 'react-icons/lib/fa/arrow-down';
import ArrowUpIcon from 'react-icons/lib/fa/arrow-up';
import './VoteScore.css';

export default function VoteScore (props) {
  return (
    <div className='vote-score-container'>
      <button
        type='button'
        className='vote-up'
        onClick={() => props.onVoteChange('upVote')}
      >
        <ArrowUpIcon />
      </button>

      <div className='vote-score'>
        {props.voteScore}
      </div>

      <button
        type='button'
        className='vote-down'
        onClick={() => props.onVoteChange('downVote')}
      >
        <ArrowDownIcon />
      </button>

    </div>
  )
}
