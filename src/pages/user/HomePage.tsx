import { useParams } from "react-router";

const HomePage = () => {
  const params = useParams()
  return (
    <div>
        Home Page: { params.userId }
    </div>
  );
}

export default HomePage;
