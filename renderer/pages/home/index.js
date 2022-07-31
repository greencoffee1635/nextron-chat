import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Box, Drawer, Toolbar } from "@mui/material";
// import Header from "../../common/components/Header";
// import RoomMenu from "../../common/components/RoomMenu";
// import Chat from "../../common/components/Chat";
import Router from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../../common/redux/modules/user";
import "../../common/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CircularProgress, Stack } from "@mui/material";
import Link from "next/link";
import Header from "../../common/components/Header";
import RoomMenu from "../../common/components/RoomMenu";
import Chat from "../../common/components/Chat";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (!!user) {
        // 유저 로그인
        dispatch(setUser(user));
      } else {
        // 유저 정보가 없으면 로그아웃
        dispatch(clearUser());
        Router.push("/login");
      }
    });
    // onAuthStateChanged가 계속 쌓이지 않도록 unsubscribe를 해준다.
    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    return (
      <Stack alignItems='center' justifyContent='center' height='100vh'>
        <CircularProgress color='primary' size={70} />
      </Stack>
    );
  }
  return (
    <>
      {/* <Box sx={{ display: "flex", backgroundColor: "red" }}> */}
      {/* <Typography>
          <Link href='/login'>Go to the login page</Link>
        </Typography> */}
      {/* <Box sx={{ display: "flex", backgroundColor: "white" }}> */}
      <Header />
      {/* <Drawer variant='permanent' sx={{ width: 300 }} className='no-scroll'> */}
      {/* <Toolbar /> */}
      {/* <Box sx={{ display: "flex", minHeight: "calc( 100vh - 64px )" }}> */}
      <RoomMenu />
      {/* </Box> */}
      {/* </Drawer> */}
      {/* <Box component='main' sx={{ flexGrow: 1, p: 3 }}> */}
      <Chat />
      {/* </Box>
        </Box>
      </Box> */}
    </>
  );
};

export default Home;

// <Box sx={{ display: "flex", backgroundColor: "white" }}>
// <Header />
// <Drawer variant='permanent' sx={{ width: 300 }} className='no-scroll'>
//   <Toolbar />
//   <Box sx={{ display: "flex", minHeight: "calc( 100vh - 64px )" }}>
//     <RoomMenu />
//   </Box>
// </Drawer>
// <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
//   <Chat />
// </Box>
// </Box>
