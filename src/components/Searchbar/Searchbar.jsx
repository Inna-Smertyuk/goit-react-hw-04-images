import { useState } from "react";
import s from "./Searchbar.module.css";

function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const imageChange = ({ target }) => {
    setInputValue(target.value.toLowerCase());
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={onSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          onChange={imageChange}
          value={inputValue}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;
