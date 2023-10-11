/*
    ! creatAsyncThunk

    * Asenkron aksiyonlar oluşturmak için kullanılır. 
    * API istekleri atıp devamında süreç boyunca store'u bilgilendirir.
    * pending,fullfilled,rejected 
    ? Bizden iki parametre ister:
    todo>> aksiyonu type değeri
    todo>> çalışacak fonksiyon 
    >> genelde async işlemler yapar (veritabanı sorguları)


*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("getUser", async () => {
  // asenkron işlemler
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");

  //!  store'a aktarılmasını istediğimiz veriyi return ederiz. aksiyonun payloadı olur bu return ettiğimiz data
  return res.data;
});
