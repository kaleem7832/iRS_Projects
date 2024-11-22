"use client";

import { useState } from "react";

export default function AddClient() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setOk(true);
      setMsg("Please provide Client name");
      setTimeout(() => {
        setOk(false);
        setMsg("");
      }, 3000);
      return;
    }

    try {
      const resUserExists = await fetch("../api/clientExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setOk(true);
        setMsg("This client is already present, please check");
        setTimeout(() => {
          setOk(false);
          setMsg("");
        }, 3000);
        return;
      }

      const res = await fetch("../api/addClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        setOk(true);
        setMsg("Please added successfuly");
        setTimeout(() => {
          setOk(false);
          setMsg("");
        }, 3000);
      } else {
        console.log("Adding client failed.");
      }
    } catch (error) {
      console.log("Error during adding client: ", error);
    }
  };

  return (
    <div className=" flex justify-center items-center">
      <div className="toast">
        <div
          role="alert"
          className={ok ? "alert bg-neutral text-white mx-auto" : "hidden"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{msg}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="">
        <div className="flex  gap-3 mx-auto mt-5 justify-center">
          <div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Client name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="input input-bordered input-sm w-80"
              />
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label>&nbsp;</label>
              <button type="submit" className="btn btn-neutral btn-sm w-80">
                Add Client
              </button>
            </div>
            <div>{error}</div>
          </div>
        </div>
      </form>
    </div>
  );
}
