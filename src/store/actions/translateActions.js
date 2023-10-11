import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "./../../constants/index";

// API'dan dil verilerini alır
export const getLanguages = createAsyncThunk("getLanguages", async () => {
  //   API isteği
  const res = await axios.request(options);
  console.log(res);
  const data = res.data.data.languages;

  /*
    * diziyi map ile dönüp,
    * herbir objesi için 
    * value ve label değerlerine sahip yeni bir obje oluşturacağız.

*/
  const refinedData = data.map((item) => ({
    value: item.code,
    label: item.name,
  }));
  console.log("işlenmiş data", refinedData);

  // store'a gönderilecek veri
  return refinedData;
});

// Çeviri işlemini yapar
export const translateText = createAsyncThunk("traslate", async (params) => {
  console.log(params);
  // api isteği için gerekli ayarlar
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", params.sourceLang.value);
  encodedParams.set("target_language", params.targetLang.value);
  encodedParams.set("text", params.text);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "96d9e60a6dmsh9ce78bff526da57p1e8278jsnbd3aeda2ad09",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };

  // api isteği atar
  const res = await axios.request(options);

  // store'a aktar
  return res.data.data.translatedText;
});
