import React from 'react';

import Comment from './Comment';

function CommentList(props) {
  return (
    <section className="list-group list-group-flush">
    {props.data.map((comment, index) => (
      <Comment key={index} data={comment} onDelete={props.onDeleteComment}/>
    ))}
    </section>
  );
}

export default CommentList;