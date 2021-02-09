// Dependency list:
import * as React from 'react';
import axios from 'axios';

// TypeScript interface:
interface ScoreProps {
    score :any
    unmount :any
}

// <DeleteScore /> functional component definition:
const DeleteScore = (props: ScoreProps) => {
  // 'onDeleteScore' function definition:
  const onDeleteScore = (e :any) => {
    e.preventDefault();
    axios.delete('http://localhost:4000/api/scores/' + props.score)
      .then(res => console.log(res.data));
    props.unmount();
  }
  // JSX returned:
  return (
    <span>
      <input type="button" onClick={onDeleteScore} value="Delete Score" className="btn btn-secondary" />
    </span>
  );
}

export default DeleteScore;