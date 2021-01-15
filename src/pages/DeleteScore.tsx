// Dependency list:
import * as React from 'react';
import Axios from 'axios';

// TypeScript interface:
interface ScoreProps {
    score :any
    unmount :any
}

// 'DeleteScore' functional component definition:
const DeleteScore = (props: ScoreProps) => {
    const onDeleteScore = (e :any) => {
      e.preventDefault();
      Axios.delete('http://localhost:4000/api/scores/' + props.score)
        .then(res => console.log(res.data));
      props.unmount();
    }

    return (
        <span>
          <input type="button" onClick={onDeleteScore} value="Delete Score" className="btn btn-danger" />
        </span>
    )
}

export default DeleteScore;