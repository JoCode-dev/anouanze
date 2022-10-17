import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParoisse, updateParoisse } from "../../actions/paroisse";
import { isEmpty } from "../utils/index";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const ParoisseBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const paroisse = useSelector((state) => state.paroisse);

  // Jours - Heures / Messes & Confessions
  const [days, setDays] = useState([
    {
      id: 1,
      dayName: "Lundi",
      dayHour: [],
    },
    {
      id: 2,
      dayName: "Mardi",
      dayHour: [],
    },
    {
      id: 3,
      dayName: "Mercredi",
      dayHour: [],
    },
    {
      id: 4,
      dayName: "Jeudi",
      dayHour: [],
    },
    {
      id: 5,
      dayName: "Vendredi",
      dayHour: [],
    },
    {
      id: 6,
      dayName: "Samedi",
      dayHour: [],
    },
    {
      id: 7,
      dayName: "Dimanche",
      dayHour: [],
    },
  ]);
  const [daysConf, setDaysConf] = useState([
    {
      id: 1,
      dayName: "Lundi",
      dayHour: [],
    },
    {
      id: 2,
      dayName: "Mardi",
      dayHour: [],
    },
    {
      id: 3,
      dayName: "Mercredi",
      dayHour: [],
    },
    {
      id: 4,
      dayName: "Jeudi",
      dayHour: [],
    },
    {
      id: 5,
      dayName: "Vendredi",
      dayHour: [],
    },
    {
      id: 6,
      dayName: "Samedi",
      dayHour: [],
    },
    {
      id: 7,
      dayName: "Dimanche",
      dayHour: [],
    },
  ]);

  // Fichiers données
  const [files, setFiles] = useState([]);
  const [fileSet, setFileSet] = useState([]);

  // Avant / Après validation
  const [isOk, setIsOk] = useState(false);

  // Données paroisse - édition
  const [paroisseEdit, setParoisseEdit] = useState({});

  // Mode édition
  const [isEdit, setIsEdit] = useState(true);
  const [arrFinal, setArrFinal] = useState([]);
  const [arrConfFinal, setArrConfFinal] = useState([]);

  // Données formulaire
  const [formData, setFormData] = useState({
    name: "",
    province: "",
    diocese: "",
    address: "",
    contact: "",
    email: "",
    history: "",
    pictures: [],
    location: {
      type: "Point",
      coordinates: [null, null],
    },
    messes: [],
    confessions: [],
  });

  const fileSelectedHandler = (e) => {
    const filesParsed = URL.createObjectURL(e.target.files[0]);
    const filesSelected = e.target.files[0];

    setFiles([...files, filesParsed]);
    setFileSet([...fileSet, filesSelected]);
    setFormData({ ...formData, pictures: [...fileSet, filesSelected] });
  };

  const removeBlock = (idx) => {
    let arr = [...fileSet];
    let newArr = [...files];
    arr.splice(idx, 1);
    newArr.splice(idx, 1);

    setFileSet(arr);
    setFiles(newArr);
    setFormData({ ...formData, pictures: arr });
  };

  const renderFiles = () => {
    return files.map((e, idx) => {
      return (
        <div className="picture-block" key={idx}>
          <img src={e} alt={idx} />
          <div className="close-btn" onClick={() => removeBlock(idx)}>
            Close
          </div>
        </div>
      );
    });
  };

  const dayOptions = [
    { id: 1, value: "05:00", label: "05:00" },
    { id: 2, value: "05:30", label: "05:30" },
    { id: 3, value: "06:00", label: "06:00" },
    { id: 4, value: "06:30", label: "06:30" },
    { id: 5, value: "07:00", label: "07:00" },
    { id: 6, value: "07:30", label: "07:30" },
    { id: 7, value: "08:00", label: "08:00" },
    { id: 8, value: "08:30", label: "08:30" },
    { id: 9, value: "09:00", label: "09:00" },
    { id: 10, value: "09:30", label: "09:30" },
    { id: 11, value: "10:00", label: "10:00" },
    { id: 12, value: "10:30", label: "10:30" },
    { id: 13, value: "11:00", label: "11:00" },
    { id: 14, value: "11:30", label: "11:30" },
    { id: 15, value: "12:00", label: "12:00" },
    { id: 16, value: "12:30", label: "12:30" },
    { id: 17, value: "13:00", label: "13:00" },
    { id: 18, value: "13:30", label: "13:30" },
    { id: 19, value: "14:00", label: "14:00" },
    { id: 20, value: "14:30", label: "14:30" },
    { id: 21, value: "15:00", label: "15:00" },
    { id: 22, value: "15:30", label: "15:30" },
    { id: 23, value: "16:00", label: "16:00" },
    { id: 24, value: "16:30", label: "16:30" },
    { id: 25, value: "17:00", label: "17:00" },
    { id: 26, value: "17:30", label: "17:30" },
    { id: 27, value: "18:00", label: "18:00" },
    { id: 28, value: "18:30", label: "18:30" },
    { id: 29, value: "19:00", label: "19:00" },
    { id: 30, value: "19:30", label: "19:30" },
    { id: 31, value: "20:00", label: "20:00" },
    { id: 32, value: "20:30", label: "20:30" },
    { id: 33, value: "21:00", label: "21:00" },
    { id: 34, value: "21:30", label: "21:30" },
    { id: 35, value: "22:00", label: "22:00" },
    { id: 36, value: "22:30", label: "22:30" },
    { id: 37, value: "23:00", label: "23:00" },
    { id: 38, value: "23:30", label: "23:30" },
  ];

  function handleSelectMesses(data, idx) {
    let transit = [];
    data.map((e) => {
      transit.push(e.value);
    });

    if (idx === 1) {
      days[0].dayHour = transit;
    }

    if (idx === 2) {
      days[1].dayHour = transit;
    }
    if (idx === 3) {
      days[2].dayHour = transit;
    }
    if (idx === 4) {
      days[3].dayHour = transit;
    }
    if (idx === 5) {
      days[4].dayHour = transit;
    }
    if (idx === 6) {
      days[5].dayHour = transit;
    }
    if (idx === 7) {
      days[6].dayHour = transit;
    }
    setFormData({
      ...formData,
      messes: days,
    });
  }

  function handleSelectConfessions(data, idx) {
    let transit = [];
    data.map((e) => {
      transit.push(e.value);
    });

    if (idx === 1) {
      daysConf[0].dayHour = transit;
    }

    if (idx === 2) {
      daysConf[1].dayHour = transit;
    }
    if (idx === 3) {
      daysConf[2].dayHour = transit;
    }
    if (idx === 4) {
      daysConf[3].dayHour = transit;
    }
    if (idx === 5) {
      daysConf[4].dayHour = transit;
    }
    if (idx === 6) {
      daysConf[5].dayHour = transit;
    }
    if (idx === 7) {
      daysConf[6].dayHour = transit;
    }
    setFormData({
      ...formData,
      confessions: daysConf,
    });
  }

  const convertArray = (arr) => {
    const result = [];
    arr.forEach((el, idx) => {
      const a = {
        id: idx + 1,
        value: el,
        label: el,
      };
      result.push(a);
    });
    return result;
  };

  const editParoisse = async () => {
    await dispatch(getParoisse(user._paroisse)).then(() => {
      setFormData({
        name: paroisse.name,
        province: paroisse.province,
        diocese: paroisse.diocese,
        address: paroisse.address,
        contact: paroisse.contact,
        email: paroisse.email,
        history: paroisse.history,
        pictures: paroisse.pictures,
        location: {
          lat: paroisse.location?.coordinates[0],
          lng: paroisse.location?.coordinates[1],
        },
        messes: paroisse.messes,
        confessions: paroisse.confessions,
      });

      setFiles(paroisse.pictures);

      if (!isEmpty(paroisse.messes)) {
        setDays(paroisse.messes);

        let arrIntermediate = [];
        let arrConfIntermediate = [];

        paroisse?.messes.forEach((messe) => {
          const a = messe?.dayHour;
          arrIntermediate.push(a);
        });

        paroisse?.confessions.forEach((confession) => {
          const a = confession?.dayHour;
          arrConfIntermediate.push(a);
        });

        setArrFinal([]);
        setArrConfFinal([]);
        setIsEdit(true);

        let newArr = [];
        let newArr2 = [];

        arrIntermediate.forEach((e) => {
          newArr.push(convertArray(e));
        });

        arrConfIntermediate.forEach((e) => {
          newArr2.push(convertArray(e));
        });

        setArrFinal(newArr);
        console.log(newArr);
        setArrConfFinal(newArr2);
      }
    });
  };

  useEffect(() => {
    editParoisse();
  }, []);


  const renderArrFinal = (arr, i) => {
    if (!isEmpty(arr)) {
      switch (arr[i].length) {
        case 1:
          return [arr[i][0]];

        case 2:
          return [arr[i][0], arr[i][1]];

        case 3:
          return [arr[i][0], arr[i][1], arr[i][2]];

        case 4:
          return [arr[i][0], arr[i][1], arr[i][2], arr[i][3]];

        case 5:
          return [arr[i][0], arr[i][1], arr[i][2], arr[i][3], arr[i][4]];

        default:
          break;
      }
    }
  };

  const submitForm = async (e) => {
    setIsOk(true);
    setFormData({
      ...formData,
      messes: days,
      confessions: daysConf,
    });
    e.preventDefault();

    if (formData.name) {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("province", formData.province);
      data.append("diocese", formData.diocese);
      data.append("location[type]", formData.location.type);
      data.append("location[coordinates]", formData.location.coordinates);

      formData.pictures.forEach((file) => {
        data.append("pictures[]", file);
      });
      data.append("address", formData.address);
      data.append("contact", formData.contact);
      data.append("email", formData.email);
      data.append("history", formData.history);
      data.append("messes", JSON.stringify(formData.messes));
      data.append("confessions", JSON.stringify(formData.confessions));

      await dispatch(updateParoisse(paroisseEdit._id, data))
        .then(() => {
          setIsOk(false);
          dispatch(getParoisse(user._paroisse));

          cancelForm();
          return true;
        })
        .catch((error) => {});
    } else {
      alert("Veuillez entrer le nom de la paroisse !");
    }
  };

  const cancelForm = () => {
    setIsOk(false);
    setFormData({
      ...formData,
      name: "",
      province: "",
      diocese: "",
      address: "",
      contact: "",
      email: "",
      history: "",
      pictures: [],
      location: {
        lat: null,
        lng: null,
      },
      messes: [],
      confessions: [],
    });

    setFiles([]);
  };

  return (
    <div className="mod-paroisse-container">
      <h1>Ma Paroisse</h1>

      <div className="mod-paroisse-form">
        <form onSubmit={(e) => submitForm(e)}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              htmlFor="name"
              placeholder="Nom"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group-group">
            <div className="form-group">
              <label htmlFor="province">Province</label>
              <input
                htmlFor="province"
                placeholder="Province"
                value={formData.province}
                onChange={(e) =>
                  setFormData({ ...formData, province: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="diocese">Diocèse</label>
              <input
                htmlFor="diocese"
                placeholder="Diocèse"
                value={formData.diocese}
                onChange={(e) =>
                  setFormData({ ...formData, diocese: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group-group">
            <div className="form-group">
              <label htmlFor="address">Adresse</label>
              <input
                htmlFor="address"
                placeholder="Adresse"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                htmlFor="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                htmlFor="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />{" "}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="history">Histoire</label>
            <textarea
              htmlFor="history"
              placeholder="Histoire"
              value={formData.history}
              onChange={(e) =>
                setFormData({ ...formData, history: e.target.value })
              }
            />
          </div>

          {/** Programmes */}
          <div className="programmes">
            <div className="programmes-title">
              <h1>Programmes</h1>
            </div>

            <div className="programme">
              <div className="programme-title">
                <h3>Programme des messes</h3>
              </div>
              <div className="programme-content">
                {days.map((day, idx) => (
                  <div className="day-block">
                    <h3 className="day-title">{day.dayName}</h3>
                    <Select
                      className="select-element"
                      options={dayOptions}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      onChange={(e) => handleSelectMesses(e, day.id)}
                      defaultValue={isEdit && renderArrFinal(arrFinal, idx)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="programme">
              <div className="programme-title">
                <h3>Programme des Confessions</h3>
              </div>
              <div className="programme-content">
                {days.map((day, idx) => (
                  <div className="day-block">
                    <h3 className="day-title">{day.dayName}</h3>
                    <Select
                      className="select-element"
                      options={dayOptions}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      onChange={(e) => handleSelectConfessions(e, day.id)}
                      defaultValue={isEdit && renderArrFinal(arrConfFinal, idx)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/** Pictures */}
          <div className="pictures">
            <div className="pictures-title">
              <h3>Pictures</h3>
            </div>
            <div className="pictures-content">
              <div className="pictures-blocks-container">
                {!isEmpty(files) && <>{renderFiles()}</>}

                <div className="file-upload">
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => fileSelectedHandler(e)}
                    accept=".jpg, .jpeg, .png"
                  />
                  <i className="fa fa-arrow-up"></i>
                </div>
              </div>
            </div>
          </div>
          {/** Clergy */}

          <div className="btn-group">
            <input type="submit" value="Save" />
            {isOk === true && <i className="fa fa-spinner fa-spin"></i>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParoisseBoard;
