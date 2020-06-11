import * as React from 'react';
import Axios from 'axios';

interface IProps {
    score :any
    unmount :any
    // history :any
}

export default class DeleteScore extends React.Component <IProps> {

    public onDeleteScore = (e :any) => {
      e.preventDefault();
      Axios.delete('http://localhost:4000/api/scores/' + this.props.score)
        .then(res => console.log(res.data));
      this.props.unmount();
    }

    public render() {
        return (
            <span>
              <input type="button" onClick={this.onDeleteScore} value="Delete Score" className="btn btn-danger" />
            </span>
        )
    }
}
