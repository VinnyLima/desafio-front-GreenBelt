import styled from 'styled-components'

export const SuperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 130px;
  width: 1422px;
  height: 884px;

  .containerIcon {
    position: relative;
    top: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 116px;
    height: 116px;
    background-color: #d9edfd;

    svg {
      color: #41abae;
    }
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 1024px;
  height: 400px;
  background-color: #fff;
  border-top: 6px solid #41abae;

  overflow-x: hidden;
  overflow-y: scroll;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 350px;
    height: 480px;
    background-color: #fff;
  }

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 450px;
    height: 580px;
    background-color: #fff;
  }

  section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    margin-left: 80px;

    h3 {
      ${props => props.theme.headings.heading3}
      line-height: 33px;
    }

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      outline: none;
      border-left: 1px solid #cdcdcd;
      padding-left: 5px;
      transition: 500ms;

      &:hover {
        color: red;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    padding-left: 80px;
    padding-right: 80px;

    .containerButon {
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: flex-end;
      margin-top: 20px;

      button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 150px;

        svg {
          font-size: 20px;
        }
      }
    }
  }
`
