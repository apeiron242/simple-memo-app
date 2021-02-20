import React, { useEffect, useState, useRef } from "react";
import Axios, { AxiosResponse } from "axios";

type loginProps = {
  isLogin: boolean;
  userId: string;
  url: string;
};

interface postsData {
  id: string;
  memo: string;
  username: string;
}

function Posts({ isLogin, userId, url }: loginProps) {
  const [memo, setMemo] = useState<string>("");
  const [posts, setPosts] = useState<postsData[]>([]);

  const inputValue = useRef<any>(null);

  const submit = () => {
    if (isLogin) {
      Axios.post(url + "/post", {
        memo,
        userId,
      }).then((res: AxiosResponse): void => {
        if (res.data === "ok") {
          window.location.reload();
        } else {
          alert("Error Occured");
        }
      });
    } else {
      alert("You should login first");
    }
  };

  const deletePost = (id: string) => {
    Axios.delete(url + `/delete/${id}`).then((res: AxiosResponse): void => {
      if (res.data === "ok") {
        setPosts(posts.filter((val: any) => val.id !== id));
      } else {
        alert("Error Occured");
      }
    });
  };

  const deleteAll = (): void => {
    let result = window.confirm("Will you delete all your memo?");

    if (result) {
      Axios.delete(url + `/deleteall/${userId}`).then(
        (res: AxiosResponse): void => {
          if (res.data === "ok") {
            setPosts([]);
          } else {
            alert("Error Occured");
          }
        }
      );
    } else {
      console.log("err");
    }
  };

  useEffect(() => {
    inputValue.current.focus();

    Axios.get(url + `/post/${userId}`).then((res: AxiosResponse): void => {
      setPosts(res.data);
    });

    console.log("render");
  }, [isLogin, userId]);

  return (
    <div className="flex flex-col justify-center items-center m-2">
      <div className="flex flex-row justify-center items-center m-2">
        <input
          type="text"
          placeholder="Write memo"
          className="border-2 border-black mx-2 pl-1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMemo(e.target.value)
          }
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              submit();
            }
          }}
          ref={inputValue}
        />
        <button className="border-2 border-black mx-2 px-2" onClick={submit}>
          Submit
        </button>
      </div>
      {posts ? (
        <div className="border-2 border-black w-3/4 sm:w-2/5 m-2 p-3">
          {posts.length > 0 ? (
            <>
              <div className="flex justify-center items-center mb-2">
                <button
                  className="bg-red-400 px-2 py-1 text-gray-100"
                  onClick={deleteAll}
                >
                  Delete All
                </button>
              </div>
              {posts.map((e: any, index: number) => {
                return (
                  <div
                    key={e.id}
                    className="flex flex-row justify-start items-center break-all pb-1"
                  >
                    <h3 className="mx-2">
                      {index + 1}: {e.memo}
                    </h3>
                    <button
                      className="mx-1 text-red-500 self-start"
                      onClick={() => {
                        deletePost(e.id);
                      }}
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </>
          ) : (
            <div>
              <h1>No data</h1>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Posts;
