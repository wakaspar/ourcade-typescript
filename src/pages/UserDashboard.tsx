// Dependency list:
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Plus, GearFill, PeopleFill, PersonFill } from 'react-bootstrap-icons';
import { BigCard } from '../components/AuthForms';

import * as Icons from 'react-bootstrap-icons';

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

interface UserDashProps {
  scores: any;
  loading: boolean;
  name: string;
  error: string;
}

interface UserDashState {/* * */}


// <Score /> functional component definition:
const Score = (props: ScoreProps) => (
  <tr>
    <td>{ props.score._player.username }</td>
    <td>{ props.score.score_value }</td>
    <td>{ props.score.score_game }</td>
    <td>{ props.score.score_multiplayer == false && (
        <PersonFill color="black" size={25} />
      )}
      { props.score.score_multiplayer == true && (
        <div style={{ display:"flex" }}>
          <PeopleFill color="black" size={25} />
          <p>#{ props.score.score_player_num }</p>
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


// <UserHeader /> functional component definition:
const UserHeader = (props: any) => {
  // Variable declaration; state getters/setters for <UserHeader />:
  const [isMounted, setIsMounted] = useState(false);
  const [username, setUsername] = useState('');
  const { [props.icon]: Icon }: any = Icons;
  // 'setUser' functon definition:
  const setUser = useCallback(
    (props: any) => {
      setUsername(props.name);
      setIsMounted(true);
    },[]
  );
  // 'useEffect' hook definition:
  useEffect(() => {
    return setUser(props);
  }, [setUser, isMounted, username, props, Icon]);
  // JSX rendered:
  return(
    <div style={{display: "inline-flex"}}>
      <h2 style={{margin: "auto"}}>
        <Icon style={{margin: "0px 3px 5px 0px"}} />
        { username }'s { props.text }
      </h2>
      <Link to="/create" className="nav-link">
        <button className="btn btn-dark btn-sm">
          <Plus size={15} style={{margin: "0px 2px 2px 0px"}}/>
          Add a score
        </button>
      </Link>
    </div>
  );
}


// <UserDashboard /> functional component definition:
const UserDashboard = (props: UserDashProps, state: UserDashState) => {
  // Variable declaration; localStorage variables:
  const existingUserID = JSON.parse( localStorage.getItem('user') !);    
  // state getters/setters for <UserDashboard />:
  const [currentUserID] = useState(existingUserID);
  const [scores, setScores] = useState([]);
  const [loading, setloading] = useState(true);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  // 'scoreList' function definition [maps scores to <Score /> component]:
  const scoreList = (scores: any) => {
    return scores.map(function(currentScore: any, i: any){
      return <Score score={currentScore} key={i} location history match />
    });
  };

  // 'getUserScores' function definition:
  const getUserScores = useCallback(() => {
    axios.get(`http://localhost:4000/api/users/scores/${currentUserID}`)
    .then(res => {
      setScores(res.data);
      setUserHeader(res.data);
      setloading(false);
      
    })
    .catch(err => {
      setError(err.message);
      setloading(false);
    })
    if (error) { console.log('error: ', error) }
  },[currentUserID, error]);

  // 'setUserHeader' function definition:
  const setUserHeader = (scores: any) => {
    setName(scores[0]._player.username);
  }

  // 'useEffect' hook definition:
  useEffect(() => {
    getUserScores();
    return function cleanup() {
      setloading(false);
    }
  }, [getUserScores, loading]);
    
  // JSX Rendered:
  return(
    <BigCard>
      <UserHeader name={ name } text={ "Dashboard" } icon={'GraphUp'} />
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
          { scoreList(scores) }
        </tbody>
      </table>
    </BigCard>
  );
}

export default UserDashboard;