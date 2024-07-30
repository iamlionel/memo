import { useEffect, useRef, useState } from "react";
import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";
import { API_DATA_URL } from "../../global/constants";

const Home = () => {
  const [data, setData] = useState([]);
  const submittingStatus = useRef(false);

  async function fetchData(setData) {
    const res = await fetch(API_DATA_URL);
    const { data } = await res.json();
    setData(data);
  }

  async function putData(data) {
    await fetch(API_DATA_URL, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
  }

  useEffect(() => {
    if (!submittingStatus.current) {
      return;
    }
    putData(data).then((data) => (submittingStatus.current = false));
  }, [data]);

  useEffect(() => {
    fetchData(setData);
  }, []);

  return (
    <div className="app">
      <Edit add={setData} submittingStatus={submittingStatus} />
      <List
        list={data}
        deleteData={setData}
        submit={setData}
        submittingStatus={submittingStatus}
      />
    </div>
  );
};

export default Home;
