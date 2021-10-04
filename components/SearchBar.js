import { css } from '@emotion/react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const searchWrapper = css`
  display: flex;
  align-items: center;
  height: 100px;
  padding: 0 20px;
`;

const searchContent = css`
  position: relative;
  max-width: 100%;
  width: 100%;
  height: 50px;
  background: white;
  margin: 0 auto;
  border-radius: 40px;
  color: black;
  border: 1px solid black;

  img {
    position: absolute;
    left: 15px;
    top: 14px;
    width: 30px;
  }

  input {
    font-size: 20px;
    position: absolute;
    left: 0;
    margin: 8px 0;
    padding: 0 0 0 60px;
    border: 0;
    width: 95%;
    background: transparent;
    height: 40px;
    color: black;

    :focus {
      outline: none;
    }
  }
`;

const faStyle = css`
  font-size: 40px;
  position: absolute;
  left: 10px;
  top: 5px;
`;

const SearchBar = () => {
  return (
    <div css={searchWrapper}>
      <div css={searchContent}>
        <FontAwesomeIcon css={faStyle} icon={faSearch} />
        <input placeholder="Search" />
      </div>
    </div>
  );
};

export default SearchBar;
