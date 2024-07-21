import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const showRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordsArray, setPasswordsArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordsArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied To Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const savePassword = () => {
    if (
      form.site.length !== 0 ||
      form.username.length !== 0 ||
      form.password.length !== 0
    ) {
      toast("Password Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setPasswordsArray([...passwordsArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }])
      );
    } else {
      toast("Password Not Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    console.log([...passwordsArray, { ...form, id: uuidv4() }]);
  };

  const deletePassword = (id) => {
    toast("Password Deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.log("deleting", id);

    let c = confirm("Do you really want to delete");
    if (c) {
      setPasswordsArray(passwordsArray.filter((item) => item.id !== id));
      // setPasswordsArray([...passwordsArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordsArray.filter((item) => item.id !== id))
      );
    }

    // console.log([...passwordsArray, { ...form, id: uuidv4() }]);
  };

  const editPassword = (id) => {
    console.log("editing", id);
    setForm(passwordsArray.filter((i) => i.id === id)[0]);
    setPasswordsArray(passwordsArray.filter((item) => item.id !== id));
    // setPasswordsArray([...passwordsArray, { ...form, id: uuidv4() }]);
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }])
    // );
    // console.log([...passwordsArray, { ...form, id: uuidv4() }]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const showPassword = () => {
    ref.current.src.includes("icons/hide.png")
      ? ((ref.current.src = "icons/show.png"), (showRef.current.type = "text"))
      : ((ref.current.src = "icons/hide.png"),
        (showRef.current.type = "password"));
  };
  return (
    <div className="flex justify-center w-full">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="flex-row w-full md:w-[70%] m-12 items-center justify-center text-center">
        <div className="font-bold text-2xl">
          <span className="text-blue-600">&lt;</span>
          <span className="text-blue-600">Pass</span>
          <span className="text-white">Man</span>
          <span className="text-blue-600">/&gt;</span>
        </div>
        <div className="text-white">Password Manager</div>
        <div className="flex flex-col w-full items-center ">
          <div className="py-4 w-full">
            <input
              type="text"
              value={form.site}
              onChange={handleChange}
              placeholder="Enter Website URL"
              name="site"
              id="site"
              className="w-full border border-blue-600 rounded-full px-3 py-1"
            />
          </div>
          <div className="flex flex-col md:flex-row w-full gap-4">
            <input
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              name="username"
              id="username"
              className="md:w-1/2 w-full border border-blue-600 rounded-full px-3 py-1"
            />
            <div className="relative md:w-1/2 w-full">
              <input
                type="password"
                ref={showRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                name="password"
                id="password"
                className="w-full border border-blue-600 rounded-full px-3 py-1"
              />
              <span
                className="absolute right-[12px] top-[6px] w-5 hover:cursor-pointer"
                onClick={() => showPassword()}
              >
                <img
                  ref={ref}
                  src="icons/hide.png"
                  alt="hide"
                  className="w-6"
                />
              </span>
            </div>
          </div>
          <div>
            <button
              onClick={savePassword}
              className="flex bg-violet-100 hover:bg-violet-200 my-3 rounded-full px-2 py-1 border border-violet-700 items-center text-center"
            >
              <lord-icon
                src="https://cdn.lordicon.com/zrkkrrpl.json"
                trigger="hover"
              ></lord-icon>
              <span>Add Data</span>
            </button>
          </div>
        </div>
        <div className="font-bold text-xl py-2 text-white">Passwords</div>
        {passwordsArray.length === 0 && (
          <div className="text-white">No Passwords to show</div>
        )}
        {passwordsArray.length !== 0 && (
          <table className="table-fixed text-white w-full rounded-xl overflow-hidden">
            <thead className="bg-blue-600 min-w-20">
              <tr>
                <th className="py-1 w-2/5 px-2">WebSite URL</th>
                <th className="py-1 w-1/5 px-2">Username</th>
                <th className="py-1 w-1/5 px-2">Password</th>
                <th className="py-1 w-1/5 px-2">Actions</th>
              </tr>
            </thead>
            <tbody className="rounded-2xl">
              {passwordsArray.map((item) => {
                return (
                  <tr>
                    <td className="py-1 border border-white text-start px-2">
                      <div className="flex items-center justify-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>

                        <div
                          className="cursor-pointer h-full flex items-center"
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-1 border border-white text-start px-2">
                      <div className="flex items-center justify-center">
                        <span>{item.username}</span>
                        <div
                          className="cursor-pointer h-full flex items-center"
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-1 border border-white text-start px-2">
                      <div className="flex items-center justify-center">
                        <span>{item.password}</span>
                        <div
                          className="cursor-pointer h-full flex items-center"
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-1 border border-white text-start px-2">
                      <div className="flex items-center justify-center gap-1">
                        <span onClick={() => editPassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </span>
                        <span onClick={() => deletePassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
