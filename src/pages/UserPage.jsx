import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/actions/userAction";

const UserPage = () => {
  const state = useSelector((store) => store.useSlice);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getUser());
    }, []);
    console.log(state);
  return (
    <div>

        {state.isLoading ? <p>Yükleniyor</p>: !state.isError && state.users.map((user)=><p>{user.name}</p>) }
    </div>
  );
};

export default UserPage;
