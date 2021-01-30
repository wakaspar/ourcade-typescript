// Dependency list:
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pencil, Plus, Globe } from 'react-bootstrap-icons';
import { Button } from '../components/AuthForms';

// TypeScript interfaces:
interface BoardProps {
    score: { 
        _id: number;
        score_value: number;
        score_game: string;
        score_player_num: number;
        score_multiplayer: boolean; 
    }
    location: any;
    history: any;
    match: any;
}

// 'Score' functional component definition
const Score = (props: BoardProps) => (
  <tr>
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

// 'Scoreboard' functional component definition
const Scoreboard = () => {
    const [scores, setScores] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState();

    const scoreList = (scores: any) => {
        return scores.map(function(currentScore: any, i: any){
            return <Score score={currentScore} key={i} location history match />
        });
    };

    // 'useEffect' hook definition:
    useEffect(() => {
        axios.get('http://localhost:4000/api/scores/')
            .then(res => {
                setScores(res.data);
                setIsMounted(true);
            })
            .catch(err => {
                setError(err.message);
                setIsMounted(true);
                console.log('error:', error);
            })
            console.log('Scoreboard isMounted:', isMounted);
    }, [isMounted, error]);

    return (
        <div>
          <div style={{display: "inline-flex"}}>
            <h2 style={{margin: "auto"}}>
              <Globe style={{margin: "0px 3px 5px 0px"}} />
              Scoreboard
            </h2>
            <Link to="/create" className="nav-link">
              <Button>
                <Plus size={15} style={{margin: "0px 2px 2px 0px"}}/>
                Add a score
              </Button>
            </Link>
          </div>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Score Value</th>
                <th>Game</th>
                <th>P</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              { scoreList(scores) }
            </tbody>
          </table>
          <br/>
      </div>
    )
}
export default Scoreboard;