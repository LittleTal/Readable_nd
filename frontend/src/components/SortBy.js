import React from 'react';

export default function SortBy (props) {
  return (
    <div>
      <div>
        <label htmlFor='posts-sort-by'>
          Sort post by
        </label>

        <select
          id='posts-sort-by'
          value={props.sortBy}
          onChange={event => props.onSortByChange(event.target.value)}
        >
          <option value='voteScore'>Vote Score</option>
          <option value='timestamp'>Time</option>
        </select>

      </div>

    </div>
  )
}
