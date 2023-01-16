import React,  {useEffect} from "react";

import Spinner from "./Spinner/Spinner"

import { useNavigate } from "react-router";


const ChatHelper = () => {
const navigate = useNavigate()

  useEffect(()=> {
    setTimeout(()=> {
      navigate("/app/chat")
    }, 500)
  }, [])

  return <Spinner/>
}

export default ChatHelper;