import React, { useContext, useEffect, useState } from "react";
import "./../private/DashboardPage.css";
import AuthContext from "./../../context/AuthContext";
import Accordion from "../../components/private/Accordion";
import { ButtonPrimary, ButtonSecondary } from "../../components/shared/button";
import RepositoryList, {
  RepositoriesResponse,
} from "../../components/private/RepositoryList";
import EnlaceList from "../../components/private/EnlaceList";
import EnlaceListByCategory from "../../components/private/EnlaceList";
import CreateRepo from "../../components/private/RepositoryCRUD";
import UpdateRepo from "../../components/private/UpdateRepo";
import UpdateRepoSelector from "../../components/private/UpdateRepo";
import DeleteRepoSelector from "../../components/private/DeleteRepoSelector";

export default function DashboardPage() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("DashboardPage debe estar dentro de un AuthProvider");
  }

  const { userLogged } = auth;

  const [repository, setRepository] = useState<RepositoriesResponse>({
    repositories: {},
  });

  const [selectedLinkName, setSelectedLinkName] = useState<string | null>(null);
  const [selectedRepoName, setSelectedRepoName] = useState<string | null>(null);
  const [selectedRepoDesc, setSelectedRepoDesc] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[] | null>(null);
  const [createRepoButton, setCreateRepoButton] = useState<boolean | null>(
    null
  );
  const [showUpdate, setShowUpdate] = useState<boolean | null>(null);
  const [showDelete, setShowDelete] = useState<boolean | null>(null);

  const handlerCreateRepo = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreateRepoButton(true);
  };
  const handlerEditRepo = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowUpdate(true);
  };
  const handlerDeleteRepo = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowDelete(true);
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <section className="dashboard__section">
        <div className="dashboard-sidebar-left__wrapper">
          {/* //todo hacer esta logica cuando haya datos_ */}
          {/* //todo Si no existen repos = aparece esta frase */}
          {/* <p>No existen repositorios...</p> */}

          <div className="dashboard-aside__box">
            {/* //todo scroll bar */}
            <h2>Repositorios</h2>
            {/* //todo aplicar useMemo al repo */}
            <RepositoryList
              repository={repository}
              setRepository={setRepository}
              setSelectedLinkName={setSelectedLinkName}
              setSelectedRepoName={setSelectedRepoName}
              setSelectedRepoDesc={setSelectedRepoDesc}
              setSelectedTags={setSelectedTags}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          </div>
          <div
            className="dashboard-sidebar-left__buttons"
            style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
          >
            <ButtonPrimary
              onClick={handlerCreateRepo}
              children={<span className="material-symbols-outlined">add</span>}
            />

            <ButtonPrimary
              onClick={handlerEditRepo}
              children={<span className="material-symbols-outlined">edit</span>}
            />
            <ButtonSecondary
              onClick={handlerDeleteRepo}
              children={
                <span className="material-symbols-outlined">delete</span>
              }
            />
          </div>
        </div>
        <div className="dashboard-center__wrapper">
          <h2>
            {selectedRepoName ? selectedRepoName : "Selecciona un repositorio"}
          </h2>
          <div className="dashboard-center__box">
            <EnlaceListByCategory category={selectedRepoName} />
          </div>

          <div className="dashboard-sidebar-left__box"></div>
        </div>
        <div className="dashboard-sidebar-right__wrapper">
          <div className="dashboard-aside__box">
            <h2>Detalles</h2>
            <div
              className="custom-scroll"
              style={{
                maxHeight: "44rem",
                overflowY: "auto",
              }}
            >
              <p>{selectedRepoDesc}</p>
              <ul className="tags__list" style={{ padding: 0 }}>
                {selectedTags?.map((tag, index) => (
                  <li
                    key={index}
                    style={{
                      color: "var(--text-white)",
                      display: "inline-block",
                      padding: ".2rem 1rem",
                      borderRadius: "2rem",
                      margin: " 0 .5rem .5rem 0",
                      listStyle: "none",
                      backgroundColor: "var(--text-green)",
                    }}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div className="dashboard-sidebar-left__box-buttons"></div> */}
        </div>
      </section>
      {createRepoButton == true && (
        <CreateRepo onCancel={() => setCreateRepoButton(false)} />
      )}

      <div>

        {showUpdate && (
          <UpdateRepoSelector onCancel={() => setShowUpdate(false)} />
        )}
      </div>
      <div>

        {showDelete && (
          <DeleteRepoSelector onCancel={() => setShowDelete(false)} />
        )}
      </div>
    </>
  );
}
