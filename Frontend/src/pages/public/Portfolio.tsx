import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/api";

function Portfolio() {
  const { username } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await API.get(`/portfolio/${username}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPortfolio();
  }, [username]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.bio}</p>
    </div>
  );
}

export default Portfolio;