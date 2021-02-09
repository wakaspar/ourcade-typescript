// Dependency list:
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pencil, Plus, Globe } from 'react-bootstrap-icons';
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
    <td className={props.score.score_multiplayer ? 'multiplayer' : ''}>{props.score._player.username}</td>
    <td className={props.score.score_multiplayer ? 'multiplayer' : ''}>{props.score.score_value}</td>
    <td className={props.score.score_multiplayer ? 'multiplayer' : ''}>{props.score.score_game}</td>
    <td className={props.score.score_multiplayer ? 'multiplayer' : ''}>{props.score.score_player_num}</td>
    <td>
      <Link to={"/edit/" + props.score._id}>
        <Pencil color="black" size={25} />
      </Link>
    </td>
  </tr>
)

// <Scoreboard /> functional component definition:
const Scoreboard = () => {
  // Variable declaration; state getters/setters for <Scoreboard />:
  const [scores, setScores] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setloading] = useState(true)
  const [error, setError] = useState();

  // 'scoreList' function definition [maps scores to <Score /> component]:
  const scoreList = (scores: any) => {
    return scores.map(function(currentScore: any, i: any){
      return <Score score={currentScore} key={i} location history match />
    });
  };

  // 'getScores' function definiton:
  const getScores = useCallback( (mounted) => {
    axios.get('http://localhost:4000/api/scores/')
    .then(res => {
      if (mounted) {
        setScores(res.data);
        setIsMounted(true);
        setloading(false);
        console.log('scores: ', scores);     
      }
    })
    .catch(err => {
      setError(err.message);
      setIsMounted(true);
      console.log('error: ', error);
    })
  },[error, scores]);

  // 'useEffect' hook definition:
  useEffect(() => {
    let mounted = true;
    getScores(mounted);
    return function cleanup() {
      mounted = false
    }
  }, [isMounted, getScores]);

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
            <th>Username</th>
            <th>Score Value</th>
            <th>Game</th>
            <th>P</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
            { loading ? <tr>retrieving scores...</tr> : null }
            { scoreList(scores) }
        </tbody>
      </table>
    </BigCard>
  );
}
export default Scoreboard;