// Dependency list:
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Controller, Plus, Trophy } from 'react-bootstrap-icons';
import { BigCard } from '../components/AuthForms';

// TypeScript interfaces:
interface CreateScoreProps {
    history: any
    checked: any
}
interface CreateScoreState {
    _player: number
    score_value: number
    score_game: string
    score_multiplayer: boolean
    score_player_num: number
}

// <CreateScore /> functional component definition:
const CreateScore = (props: CreateScoreProps, state: CreateScoreState) => {
    // Variable declaration; localStorage variables for <AuthContext />:
    const existingUserID = JSON.parse( localStorage.getItem('user') !);
    // state getters/setters for <CreateScore />:
    const [_player] = useState(existingUserID);
    const [scoreValue, setScoreValue] = useState('');
    const [scoreGame, setScoreGame] = useState('');
    const [scoreMultiplayer, setScoreMultiplayer] = useState(false);
    const [scorePlayerNum, setScorePlayerNum] = useState('1');
    const [multiToggle, setMultiToggle] = useState('');
    // error handling & clean-up variables:
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

    // 'useEffect' hook definition:
    useEffect(() => {
      if (scoreMultiplayer) {
        setMultiToggle('Select player number:');
      } else {
        setMultiToggle('Click for multiplayer');
      }
      return ( setIsMounted(true) );
    }, [setIsMounted, isMounted, scoreMultiplayer] );

    // 'onSubmit' function definition:
    const onSubmit = (e :any) => {
        e.preventDefault();
        const newScore = {
            _player: _player,
            score_value: scoreValue,
            score_game: scoreGame,
            score_multiplayer: scoreMultiplayer,
            score_player_num: scorePlayerNum,
        };
        axios.post('http://localhost:4000/api/scores', newScore)
          .catch(err => {
            setError(err.message);
            setIsMounted(true);
            console.log('error:', error);
          });
        let path = 'http://localhost:3000/scores'
        window.location.href = path;
    }
    
    // JSX rendered:
    return (
      <BigCard>

        <div style={{display: "inline-flex"}}>
          <h2 style={{margin: "auto"}}>
            <Plus style={{margin: "0px 3px 5px 0px"}} />
            Add a new score
          </h2>
        </div>
        <form onSubmit={onSubmit}>
          <br/>  
          <div className="form-group" style={{ display:"flex" }}>
            <Trophy size={25} style={{margin: ".75% 1.25%"}} />
            <input  type="number"
                    className="form-control"
                    value={scoreValue}
                    onChange={onChangeScoreValue}
                    placeholder="High score value"
            />
          </div>
          <div className="form-group" style={{ display:"flex" }}>
            <Controller size={25} style={{margin: ".75% 1.25%"}} />
            <input  type="text"
                    className="form-control"
                    value={scoreGame}
                    onChange={onChangeScoreGame}
                    placeholder="Game played"
            />
          </div>
          <div>              
            <input
              name="multiplayerOptions"
              type="checkbox"
              checked={scoreMultiplayer}
              onChange={onChangeScoreMultiplayer} 
            />
            <label style={{padding: 3}}>
              { multiToggle }
            </label>
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
                <label className="form-check-label">#1</label>
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
                <label className="form-check-label">#2</label>
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
                <label className="form-check-label">#3</label>
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
                <label className="form-check-label">#4</label>
              </div>
            </div>
          )}
          <div className="form-group">
            <input type="submit" value="Create Score" className="btn btn-dark" />
          </div>
        </form>
      </BigCard>
    );
}

export default CreateScore;