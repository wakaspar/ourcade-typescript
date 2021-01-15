// Dependency list:
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// TypeScript interfaces:
interface CreateScoreProps {
    history: any
    checked: any
}
interface CreateScoreState {
    score_value: number
    score_game: string
    score_multiplayer: boolean
    score_player_num: number
}

// 'CreateScore' functional component definition:
const CreateScore = (props: CreateScoreProps, state: CreateScoreState) => {
    // variable declaration:
    const [scoreValue, setScoreValue] = useState('');
    const [scoreGame, setScoreGame] = useState('');
    const [scoreMultiplayer, setScoreMultiplayer] = useState(false);
    const [scorePlayerNum, setScorePlayerNum] = useState('1');
    
    const [error, setError] = useState();
    const [isMounted, setIsMounted] = useState(false);

    // onChange methods:
    const onChangeScoreValue = (e: any) => {
      setScoreValue(e.target.value);
    }
    const onChangeScoreGame = (e: any) => {
      setScoreGame(e.target.value);
    }
    const onChangeScoreMultiplayer = (e: any) => {
      setScoreMultiplayer(e.target.checked);
    }
    const onChangeScorePlayerNum = (e: any) => {
      setScorePlayerNum(e.target.value);
    }

    // useEffect hook (monitors loudly):
    useEffect(() => {

      console.log('CreateScore useEffect() hook fired!')
      console.log('scoreMultiplayer: ', scoreMultiplayer);
      console.log('scorePlayerNum: ', scorePlayerNum);
      console.log('isMounted: ', isMounted)
      // setScorePlayerNum(parseInt(scorePlayerNum));
      return (
        setIsMounted(true)
        
      );
    }, [isMounted, setIsMounted, scoreMultiplayer, scorePlayerNum] );

    // 'onSubmit' function definition:
    const onSubmit = (e :any) => {
        e.preventDefault();
        const newScore = {
            score_value: scoreValue,
            score_game: scoreGame,
            score_multiplayer: scoreMultiplayer,
            score_player_num: scorePlayerNum,
        };
        
        axios.post('http://localhost:4000/api/scores', newScore)
        .then((response: { data: any; }) => console.log('POSTing new score: ', response.data))
        .catch(err => {
          setError(err.message);
          setIsMounted(true);
          console.log('error:', error);
        });

        let path = 'http://localhost:3000/scores'
        window.location.href = path;
    }

    return (
      <div>
        <h3>Create New Score</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Score: </label>
            <input  type="number"
                    className="form-control"
                    value={scoreValue}
                    onChange={onChangeScoreValue}
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
            <input
              name="multiplayerOptions"
              type="checkbox"
              checked={scoreMultiplayer}
              onChange={onChangeScoreMultiplayer} 
            />
            <label style={{padding: 3}}>Multiplayer:</label>
          </div>

          { scoreMultiplayer && (
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input className="form-check-input"
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
            <input type="submit" value="Create Score" className="btn btn-success" />
          </div>
        </form>
      </div>
    );
}

export default CreateScore;