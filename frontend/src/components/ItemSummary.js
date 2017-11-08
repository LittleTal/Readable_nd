import React from 'react'
import moment from 'moment'
import './ItemSummary.css'

const DATE_FORMAT = 'D MMM YY HH:mm'

function formatTime (timestamp) {
  return moment(timestamp).format(DATE_FORMAT)
}

export default function ItemSummary (props) {
  return (
    <span>
      <div>
        Submitted by <span className='author'> {props.item.author} </span>

        <span className='timestamp'> {' '}{formatTime(props.item.timestamp)}</span>

        </div>
    </span>
  )
}
