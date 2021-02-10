// Dependency list:
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pencil, Plus, Globe, People, Person, PersonFill, PeopleFill, GearFill } from 'react-bootstrap-icons';
import { BigCard } from '../components/AuthForms';

// TypeScript interfaces:
interface ScoreProps {
  score: { 
    _id: number;
    _player: any;
    score_value: number;
    score_game: string;
    score_player_num: number;
    score_multiplayer: boolean; 
  }
  location: any;
  history: any;
  match: any;
}

// <Score /> functional component definition:
const Score = (props: ScoreProps) => (
  <tr>
    <td className={props.score.score_multiplayer ? 'multiplayer' : 'singleplayer'}>{props.score._player.username}</td>
    <td className={props.score.score_multiplayer ? 'multiplayer' : 'singleplayer'}>{props.score.score_value}</td>
    <td className={props.score.score_multiplayer ? 'multiplayer' : 'singleplayer'}>{props.score.score_game}</td>
    <td className={props.score.score_multiplayer ? 'multiplayer' : 'singleplayer'}>
      { props.score.score_multiplayer == false && (
        <PersonFill color="black" size={25} />
      )}
      { props.score.score_multiplayer == true && (
        <div style={{ display:"flex" }}>
          <PeopleFill color="black" size={25} />
          <p> #{ props.score.score_player_num } </p>
        </div>
      )}
    </td>
    <td>
      <Link to={"/edit/" + props.score._id}>
        <GearFill color="black" size={25} />
      </Link>
    </td>
  </tr>
)

// <Scoreboard /> functional component definition:
const Scoreboard = () => {
  // Variable declaration; state getters/setters for <Scoreboard />:
  const [scores, setScores] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState();

  // 'scoreList' function definition [maps scores to <Score /> component]:
  const scoreList = (scores: any) => {
    return scores.map(function(currentScore: any, i: any){
      return <Score score={currentScore} key={i} location history match />
    });
  };

  // 'getAllScores' function definiton:
  const getAllScores = useCallback( () => {
    axios.get('http://localhost:4000/api/scores/')
    .then(res => {
      setScores(res.data);
      setloading(false);
    })
    .catch(err => {
      setError(err.message);
      setloading(false);
    })
    if (error) { console.log('error: ', error) }
  },[error]);

  // 'useEffect' hook definition:
  useEffect(() => {
    getAllScores();
    return function cleanup() {
      setloading(true);
    }
  }, [getAllScores]);

  // JSX rendered:
  return (
    <BigCard>

      <div style={{display: "inline-flex"}}>
        <h2 style={{margin: "auto"}}>
          <Globe style={{margin: "0px 3px 5px 0px"}} />
          Global Scoreboard
        </h2>
        <Link to="/create" className="nav-link">
          <button className="btn btn-dark btn-sm">
            <Plus size={15} style={{margin: "0px 2px 2px 0px"}}/>
            Add a score
          </button>
        </Link>
      </div>

      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>User</th>
            <th>High score</th>
            <th>Game</th>
            <th>P</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            { loading ? <tr><td>retrieving scores...</td></tr> : null }
            { scoreList(scores) }
        </tbody>
      </table>
    </BigCard>
  );
}
export default Scoreboard;