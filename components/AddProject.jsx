"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddNew() {
  function formated(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const [received, setReceived] = useState("");
  const [client, setClient] = useState("");
  const [clients, setClients] = useState([]);
  const [title, setTitle] = useState("");
  const [confirmit, setConfirmit] = useState("");
  const [programmer1, setProgrammer1] = useState("");
  const [programmer2, setProgrammer2] = useState("");
  const [tester, setTester] = useState("");
  const [scriptqc, setScriptqc] = useState("");
  const [status, setStatus] = useState("");
  const [manager, setManger] = useState("");
  const [launch, setLaunch] = useState("");
  const [size, setSize] = useState(0);
  const [delivery, setDelivery] = useState("");
  const [methodology, setMethodology] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("../api/client");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setClients(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!received || !client || !title) {
      console.log("all fields are required");
      return;
    }
    if (!/^p\d{12}$/.test(confirmit)) {
      setOk(true);
      setMsg("Please provide the valid confirmit id");
      setTimeout(() => {
        setOk(false);
        setMsg("");
      }, 3000);
      return;
    }
    try {
      const resUserExists = await fetch("../api/projectExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmit }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setOk(true);
        setMsg("ConfirmIT ID already Present, please check.");
        setTimeout(() => {
          setOk(false);
          setMsg("");
        }, 3000);
        return;
      }

      const res = await fetch("../api/addProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          received,
          client,
          title,
          programmer1,
          programmer2,
          tester,
          scriptqc,
          manager,
          launch,
          delivery,
          size,
          methodology,
          confirmit,
          status,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        setError("");
        setOk(true);
        setMsg("Project added successfully!");
        setTimeout(() => {
          setOk(false);
          setMsg("");
          router.push("/");
        }, 3000);
      } else {
        console.log("Adding project failed.");
      }
    } catch (error) {
      console.log("Error during adding: ", error);
    }
  };

  return (
    <div>
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
          <div className="w-80">
            <div className="flex flex-col gap-1 mb-2">
              <label>Client</label>
              <select
                onChange={(e) => setClient(e.target.value)}
                className="select select-sm select-bordered w-full max-w-xs"
              >
                <option>Please select client</option>
                {clients.map((c) => {
                  return (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Project title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Methodolofy</label>
              <select
                onChange={(e) => setMethodology(e.target.value)}
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option>Please select one</option>
                <option value="Online">Online</option>
                <option value="CATI">CATI</option>
                <option value="Online & CATI">Online & CATI</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label>ConfirmIT ID</label>
              <input
                onChange={(e) => setConfirmit(e.target.value)}
                type="text"
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Recieved date</label>
              <input
                onChange={(e) => setReceived(formated(e.target.value))}
                type="date"
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Primary programmer</label>
              <select
                onChange={(e) => setProgrammer1(e.target.value)}
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option>Please select one</option>
                <option value="Kaleem">Kaleem</option>
                <option value="Karishma">Karishma</option>
                <option value="Ketan">Ketan</option>
                <option value="Janhavi">Janhavi</option>
                <option value="Bhakti">Bhakti</option>
                <option value="Priti">Priti</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label>Secondary programmer</label>
              <select
                onChange={(e) => setProgrammer2(e.target.value)}
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option>Please select one</option>
                <option value="Kaleem">Kaleem</option>
                <option value="Karishma">Karishma</option>
                <option value="Ketan">Ketan</option>
                <option value="Janhavi">Janhavi</option>
                <option value="Bhakti">Bhakti</option>
                <option value="Priti">Priti</option>
              </select>
            </div>
          </div>

          <div className=" w-80">
            <div className="flex flex-col gap-1 mb-2">
              <label>Delivery date</label>
              <input
                onChange={(e) => setDelivery(formated(e.target.value))}
                type="date"
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Tested by</label>
              <select
                onChange={(e) => setTester(e.target.value)}
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option>Please select one</option>
                <option value="Samiksha">Samiksha</option>
                <option value="Adil">Adil</option>
                <option value="Kaleem">Kaleem</option>
                <option value="Karishma">Karishma</option>
                <option value="Ketan">Ketan</option>
                <option value="Janhavi">Janhavi</option>
                <option value="Bhakti">Bhakti</option>
                <option value="Priti">Priti</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Script QC</label>
              <select
                onChange={(e) => setScriptqc(e.target.value)}
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option>Please select one</option>
                <option value="Kaleem">Kaleem</option>
                <option value="Karishma">Karishma</option>
                <option value="Ketan">Ketan</option>
                <option value="Janhavi">Janhavi</option>
                <option value="Bhakti">Bhakti</option>
                <option value="Priti">Priti</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Launch date</label>
              <input
                onChange={(e) => setLaunch(formated(e.target.value))}
                type="date"
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Manager</label>
              <input
                onChange={(e) => setManger(e.target.value)}
                type="text"
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Sample size</label>
              <input
                onChange={(e) => setSize(e.target.value)}
                type="number"
                min={0}
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Status</label>
              <select
                onChange={(e) => setStatus(e.target.value)}
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option>Please select one</option>
                <option value="Programming">Programming</option>
                <option value="Delivered">Delivered</option>
                <option value="Changes">Changes</option>
                <option value="Live">Live</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-1 mb-2 mt-5">
            <button type="submit" className=" btn btn-neutral btn-sm w-80">
              Add Project
            </button>
          </div>
        </div>
      </form>
      {error}
    </div>
  );
}
