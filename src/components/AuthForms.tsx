import styled from 'styled-components';
// Not currently using <Form/> or <Input/>...
const Card = styled.div`
    box-sizing: border-box;
    border: 3px solid #f8f9fa;
    border-radius: 30px;
    max-width: 45%;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BigCard = styled.div`
    max-width: 90%;
    padding: 2%;
    margin: 0 auto; 
    box-sizing: border-box;
    border: 3px solid #f8f9fa;
    border-radius: 30px;
`

const Form = styled.div`
    dispaly: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
`;

const Input = styled.input`
    padding: 1rem;
    border: 1px solid #999;
    margin: 1rem;
    font-size: 0.8rem;
`;

const Button = styled.button`
    background: linear-gradient(to bottom, #6371c7, #5563c1);
    border-color: #3f4eae;
    border-radius:  3px;
    padding: .5rem;
    color: white;
    font-weight: 700;
    font-size: 0.8rem;
`;

const Logo = styled.img`
    margin-bottom: 1rem;
`;

const Error = styled.div`
    color: red;
`;

export { Card, BigCard, Form, Input, Button, Logo, Error }