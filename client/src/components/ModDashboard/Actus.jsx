import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActuByID } from "../../actions/actus";
import { isEmpty } from "../utils/index";
import { NavLink } from "react-router-dom";

import { createActu, updateActu, deleteActu } from "../../actions/actus";

const Actus = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const actus = useSelector((state) => state.actus?.data);

  !isEmpty(actus) &&
    actus.sort((a, b) => {
      return b.createdAt.localeCompare(a.createdAt);
    });

  useEffect(() => {
    dispatch(getActuByID(user._paroisse));
  }, [dispatch]);

  // Données Formulaire
  const [formData, setFormData] = useState({
    poster: "",
    title: "",
    description: "",
    address: "",
  });

  // Afficher / Cacher le formulaire
  const [toggleForm, setToggleForm] = useState(false);

  // Fichiers données
  const [files, setFiles] = useState([]);
  const [fileSet, setFileSet] = useState([]);

  const [isOk, setIsOk] = useState(false);

  const [isSetForm, setIsSetForm] = useState(false);

  // Mode édition
  const [isEdit, setIsEdit] = useState(false);
  const [actuEdit, setActuEdit] = useState({});

  const editActu = (idx) => {
    setIsEdit(true);
    const actuFound = actus.filter((e) => e._id === idx)[0];
    setActuEdit(actuFound);
    setToggleForm(true);

    setFormData({
      poster: actuFound.poster,
      title: actuFound.title,
      description: actuFound.description,
      address: actuFound.address,
    });
    files.length = 0;
    files.push(actuFound.poster);
  };

  const deleteActuAction = async (idx) => {
    const actuFound = actus.filter((e) => e._id === idx)[0];
    const id = actuFound._id;

    var answer = window.confirm("Are you sure you want to delete this item?");
    if (answer) {
      await dispatch(deleteActu(id))
        .then(() => {
          dispatch(getActuByID(user._paroisse));
        })
        .catch(() => {});
    }
  };

  const submitForm = async (e) => {
    setIsOk(true);
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("address", formData.address);
    data.append("poster", formData.poster);
    data.append("_paroisseId", user._paroisse);

    isEdit
      ? await dispatch(updateActu(actuEdit._id, data))
          .then(() => {
            setIsOk(false);
            dispatch(getActuByID(user._paroisse));

            cancelForm();
            setToggleForm(!toggleForm);
            return true;
          })
          .catch((error) => {})
      : await dispatch(createActu(data))
          .then(() => {
            setIsOk(false);
            dispatch(getActuByID(user._paroisse));

            cancelForm();
            setToggleForm(!toggleForm);
            return true;
          })
          .catch((error) => {});
  };

  const fileSelectedHandler = (e) => {
    const filesParsed = URL.createObjectURL(e.target.files[0]);
    const filesSelected = e.target.files[0];

    setFiles([...files, filesParsed]);
    setFileSet([...fileSet, filesSelected]);
    setFormData({ ...formData, poster: filesSelected });
  };

  const removeBlock = (idx) => {
    let arr = [...fileSet];
    let newArr = [...files];
    arr.splice(idx, 1);
    newArr.splice(idx, 1);

    setFileSet(arr);
    setFiles(newArr);
    setFormData({ ...formData, poster: arr });
  };

  const renderFiles = () => {
    return files.map((e, idx) => {
      return (
        <div className="picture-block" key={idx}>
          <img src={e} alt={idx} />
          <div className="close-btn" onClick={() => removeBlock(idx)}>
            Supprimer
          </div>
        </div>
      );
    });
  };

  const cancelForm = () => {
    setFormData({
      poster: "",
      title: "",
      description: "",
      address: "",
    });
    setFiles([]);
    setToggleForm(false);
  };

  return (
    <>
      {toggleForm && (
        // Form elements
        <div className="form-container">
          <div className="form-group-container">
            <div className="container-header">
              <h1>Fiche Actualité</h1>

              <div
                className="form-closer"
                onClick={() => setToggleForm(!toggleForm)}
              >
                Fermer
              </div>
            </div>

            <div className="form-elements-container">
              <form onSubmit={(e) => submitForm(e)}>
                <div className="form-group">
                  <label htmlFor="title">Titre</label>
                  <input
                    htmlFor="title"
                    placeholder="Titre"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="form-group-group">
                  <div className="form-group">
                    <label htmlFor="address">Lieu</label>
                    <input
                      htmlFor="address"
                      placeholder="Lieu"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    htmlFor="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                {/** Picture */}
                <div className="pictures">
                  <div className="pictures-title">
                    <h3>Image</h3>
                  </div>
                  <div className="pictures-content">
                    <div className="pictures-blocks-container">
                      {!isEmpty(files) && <>{renderFiles()}</>}

                      {files.length < 1 && (
                        <div className="file-upload">
                          <input
                            type="file"
                            name="file"
                            onChange={(e) => fileSelectedHandler(e)}
                            accept=".jpg, .jpeg, .png"
                          />
                          <i className="fa fa-arrow-up"></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="btn-group">
                  <input type="submit" value="Save" />
                  {isOk === true && <i className="fa fa-spinner fa-spin"></i>}

                  <input
                    type="reset"
                    value="Annuler"
                    onClick={() => cancelForm()}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="actus-board-container">
        <div className="header">
          <h1>Actualités</h1>
        </div>

        <div className="actus-container">
          <div className="premium-actus">
            <div
              className="event-add-element"
              onClick={() => {
                setToggleForm(!toggleForm);
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/imgs/icons/add.png"}
                alt={"add"}
              />
            </div>
            {!isEmpty(actus) &&
              actus.map((element, i) => (
                <div className="event-element" key={i}>
                  <div className="event-infos">
                    <div className="event-infos-image">
                      {element?.poster ? (
                        <img
                          src={process.env.PUBLIC_URL + element.poster}
                          alt={element.name}
                        />
                      ) : (
                        <img
                          src={process.env.PUBLIC_URL + "/imgs/icon.png"}
                          alt={element.name}
                        />
                      )}{" "}
                    </div>
                    <div className="event-infos-name">
                      <h4>{element.title}</h4>
                      <h6>{element.organizer}</h6>
                      <h6>{element.address}</h6>
                    </div>
                  </div>
                  <div className="event-element-footer">
                    <NavLink
                      to={`/actu/${element._id}`}
                      className="footer-view"
                      target="_blank"
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/imgs/icons/eye.png"}
                        alt={"eye"}
                      />
                    </NavLink>{" "}
                    <div
                      className="footer-edit"
                      onClick={() => editActu(element._id)}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/imgs/icons/edit.png"}
                        alt={"edit"}
                      />
                    </div>
                    <div
                      className="footer-delete"
                      onClick={() => deleteActuAction(element._id)}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/imgs/icons/trash.png"}
                        alt={"delete"}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Actus;
