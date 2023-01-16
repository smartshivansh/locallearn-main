import React,  {useEffect} from "react";

import Spinner from "./Spinner/Spinner"

import { useNavigate } from "react-router";


const ChatHelper = () => {
const navigate = useNavigate()

  useEffect(()=> {
    setTimeout(()=> {
      navigate("/app/chat")
    }, 1500)
  }, [])

  return <h1>Loading....</h1>
}

export default ChatHelper;