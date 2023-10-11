import React, { useEffect, useRef, useState } from "react";
import "./../style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getLanguages,
  translateText,
} from "./../store/actions/translateActions";
import Select from "react-select";
import { clearAnswer } from "../store/slices/translateSlice";
import axios from "axios";
import { speechoptions } from "../constants";

const MainPage = () => {
  const state = useSelector((store) => store.translateSlice);
  // console.log(state);
  const sourceRef = useRef();
  const dispatch = useDispatch();

  // seçilen dillerin verilerini state'de tutma
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  const [text, setText] = useState("");

  // dillerin verisini çeker
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  // state'lerin değerlerini değiştirir
  const handleChange = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    // text alanlarını temizle
    setText("");
    dispatch(clearAnswer());
  };

  const handleClick = async () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
    const res = await axios.get(
      `https://text-to-speech27.p.rapidapi.com/speech?text=${text}&lang=${sourceLang.value}`,
      speechoptions
    );
  };
  return (
    <div id="main-page">
      <div className="container">
        <h1>Çeviri +</h1>
        {/* üst kısım */}
        <div className="upper">
          <Select
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            onChange={setSourceLang}
            className="react-select"
            value={sourceLang}
            options={state.languages}
          />
          <button onClick={handleChange}>Değiş</button>
          <Select
            isDisabled={state.isLoading}
            isLoading={state.isLoading}
            value={targetLang}
            onChange={setTargetLang}
            className="react-select"
            options={state.languages}
          />
        </div>
        {/* alt kısım */}
        <div className="bottom">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <textarea disabled value={state.answer}></textarea>
        </div>
        <button onClick={handleClick} id="translate">
          Çevir
        </button>
      </div>
    </div>
  );
};

export default MainPage;
