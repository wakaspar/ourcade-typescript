// Dependency list:
import React, { useCallback, useEffect, useState, } from 'react';
import axios from 'axios';
import DeleteScore from "./DeleteScore";
import { useParams } from 'react-router-dom';

// TypeScript interfaces:
interface EditScoreProps {
  score: any
  data: any
  match :any
  history :any
}
interface EditScoreState {
  score_value :number
  score_game :string
  score_multiplayer :boolean
  score_player_num :number
}

// <EditScore /> functional component definition:
const EditScore = (props: EditScoreProps, state: EditScoreState) => {
  // Variable declaration:
  let params :any = useParams();
  // state getters/setters for <EditScore />:
  const [scoreValue, setScoreValue] = useState('');
  const [scoreGame, setScoreGame] = useState('');
  const [scoreMultiplayer, setScoreMultiplayer] = useState(false);
  const [scorePlayerNum, setScorePlayerNum] = useState('1');
  const [error, setError] = useState();
  const [isMounted, setIsMounted] = useState(false);

  // onChange methods:
  const onChangeScoreValue = (e :any) => {
    setScoreValue(e.target.value);
  }
  const onChangeScoreGame = (e :any) => {
    setScoreGame(e.target.value);
  }
  const onChangeScoreMultiplayer = (e: any) => {
    setScoreMultiplayer(e.target.checked);
  }
  const onChangeScorePlayerNum = (e: any) => {
    setScorePlayerNum(e.target.value);
  }

  // 'setScore' functon definition:
  const setScore = useCallback(
    (res: any) => {
      setScoreValue(res.score_value);
      setScoreGame(res.score_game);
      setScoreMultiplayer(res.score_multiplayer);
      setScorePlayerNum(res.score_player_num.toString());
    },
    []
  );

  // 'getScore' function definition:
  const getScore = useCallback(
    (props: { match: { params: { id: string; }; }; }) => {
      axios.get(`http://localhost:4000/api/scores/${params.id}`)
      .then(res => {
        if (res.status === 200 && !isMounted) {
          setScore(res.data);
          setIsMounted(true); 
        }
      })
      .catch(err => {
        setError(err.message);
        setIsMounted(true);
        console.log('error:', error);
      })
    },
    [error, params.id, isMounted, setScore]
  );

  // 'handleDeleteScore' function definition:
  const handleDeleteScore = () => {
    // this.props.history.push('/', this.state);
    let path = 'http://localhost:3000/scores'
    window.location.href = path;
  }

  // 'onSubmit' function definiton:
  const onSubmit = (e: any) => {
    e.preventDefault();
    const editScore = {
      score_value: scoreValue,
      score_game: scoreGame,
      score_multiplayer: scoreMultiplayer,
      score_player_num: scorePlayerNum,
    };
    axios.put(`http://localhost:4000/api/scores/${params.id}`, editScore)
    // redirect after PUT:
    let path = 'http://localhost:3000/scores'
    window.location.href = path;
  }

  // 'useEffect' hook definition:
  useEffect(() => {
    return getScore(props);
  }, [getScore, isMounted, props, scoreMultiplayer, scorePlayerNum, params ]);


  // JSX rendered:
  return (
  <div>
    <h2>Edit Score</h2>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Score: </label>
        <input  type="number"
                className="form-control"
                value={scoreValue}
                onChange={onChangeScoreValue}
                data-placeholder={state.score_value}
        />
      </div>
      <div className="form-group">
        <label>Game: </label>
        <input  type="text"
                className="form-control"
                value={scoreGame}
                onChange={onChangeScoreGame}
        />
      </div>
      <div>              
        <input name="multiplayerOptions"
               type="checkbox"
               checked={scoreMultiplayer}
               onChange={onChangeScoreMultiplayer} 
        />
        <label style={{padding: 3}}>Multiplayer:</label>
      </div>

      { scoreMultiplayer && (
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input  className="form-check-input"
                    type="radio"
                    name="playerNumberOptions"
                    id="playerOne"
                    value="1"
                    checked={scorePlayerNum === '1'}
                    onChange={onChangeScorePlayerNum}
            />
            <label className="form-check-label">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input  className="form-check-input"
                    type="radio"
                    name="playerNumberOptions"
                    id="playerTwo"
                    value="2"
                    checked={scorePlayerNum === '2'}
                    onChange={onChangeScorePlayerNum}
            />
            <label className="form-check-label">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input  className="form-check-input"
                    type="radio"
                    name="playerNumberOptions"
                    id="playerThree"
                    value="3"
                    checked={scorePlayerNum === '3'}
                    onChange={onChangeScorePlayerNum}
            />
            <label className="form-check-label">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input  className="form-check-input"
                    type="radio"
                    name="playerNumberOptions"
                    id="playerFour"
                    value="4"
                    checked={scorePlayerNum === '4'}
                    onChange={onChangeScorePlayerNum}
            />
            <label className="form-check-label">4</label>
          </div>
        </div>
      )}

      <div className="form-group">
        <input type="submit" value="Edit Score" className="btn btn-success" style={{marginRight: 10}} />
        <DeleteScore score={props.match.params.id} unmount={handleDeleteScore} />
      </div>
    </form>
  </div>
  );
}

export default EditScore;