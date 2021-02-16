import React, { useEffect, useState } from "react";
import Axios, { AxiosResponse } from "axios";

function Posts() {
  const [memo, setMemo] = useState<string>("");
  const [data, setData] = useState([]);

  const url = "http://localhost:3001";

  const submit = () => {
    Axios.post(url + "/post", {
      memo,
    }).then((res: AxiosResponse) => {
      if (res.data === "ok") {
        alert("Successfully Posted!");
        window.location.reload();
      } else {
        alert("Error Occured");
      }
    });
  };

  const deletePost = (id: string) => {
    Axios.delete(url + `/delete/${id}`).then((res) => {
      if (res.data === "ok") {
        alert("Successfully Deleted!");
        setData(data.filter((val: any) => val.id !== id));
      } else {
        alert("Error Occured");
      }
    });
  };

  useEffect(() => {
    Axios.get(url + "/post").then((res: AxiosResponse) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center m-2">
        <input
          type="text"
          placeholder="Write memo"
          className="border-2 border-black mx-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMemo(e.target.value)
          }
        />
        <button className="border-2 border-black mx-2 px-2" onClick={submit}>
          Submit
        </button>
      </div>
      <div>
        {data
          ? data.map((e: any) => {
              return (
                <div
                  key={e.id}
                  className="flex flex-row justify-between items-center"
                >
                  <h3 className="mx-2">{e.memo}</h3>
                  <button
                    className="mx-2 text-red-500"
                    onClick={() => {
                      deletePost(e.id);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Posts;
