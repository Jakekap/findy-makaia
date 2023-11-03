import React, { useEffect } from "react";

const HomeFeed = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    getData()
  }, [isInteracting]);

    const getData = async () => {

    }
    return(
    <main>
        
    </main>
  )
};

export default HomeFeed;
