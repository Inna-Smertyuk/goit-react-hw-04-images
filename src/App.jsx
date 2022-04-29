import React, { useState, useEffect } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
import api from "./API/api";

function App() {
  const [searchImage, setSearchImage] = useState("");
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [modalImg, setModalImg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (searchImage && currentPage) {
      api(searchImage, currentPage)
        .then((img) => {
          setImg((prevImg) => [...prevImg, ...img.hits]);

          if (currentPage > 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }
        })
        .catch((error) => console.log({ error }))
        .finally(() => setLoading(false));
    }
  }, [currentPage, searchImage]);

  const imageSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[1];

    if (value.trim() === "") {
      alert("Enter a search value...");
      return;
    }
    setSearchImage(value.toLowerCase());
    setLoading(true);
    setCurrentPage(1);
    setImg([]);
  };

  const loadMore = () => {
    setLoading(true);
    setCurrentPage((prevPage) => prevPage + 1);
    if (img.length % 12 !== 0) {
      setLoading(false);
    }
  };

  const openModal = (e) => {
    setIsModalOpen(true);
    setModalImg(e.target.dataset.source);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImg("");
  };
  /*const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };*/
  const showBtn = img.length > 0 && img.length >= 12;
  return (
    <>
      <Searchbar onSubmit={imageSubmit} />
      {img && <ImageGallery images={img} onOpen={openModal} />}
      {isModalOpen && (
        <Modal modalImg={modalImg} closeModal={handleCloseModal} />
      )}
      {loading && <Loader />}
      {currentPage && showBtn && <Button onClick={loadMore} />}
    </>
  );
}

export default App;
