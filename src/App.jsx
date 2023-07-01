import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";

function App() {
  const { data, loading } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page]);

  const handlePage = (index) => setPage(index);

  const handleNext = () => setPage((prevPage) => (prevPage + 1) % data.length);

  const handlePrev = () =>
    setPage((prevPage) => (prevPage - 1 + data.length) % data.length);

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "Loading..." : "Pagination"}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {followers.map((follower) => (
            <Follower key={follower.id} {...follower} />
          ))}
        </div>
        {!loading && (
          <div className="btn-container">
            <button className="prev-btn" onClick={handlePrev}>
              prev
            </button>

            {data.map((el, i) => (
              <button
                className={`page-btn ${i === page ? "active-btn" : null}`}
                key={i}
                onClick={() => handlePage(i)}
              >
                {i + 1}
              </button>
            ))}

            <button className="next-btn" onClick={handleNext}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
