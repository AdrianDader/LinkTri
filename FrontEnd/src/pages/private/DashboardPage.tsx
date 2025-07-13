import React, { useContext, useEffect, useState } from "react";
import "./../private/DashboardPage.css";
import AuthContext from "./../../context/AuthContext";
import { ButtonPrimary, ButtonSecondary } from "../../components/shared/button";
import RepositoryList from "../../components/private/RepositoryList";
import { RepositoriesResponse } from "../../components/private/typesList";
import EnlaceListByCategory from "../../components/private/EnlaceList";
import CreateRepo from "../../components/private/RepositoryCRUD";
import UpdateRepoSelector from "../../components/private/UpdateRepo";
import DeleteRepoSelector from "../../components/private/DeleteRepoSelector";
import CreateEnlace from "../../components/private/crud_enlaces/createEnlace";
import UpdateEnlace from "../../components/private/crud_enlaces/updateEnlaces";
import DeleteEnlace from "../../components/private/crud_enlaces/deleteEnlace";

export default function DashboardPage() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("DashboardPage debe estar dentro de un AuthProvider");
  }

  const { userLogged } = auth;

  const [repository, setRepository] = useState<RepositoriesResponse>({
    repositories: {},
  });

  const zeroRepositories = repository.repositories?.length === 0;

  const [selectedLinkName, setSelectedLinkName] = useState<string | null>(null);
  const [selectedRepoName, setSelectedRepoName] = useState<string | null>(null);
  const [selectedRepoDesc, setSelectedRepoDesc] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[] | null>(null);
  const [selectedRepoId, setSelectedRepoId] = useState<number | null>(null);
  const [selectedEnlace, setSelectedEnlace] = useState<{
    id: number;
    url: string;
    name: string;
    visibility: string;
    shared: boolean;
  } | null>(null);

  //*CRUD REPOSITORY ---------------------
  const [createRepoButton, setCreateRepoButton] = useState<boolean | null>(
    null
  );
  const [showUpdate, setShowUpdate] = useState<boolean | null>(null);
  const [showDelete, setShowDelete] = useState<boolean | null>(null);

  //*CRUD ENLACES --------------------------
  const [showCreateEnlaces, setShowCreateEnlaces] = useState<boolean | null>(
    null
  );
  const [showUpdateEnlaces, setShowUpdateEnlaces] = useState<boolean | null>(
    null
  );
  const [showDeleteEnlaces, setShowDeleteEnlaces] = useState<boolean | null>(
    null
  );

  //*CRUD REPOSITORY HANDLERS ---------------------
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
  //*CRUD ENLACES HANDLERS ---------------------
  const handlerCreateEnlace = () => {
    setShowCreateEnlaces(true);
  };

  const handleEditEnlace = (enlace: {
    id: number;
    url: string;
    name: string;
    visibility: string;
    shared: boolean;
  }) => {
    setSelectedEnlace(enlace);
    setShowUpdateEnlaces(true);
  };

  const handleDeleteEnlace = (enlace: {
    id: number;
    url: string;
    name: string;
    visibility: string;
    shared: boolean;
  }) => {
    setSelectedEnlace(enlace);
    setShowDeleteEnlaces(true);
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <section className="dashboard__section">
        {/* //* SIDEBAR LEFT ------------------------------------ */}
        <div className="dashboard-sidebar-left__wrapper">
          {/* //todo hacer esta logica cuando haya datos_ */}
          {/* //todo Si no existen repos = aparece esta frase */}
          {/* <p>No existen repositorios...</p> */}

          <div className="dashboard-aside__box">
            <h2>Repositorios</h2>
            {zeroRepositories ? (
              <p>No existen repositorios.</p>
            ) : (
              <RepositoryList
                repository={repository}
                setRepository={setRepository}
                setSelectedLinkName={setSelectedLinkName}
                setSelectedRepoName={setSelectedRepoName}
                setSelectedRepoDesc={setSelectedRepoDesc}
                setSelectedTags={setSelectedTags}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
                setSelectedRepoId={setSelectedRepoId}
                setSelectedEnlace={setSelectedEnlace}
              />
            )}
            {/* //todo aplicar useMemo al repo */}
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
              disabled={zeroRepositories ? true : false}
            />
            <ButtonSecondary
              onClick={handlerDeleteRepo}
              children={
                <span className="material-symbols-outlined">delete</span>
              }
              disabled={zeroRepositories ? true : false}
            />
          </div>
        </div>
        {/* //*  DASHBOARD CENTER -------------------------------------- */}
        <div className="dashboard-center__wrapper">
          <h2>
            {selectedRepoName ? selectedRepoName : "Selecciona un repositorio"}
          </h2>
          <div className="dashboard-center__box">
            <EnlaceListByCategory
              category={selectedRepoName}
              onCreateEnlace={handlerCreateEnlace}
              onEditEnlace={handleEditEnlace}
              onDeleteEnlace={handleDeleteEnlace}
              // repoId={selectedRepoId}
            />
          </div>
        </div>
        {/* //* SIDEBAR RIGHT ------------------------------------------ */}
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
        </div>
      </section>

      {/* //* CRUD REPOSITORY COMPONENTS ------------------------------ */}
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
      {/* //* CRUD ENLACE MODALS ------------------------------ */}
      {showCreateEnlaces && (
        <CreateEnlace
          onCancel={() => setShowCreateEnlaces(false)}
          repoId={selectedRepoId}
        />
      )}
      {showUpdateEnlaces && selectedEnlace && selectedRepoId !== null && (
        <UpdateEnlace
          repoId={selectedRepoId}
          enlaceId={selectedEnlace.id}
          initialData={{
            url: selectedEnlace.url,
            name: selectedEnlace.name,
            visibility: selectedEnlace.visibility,
            shared: selectedEnlace.shared,
          }}
          onCancel={() => setShowUpdateEnlaces(false)}
          onSuccess={() => {
            setShowUpdateEnlaces(false);
            setSelectedEnlace(null);
          }}
        />
      )}

      {showDeleteEnlaces && selectedEnlace && selectedRepoId !== null && (
        <DeleteEnlace
          repoId={selectedRepoId}
          enlaceId={selectedEnlace.id}
          initialData={selectedEnlace}
          onCancel={() => setShowDeleteEnlaces(false)}
          onSuccess={() => {
            setShowDeleteEnlaces(false);
            setSelectedEnlace(null);
          }}
        />
      )}
    </>
  );
}
