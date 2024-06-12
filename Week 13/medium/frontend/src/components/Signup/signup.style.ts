import styled from "styled-components";

export const PageContainer = styled.div`
    width: 100%;
    padding: 5em 2rem; 
    display: flex;
    align-items: center;
    justify-content: center;    
`

export const Container = styled.div`
    border: 1px solid #D0D5DD;
    border-radius: 0.5rem;
    padding: 1.25rem; 
    max-width: 420px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    p {
        color: #64748B;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;

`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

`

export const Label = styled.label`
    display: block;
    font-size: 0.875rem;
`

export const InputField = styled.input`
    display: block;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #D0D5DD;
    &:focus{
        outline: none;
        border: 1px solid #64748B;
    };
    &::placeholder {
        color: #64748B
    }
`

export const Button = styled.button`
    display: block;
    width: 100%;
    padding: 0.75rem;
    background: #1D4ED8;
    border: none;
    border-radius: 0.25rem;
    color: #F7F8F9;
    cursor: pointer;
    font-weight: 500;
    font-size: 1rem;
    &:focus{
        outline: 2px solid #6183E4;
        outline-offset: 0.125rem;        
    }

    &:hover {
        background: #173EAD;
    }
`

export const SignUpBtn = styled.div`
    text-align: center;
    font-size: 0.875rem;
    color: #64748B;
`

export const Link = styled.a`
    color: #1D4ED8;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`