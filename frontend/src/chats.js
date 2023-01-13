import React ,{ useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Chats = (props) => {

  const isAuth = useSelector(s => s.chat.isLoaded)
  const [loaded, setLoaded] = useState(false)

  useEffect(()=> {
    setLoaded(isAuth)
  }, [isAuth])

  return(
    <div>
    {!loaded && <div> Loading...</div>}

    {loaded && props.children}

    </div>
  )
}

export default Chats;