import React from 'react'

export default function CommentCount (props) {
  const { count = 0 } = props
  return (
      <span className={props.className}>
        {count} comment{count !== 1 && 's'}
      </span>
    )
}
