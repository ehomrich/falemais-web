import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 30px;
  color: #3a3a3a;
  line-height: 56px;
  margin: 10px 0;
  text-align: center;
`;

export const Block = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 20px 0;
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    flex: 1;
    text-align: center;
    margin: 0 16px;
    color: #6c6c80;

    & + p {
      margin-top: 16px;
    }
  }
`;

export const BlockTitle = styled.h3`
  font-size: 24px;
  color: #3a3a3a;
  line-height: 40px;
  margin-bottom: 10px;
  text-align: center;
`;

export const HR = styled.hr`
  border: 1px solid #a8a8b3;
  max-width: 300px;
  margin: auto;
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #c9c9d4;
    }
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  /* flex-direction: row; */
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    position: relative;
  }
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  margin: 10px 10px;

  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  align-items: center;

  transition: transform 0.2s;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

export const CardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #3a3a3a;
  padding-bottom: 10px;
  text-align: center;
`;

export const CardCallout = styled.div`
  font-size: 20px;
  color: #6c6c80;
`;

export const FormContainer = styled.div`
  max-width: 700px;
  text-align: center;
  display: flex;
`;

export const ErrorAlert = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 20px 0;
  background: #f8d7da;
  border-color: #f5c6cb;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    flex: 1;
    text-align: center;
    margin: 0 16px;
    color: #721c24;
  }

  span {
    margin-right: 10px;
  }
`;
